#include "flv_recorder.h"
#include "lib/Clock.h"
#include "lib/ClockUtils.h"
DEFINE_LOGGER(FlvRecorder, "media.FlvRecorder");
FlvRecorder::FlvRecorder() {
    av_register_all();
    avcodec_register_all();
    video_stream_ = nullptr;
    audio_stream_ = nullptr;
    aac_codec_ = nullptr;
    context_ = nullptr;
}

FlvRecorder::~FlvRecorder() {
    CloseFile();
}

int FlvRecorder::SetSPS(const uint8_t *sps, size_t len) {
    if(len > 128) {
        return -1;
    }

    memcpy(sps_, sps, len);
    sps_len_ = len;
    initContext();
    return 0;
}

int FlvRecorder::SetPPS(const uint8_t *pps, size_t len) {
    if(len > 128) {
        return -1;
    }
    memcpy(pps_, pps, len);
    pps_len_ = len;
    initContext();
    return 0;
}

int FlvRecorder::SetESConfig(const uint8_t *config, size_t len) {
    if(len != 2) {
        return -1;
    }
    memcpy(es_config_, config, len);
    es_config_set_ = true;
    initContext();
    return 0;
}

int FlvRecorder::initContext()
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

        int sample_rate, channel_num;
        if(!decode_es_config(es_config_, sample_rate, channel_num)) {
            ELOG_ERROR("decode es_config error.");
            return -3;
        }

        AVCodec* video_codec = avcodec_find_encoder(video_codec_);
        if (video_codec == nullptr) {
            ELOG_ERROR("Could not find video codec");
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
            ELOG_ERROR("avformat_new_stream error");
            return -6;
        }

        audio_stream_->id = 1;
        audio_stream_->index = 1;
        audio_stream_->codec->codec_type = AVMEDIA_TYPE_AUDIO;
        audio_stream_->codec->codec_id = AV_CODEC_ID_AAC;
        audio_stream_->codec->sample_rate = sample_rate;
        audio_stream_->time_base = (AVRational) { 1, 1000 };
        audio_stream_->codec->channels = channel_num;
        audio_stream_->codec->sample_fmt = AV_SAMPLE_FMT_S16;
        audio_stream_->codec->bit_rate = 64000;
        if(channel_num == 2) {
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
            ELOG_ERROR("avio_open2 error");
            return -7;
        }

        if (avformat_write_header(context_, NULL) < 0) {
            ELOG_ERROR("avformat_write_header error");
            return -8;
        }

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

int FlvRecorder::CreateFile(const std::string &file) {
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

int FlvRecorder::WriteH264Data(const uint8_t *data, size_t len, int64_t pts) {
    if(!initialized_) {
        return -1;
    }

    AVPacket video_pkt;
    av_init_packet(&video_pkt);
    video_pkt.data = (uint8_t*)data;
    video_pkt.size = len;
    if(last_pts_ == pts) {
        pts += 1;
    }

    last_pts_ = pts;
    video_pkt.pts = pts;
    video_pkt.stream_index = 0;
    av_interleaved_write_frame(context_, &video_pkt);   // takes ownership of the packet
    av_packet_unref(&video_pkt);
    return 0;
}

int FlvRecorder::WriteAACData(const uint8_t *data, size_t len, int64_t pts) {
    if(!initialized_) {
        return -1;
    }
    AVPacket audio_pkt;
    av_init_packet(&audio_pkt);
    audio_pkt.stream_index = 1;
    audio_pkt.data = (uint8_t*)data;
    audio_pkt.size = len;
    audio_pkt.pts = pts;
    av_interleaved_write_frame(context_, &audio_pkt);   // takes ownership of the packet
    av_packet_unref(&audio_pkt);
    return 0;
}

int FlvRecorder::CloseFile() {
    if (audio_stream_ != nullptr && video_stream_ != nullptr && context_ != nullptr) {
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