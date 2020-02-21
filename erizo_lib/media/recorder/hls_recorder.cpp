#include "hls_recorder.h"
#include "lib/Clock.h"
#include "lib/ClockUtils.h"
DEFINE_LOGGER(HlsRecorder, "media.HlsRecorder");
HlsRecorder::HlsRecorder() {
    av_register_all();
    avcodec_register_all();
}

HlsRecorder::~HlsRecorder() {
    CloseFile();
}

int HlsRecorder::SetSPS(const uint8_t *sps, size_t len) {
    if(len > 128) {
        return -1;
    }

    memcpy(sps_, sps, len);
    sps_len_ = len;
    initContext();
    return 0;
}

int HlsRecorder::SetPPS(const uint8_t *pps, size_t len) {
    if(len > 128) {
        return -1;
    }
    memcpy(pps_, pps, len);
    pps_len_ = len;
    initContext();
    return 0;
}

int HlsRecorder::SetESConfig(const uint8_t *config, size_t len) {
    if(len != 2) {
        return -1;
    }
    memcpy(es_config_, config, len);
    es_config_set_ = true;
    initContext();
    return 0;
}

int HlsRecorder::initContext()
{
    if(sps_len_ == 0 || pps_len_ == 0 || !es_config_set_) {
        return -1;
    } 

    if (video_codec_ != AV_CODEC_ID_NONE && 
        audio_codec_ != AV_CODEC_ID_NONE &&
        video_stream_ == nullptr &&
        audio_stream_ == nullptr && 
        context_ != nullptr) 
    {
        int width, height, fps;
        if(!h264_decode_sps(sps_+4, sps_len_-4, width, height, fps)) {
            ELOG_ERROR("decode sps error");
            return -2;
        }

        if(!decode_es_config(es_config_, sample_rate_, channel_num_)) {
            ELOG_ERROR("decode es_config error.");
            return -3;
        }

        AVCodec* video_codec = avcodec_find_encoder(video_codec_);
        if (video_codec == nullptr) {
            ELOG_ERROR("could not find video codec");
            return -4;
        }
    
        video_stream_ = avformat_new_stream(context_, video_codec);
        video_stream_->id = 0;
        video_stream_->index = 0;
        video_stream_->codec->codec_id = video_codec_;
        video_stream_->codec->width = width;
        video_stream_->codec->height = height;
        video_stream_->time_base = (AVRational) { 1, 1000 };
        // A decent guess here suffices; if processing the file with ffmpeg,
        // use -vsync 0 to force it not to duplicate frames.
        video_stream_->codec->pix_fmt = AV_PIX_FMT_YUV420P;
        if (context_->oformat->flags & AVFMT_GLOBALHEADER) {
            video_stream_->codec->flags |= AV_CODEC_FLAG_GLOBAL_HEADER;
        }

        context_->oformat->flags |= AVFMT_VARIABLE_FPS;
        aac_codec_ = avcodec_find_encoder_by_name("libfdk_aac");
        if(!aac_codec_) {
            ELOG_ERROR("open libfdk_aac codec failed.");
            return -5;
        }

        audio_stream_ = avformat_new_stream(context_, aac_codec_);
        if(audio_stream_ == nullptr) {
            ELOG_ERROR("avformat_new_stream error.");
            return -6;
        }

        audio_stream_->id = 1;
        audio_stream_->index = 1;
        audio_stream_->codec->codec_type = AVMEDIA_TYPE_AUDIO;
        audio_stream_->codec->codec_id = AV_CODEC_ID_AAC;
        audio_stream_->codec->sample_rate = sample_rate_;
        audio_stream_->time_base = (AVRational) { 1, 1000 };
        audio_stream_->codec->channels = channel_num_;
        audio_stream_->codec->sample_fmt = AV_SAMPLE_FMT_S16;
        audio_stream_->codec->bit_rate = 64000;
        if(channel_num_ == 2) {
            audio_stream_->codec->channel_layout = AV_CH_LAYOUT_STEREO;
        } else {
            audio_stream_->codec->channel_layout = AV_CH_LAYOUT_MONO;
        }
        
        audio_stream_->codec->strict_std_compliance = FF_COMPLIANCE_EXPERIMENTAL;
        if (context_->oformat->flags & AVFMT_GLOBALHEADER) {
            audio_stream_->codec->flags |= AV_CODEC_FLAG_GLOBAL_HEADER;
        }

        context_->streams[0] = video_stream_;
        context_->streams[1] = audio_stream_;

        if (avio_open2(&context_->pb, context_->filename, AVIO_FLAG_WRITE, NULL, NULL) < 0) {
            ELOG_ERROR("opening output file:%s error.", context_->filename);
            return -7;
        }

        if (avformat_write_header(context_, NULL) < 0) {
            ELOG_ERROR("avformat_write_header error.");
            return -8;
        }

        av_opt_set(context_->priv_data, "hls_time", "5", 0);
        av_opt_set(context_->priv_data, "hls_base_url", "http://172.19.5.107/", 0);
        av_opt_set_int(context_->priv_data, "hls_list_size", INT_MAX, 0);
        av_opt_set_int(context_->priv_data, "hls_wrap", INT_MAX, 0);
        initialized_ = true;

        if(create_file_cb_) {
            erizo::SteadyClock clk;
            (*create_file_cb_)(context_->filename, erizo::ClockUtils::timePointToMs(clk.now()));
        }
        total_duration_ms_ = 0;

        return 0;
    }
    return -9;
}

int HlsRecorder::CreateFile(const std::string &file) {
    file_name_ = file;
    context_ = avformat_alloc_context();
    if (context_ == nullptr) {
        ELOG_ERROR("Error allocating memory for IO context");
        return -1;
    } else {
        file.copy(context_->filename, sizeof(context_->filename), 0);
        context_->oformat = av_guess_format(nullptr,  context_->filename, nullptr);

        if (!context_->oformat) {
            ELOG_ERROR("Error guessing format %s", context_->filename);
            return -2;
        }
        return 0;
    }
    return -3;
}

int HlsRecorder::WriteH264Data(const uint8_t *data, size_t len, int64_t pts) {
    if(!initialized_) {
        return -1;
    }

    AVPacket video_pkt;
    av_init_packet(&video_pkt);
    video_pkt.data = (uint8_t*)data;
    video_pkt.size = len;
    if(pts == last_pts_) {//避免67,68的时间戳和65的一样，导致无法写入
        pts += 1;
    }
    video_pkt.pts = pts;
    video_pkt.dts = pts;
    last_pts_ = pts;
    video_pkt.stream_index = 0;
    if((data[4]&0x1f) == 5) {
        video_pkt.flags |= AV_PKT_FLAG_KEY;
    }
    av_interleaved_write_frame(context_, &video_pkt);   // takes ownership of the packet
    av_packet_unref(&video_pkt);
    return 0;
}

int HlsRecorder::addAdtsHeader(const uint8_t *data, size_t len, uint8_t *data_new) {
    int profile = 2;  //AAC LC，MediaCodecInfo.CodecProfileLevel.AACObjectLC;
    int freqIdx = -1;  //48K, 见后面注释avpriv_mpeg4audio_sample_rates中32000对应的数组下标，来自ffmpeg源码

    int avpriv_mpeg4audio_sample_rates[] = {
        96000, 88200, 64000, 48000, 44100, 32000,
                24000, 22050, 16000, 12000, 11025, 8000, 7350
    };

    for(int i = 0; i < sizeof(avpriv_mpeg4audio_sample_rates)/sizeof(int); i++) {
        if(avpriv_mpeg4audio_sample_rates[i] == sample_rate_) {
            freqIdx = i;
            break;
        }
    }

    if(freqIdx < 0) {
        return -1;
    }

    /*int avpriv_mpeg4audio_sample_rates[] = {
        96000, 88200, 64000, 48000, 44100, 32000,
                24000, 22050, 16000, 12000, 11025, 8000, 7350
    };
    channel_configuration: 表示声道数chanCfg
    0: Defined in AOT Specifc Config
    1: 1 channel: front-center
    2: 2 channels: front-left, front-right
    3: 3 channels: front-center, front-left, front-right
    4: 4 channels: front-center, front-left, front-right, back-center
    5: 5 channels: front-center, front-left, front-right, back-left, back-right
    6: 6 channels: front-center, front-left, front-right, back-left, back-right, LFE-channel
    7: 8 channels: front-center, front-left, front-right, side-left, side-right, back-left, back-right, LFE-channel
    8-15: Reserved
    */
    int new_len = len + 7;
    // fill in ADTS data
    data_new[0] = (uint8_t)0xFF;
    data_new[1] = (uint8_t)0xF9;
    data_new[2] = (uint8_t)(((profile-1)<<6) + (freqIdx<<2) +(channel_num_>>2));
    data_new[3] = (uint8_t)(((channel_num_&3)<<6) + (new_len>>11));
    data_new[4] = (uint8_t)((new_len&0x7FF) >> 3);
    data_new[5] = (uint8_t)(((new_len&7)<<5) + 0x1F);
    data_new[6] = (uint8_t)0xFC;
    memcpy(data_new+7, data, len);
    return 0;
}

int HlsRecorder::WriteAACData(const uint8_t *data, size_t len, int64_t pts) {
    if(!initialized_) {
        return -1;
    }

    if(len + 7 > MAX_AUDIO_PACKET_SIZE) {
        return -2;
    }

    addAdtsHeader(data, len, audio_buf);
    AVPacket audio_pkt;
    av_init_packet(&audio_pkt);
    audio_pkt.stream_index = 1;
    audio_pkt.data = (uint8_t*)audio_buf;
    audio_pkt.size = len + 7;
    audio_pkt.pts = pts;
    av_interleaved_write_frame(context_, &audio_pkt);   // takes ownership of the packet
    av_packet_unref(&audio_pkt);
    return 0;
}

int HlsRecorder::CloseFile() {
    if (audio_stream_ != nullptr && video_stream_ != nullptr && context_ != nullptr && initialized_) {
      av_write_trailer(context_);
    }

    if (context_ != nullptr) {
        avio_close(context_->pb);
        avformat_free_context(context_);
        context_ = nullptr;

        if(done_cb_) {
            (*done_cb_)(file_name_, 0, 0);
        }
    }
    return 0;
}