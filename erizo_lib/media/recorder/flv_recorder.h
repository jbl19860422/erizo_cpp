#ifndef FLV_WRITER_H
#define FLV_WRITER_H
#include <string>
#include "file_recorder.h"

extern "C" {
#include <libavcodec/avcodec.h>
#include <libavutil/channel_layout.h>
#include <libavformat/avformat.h>
#include <libavutil/avutil.h>
#include <libavutil/opt.h>
#include <libavresample/avresample.h> 
#include <libavcodec/avcodec.h>
}

#include "./logger.h"
class FlvRecorder : public FileRecorder {
    DECLARE_LOGGER();
public:
    FlvRecorder();
    virtual ~FlvRecorder();
public:
    int SetSPS(const uint8_t *sps, size_t len);
    int SetPPS(const uint8_t *pps, size_t len);
    int SetESConfig(const uint8_t *config, size_t len);
    int CreateFile(const std::string &file);
    int WriteH264Data(const uint8_t *data, size_t len, int64_t pts);
    int WriteAACData(const uint8_t *data, size_t len, int64_t pts);
    int CloseFile();
private:
    int initContext();
    std::string file_name_;
    uint8_t sps_[128];
    size_t sps_len_ = 0;
    uint8_t pps_[128];
    size_t pps_len_ = 0;
    uint8_t es_config_[2];
    bool es_config_set_ = false;
    //audio info
    uint32_t num_channel_;
    uint32_t sample_rate_;
    //video info
    uint32_t width_;
    uint32_t height_;
    uint32_t fps_;

    int64_t last_pts_ = 0;

    AVStream *video_stream_, *audio_stream_;
    enum AVCodecID video_codec_ = AV_CODEC_ID_H264;
    enum AVCodecID audio_codec_ = AV_CODEC_ID_AAC;
    AVCodec *aac_codec_ = nullptr;
    AVFormatContext *context_ = nullptr;

    bool initialized_ = false;
};

#endif