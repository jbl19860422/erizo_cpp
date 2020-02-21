#include <netinet/in.h>
#include "mp4_recorder.h"
#include "lib/Clock.h"
#include "lib/ClockUtils.h"
DEFINE_LOGGER(MP4Recorder, "media.MP4Recorder");
MP4Recorder::MP4Recorder() {

}

MP4Recorder::~MP4Recorder() {
    CloseFile();
}

int MP4Recorder::SetSPS(const uint8_t *sps, size_t len) {
    if(len > 128) {
        return -1;
    }

    memcpy(sps_, sps, len);
    sps_len_ = len;
    initContext();
    return 0;
}

int MP4Recorder::SetPPS(const uint8_t *pps, size_t len) {
    if(len > 128) {
        return -1;
    }
    memcpy(pps_, pps, len);
    pps_len_ = len;
    initContext();
    return 0;
}

int MP4Recorder::SetESConfig(const uint8_t *config, size_t len) {
    if(len != 2) {
        return -1;
    }
    memcpy(es_config_, config, len);
    es_config_set_ = true;
    initContext();
    return 0;
}

int MP4Recorder::initContext()
{
    if(sps_len_ == 0 || pps_len_ == 0 || !es_config_set_) {
        return -1;
    } 

    if (mp4_file_ != MP4_INVALID_FILE_HANDLE) 
    {
        int width, height, fps;
        if(!h264_decode_sps(sps_+4, sps_len_-4, width, height, fps)) {
            ELOG_ERROR("decode sps error.");
            return -2;
        }

        int sample_rate, channel_num;
        if(!decode_es_config(es_config_, sample_rate, channel_num)) {
            ELOG_ERROR("decode es_config error.");
            return -3;
        }
    
        //添加aac音频 
        audio_track_ = MP4AddAudioTrack(mp4_file_, sample_rate, 1024, MP4_MPEG4_AUDIO_TYPE); 
        if (audio_track_ == MP4_INVALID_TRACK_ID) 
        { 
            ELOG_ERROR("add audio track failed."); 
            return -5; 
        } 
        
        MP4SetTrackESConfiguration(mp4_file_, audio_track_, es_config_, 2);
        MP4SetAudioProfileLevel(mp4_file_, 0x2); 
        //添加视频
        video_track_ = MP4AddH264VideoTrack(mp4_file_, 1000, 1000 / 25, width, height, 
                                              sps_[5], //sps[1] AVCProfileIndication 
                                              sps_[6], //sps[2] profile_compat 
                                              sps_[7], //sps[3] AVCLevelIndication 
                                              3); // 4 bytes length before each NAL unit 
        if (video_track_ == MP4_INVALID_TRACK_ID) { 
            ELOG_ERROR("add video track failed.\n"); 
            return -6; 
        } 
        MP4SetVideoProfileLevel(mp4_file_, 0x7F);
        MP4AddH264SequenceParameterSet(mp4_file_, video_track_, sps_+4, sps_len_-4);
        MP4AddH264PictureParameterSet(mp4_file_, video_track_, pps_+4, pps_len_-4);

        if(!video_buf_) {
            video_buf_ = new uint8_t[width*height*3];
        }
        initialized_ = true;
    }
    return -9;
}

int MP4Recorder::CreateFile(const std::string &file) {
    mp4_file_ = MP4CreateEx(file.c_str(), 0, 1, 1, (char*)"isom", 0x00000200, 0, 0); 
    file_name_ = file;
    if (mp4_file_ == MP4_INVALID_FILE_HANDLE) 
    { 
        ELOG_ERROR("MP4CreateEx failed."); 
        return -1; 
    } 
    file_name_ = file;
    MP4SetTimeScale(mp4_file_, 1000);

    if(create_file_cb_) {
        erizo::SteadyClock clk;
        (*create_file_cb_)(file, erizo::ClockUtils::timePointToMs(clk.now()));
    }
    total_duration_ms_ = 0;
    return 0;
}

void MP4Recorder::ReadNaluFromBuf(uint8_t *buf, size_t len, std::vector<NaluUnit> &nalus)
{
  int i = 0;
  while((i+3) < len) {
    if(buf[i] == 0 && buf[i+1] == 0 && buf[i+2] == 0 && buf[i+3] == 1) {
      int j = i+4;
      NaluUnit nalu;
      if(j < len) {
        nalu.type = buf[j] & 0x1f;
        nalu.data = buf+i;
      } else {
        return;
      }
       
      while(j < len) {
        if(buf[j] == 0 && buf[j+1] == 0 && buf[j+2] == 0 && buf[j+3] == 1) {
          nalu.size = j - i;
          i = j;
          nalus.push_back(nalu);
          break;
        }
        j++;
      }

      if(j >= len) {
        nalu.size = len - i;
        nalus.push_back(nalu);
        break;
      }
    } else {
      i++;
    }
  }
}

int MP4Recorder::WriteH264Data(const uint8_t *data, size_t len, int64_t pts) {
    if(!initialized_) {
        return -1;
    }

    int64_t duration;
    if(last_pts_ == 0) {
        duration = 0;
    } else {
        duration = pts - last_pts_;        
    }
    last_pts_ = pts;

    std::vector<NaluUnit> nalus;
    ReadNaluFromBuf((uint8_t*)data, len, nalus);
    for(size_t i = 0; i < nalus.size(); i++) {
        if(nalus[i].type == 7) {
            memcpy(sps_, nalus[i].data, nalus[i].size);
            sps_len_ = nalus[i].size;
        } else if(nalus[i].type == 8) {
            memcpy(pps_, nalus[i].data, nalus[i].size);
            pps_len_ = nalus[i].size;
        } else if(nalus[i].type == 5) {//i-frame
            uint32_t* p = (uint32_t*)video_buf_; 
            memcpy(video_buf_+4, sps_, sps_len_);
            memcpy(video_buf_+4+sps_len_, pps_, pps_len_);
            memcpy(video_buf_+4+sps_len_+pps_len_, nalus[i].data, nalus[i].size);

            int new_len = nalus[i].size+4+sps_len_+pps_len_;
            *p = htonl(new_len-4);

            MP4WriteSample(mp4_file_, video_track_, video_buf_, new_len, duration, 0, 1);
        } else if(nalus[i].type == 1) {//p-frame
            uint32_t* p = (uint32_t*)video_buf_; 
            memcpy(p+1, nalus[i].data, nalus[i].size);
            int new_len = nalus[i].size+4;
            *p = htonl(nalus[i].size);
            MP4WriteSample(mp4_file_, video_track_, video_buf_, new_len, duration, 0, 0);
        }
        
    }
    return 0;
}

int MP4Recorder::WriteAACData(const uint8_t *data, size_t len, int64_t pts) {
    if(!initialized_) {
        return -1;
    }

    MP4WriteSample(mp4_file_, audio_track_, data, len, MP4_INVALID_DURATION, 0, 1); 
    return 0;
}

int MP4Recorder::CloseFile() {
    if(mp4_file_ != MP4_INVALID_FILE_HANDLE) {
        MP4Close(mp4_file_);
        mp4_file_ = MP4_INVALID_FILE_HANDLE;
        //执行转换，头在前面
        std::string cmd;
        cmd = "avconv -i " + file_name_ + " -c copy -f mp4 -movflags faststart " + file_name_+".fast";
        if(system(cmd.c_str()) < 0) {
            ELOG_ERROR("error execute cmd:%s", cmd.c_str());
            return 0;
        }

        cmd = "mv " + file_name_ +".fast" + " " + file_name_;
        if(system(cmd.c_str()) < 0) {
            ELOG_ERROR("error execute cmd:%s", cmd.c_str());
        }

        if(done_cb_) {
            (*done_cb_)(file_name_, 0, 0);
        }
    }    
    return 0; 
}
