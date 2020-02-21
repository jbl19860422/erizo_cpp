#include "media/ExternalOutput.h"

#include <sys/time.h>

#include <string>
#include <cstring>

#include "lib/ClockUtils.h"

#include "./WebRtcConnection.h"
#include "rtp/RtpHeaders.h"
#include "rtp/RtpVP8Parser.h"

#include "rtp/QualityFilterHandler.h"
#include "rtp/LayerBitrateCalculationHandler.h"

#include "media/recorder/flv_recorder.h"
#include "media/recorder/mp4_recorder.h"
#include "media/recorder/hls_recorder.h"

using std::memcpy;

namespace erizo
{

DEFINE_LOGGER(ExternalOutput, "media.ExternalOutput");

void ExternalOutput::write_audio_metadata(uint8_t *buf, int samplerate, int channels)
{
    uint16_t *p;
    uint8_t temp;

    p = (uint16_t *)buf;
    /*
    5 bits | 4 bits | 4 bits | 3 bits
    第一欄 第二欄 第三欄 第四欄

    第一欄：AAC Object Type
    第二欄：Sample Rate Index
    第三欄：Channel Number
    第四欄：Don't care，設 0
    */
    (*p) = 0;
    (*p) |= (2 << 11); //aac object type

    if (samplerate == 48000)
    {
        (*p) |= (3 << 7);
    }
    else if (samplerate == 32000)
    {
        (*p) |= (5 << 7);
    }
    else if (samplerate == 24000)
    {
        (*p) |= (6 << 7);
    }
    else if (samplerate == 16000)
    {
        (*p) |= (8 << 7);
    }

    if (channels == 1)
    {
        (*p) |= (1 << 3);
    }
    else if (channels == 2)
    {
        (*p) |= (2 << 3);
    }

    temp = (*p) >> 8;
    (*p) <<= 8;
    (*p) |= temp;
}

ExternalOutput::ExternalOutput(std::shared_ptr<Worker> worker,
                               const std::string &stream_id,
                               const std::vector<std::string> &output_files,
                               const std::vector<RtpMap> rtp_mappings,
                               const std::vector<erizo::ExtMap> ext_mappings,
                               const std::function<void(const std::string &stream_id, const std::string &file, int64_t timestamp_ms)> &create_file_cb,
                               const std::function<void(const std::string &stream_id, const std::string &file, int64_t dur_video, int64_t dur_audio)> &done_cb)
    : worker_{worker}, pipeline_{Pipeline::create()},
      audio_queue_{5.0, 10.0}, video_queue_{5.0, 10.0},
      inited_{false}, video_source_ssrc_{0},
      first_video_timestamp_{-1}, first_audio_timestamp_{-1},
      first_data_received_{}, video_offset_ms_{-1}, audio_offset_ms_{-1},
      need_to_send_fir_{true}, rtp_mappings_{rtp_mappings}, pipeline_initialized_{false}, ext_processor_{ext_mappings}
{

    fb_sink_ = nullptr;
    sink_fb_source_ = this;
    decode_pcm_ = nullptr;
    pcm_buf_ = nullptr;

    // TODO(pedro): these should really only be called once per application run
    av_register_all();
    avcodec_register_all();

    fec_receiver_.reset(licode::webrtc::UlpfecReceiver::Create(this));
    stats_ = std::make_shared<Stats>();
    quality_manager_ = std::make_shared<QualityManager>();

    for (auto rtp_map : rtp_mappings_)
    {
        switch (rtp_map.media_type)
        {
        case AUDIO_TYPE:
            audio_maps_[rtp_map.payload_type] = rtp_map;
            break;
        case VIDEO_TYPE:
            video_maps_[rtp_map.payload_type] = rtp_map;
            break;
        case OTHER:
            break;
        }
    }

    // Set a fixed extension map to parse video orientation
    // TODO(yannistseng): Update extension maps dymaically from SDP info
    std::shared_ptr<SdpInfo> sdp = std::make_shared<SdpInfo>(rtp_mappings_);
    ExtMap anExt(4, "urn:3gpp:video-orientation");
    anExt.mediaType = VIDEO_TYPE;
    sdp->extMapVector.push_back(anExt);
    ext_processor_.setSdpInfo(sdp);

    for (auto file : output_files)
    {
        std::string::size_type position = file.find(".flv");

        if (position != std::string::npos)
        {
            FileRecorder *r = new FlvRecorder;
            recorders_.push_back(r);
            r->onCreateFile([=](const std::string &file, int64_t timestamp) {
                worker_->task([=] {
                    (create_file_cb)(stream_id, file, timestamp);
                });
            });

            r->onDone([=](const std::string &file, int64_t dur_video, int64_t dur_audio) {
                worker_->task([=] {
                    (done_cb)(stream_id, file, dur_video, dur_audio);
                });
            });
            r->CreateFile(file);
            continue;
        }

        position = file.find(".mp4");
        if (position != std::string::npos)
        {
            FileRecorder *r = new MP4Recorder;
            recorders_.push_back(r);
            r->onCreateFile([=](const std::string &file, int64_t timestamp) {
                worker_->task([=] {
                    (create_file_cb)(stream_id, file, timestamp);
                });
            });

            r->onDone([=](const std::string &file, int64_t dur_video, int64_t dur_audio) {
                worker_->task([=] {
                    (done_cb)(stream_id, file, dur_video, dur_audio);
                });
            });
            r->CreateFile(file);
            continue;
        }

        position = file.find(".m3u8");
        if (position != std::string::npos)
        {
            FileRecorder *r = new HlsRecorder;
            recorders_.push_back(r);
            r->onCreateFile([=](const std::string &file, int64_t timestamp) {
                worker_->task([=] {
                    (create_file_cb)(stream_id, file, timestamp);
                });
            });

            r->onDone([=](const std::string &file, int64_t dur_video, int64_t dur_audio) {
                worker_->task([=] {
                    (done_cb)(stream_id, file, dur_video, dur_audio);
                });
            });
            r->CreateFile(file);
            continue;
        }
    }
}

bool ExternalOutput::init()
{
    MediaInfo m;
    m.hasVideo = false;
    m.hasAudio = false;
    recording_ = true;
    asyncTask([](std::shared_ptr<ExternalOutput> output) {
        output->initializePipeline();
    });
    thread_ = boost::thread(&ExternalOutput::sendLoop, this);
    ELOG_DEBUG("Initialized successfully");
    return true;
}

ExternalOutput::~ExternalOutput()
{
    ELOG_DEBUG("Destructing");
    syncClose();
}

void ExternalOutput::close()
{
    syncClose();
}

void ExternalOutput::syncClose()
{
    if (!recording_)
    {
        return;
    }
    // Stop our thread so we can safely nuke libav stuff and close our
    // our file.
    recording_ = false;
    cond_.notify_one();
    thread_.join();
    for (auto r : recorders_)
    {
        if (r)
        {
            r->CloseFile();
            delete r;
            r = nullptr;
        }
    }

    recorders_.clear();
    pipeline_initialized_ = false;

    if (pcm_buf_)
    {
        delete[] pcm_buf_;
        pcm_buf_ = nullptr;
    }

    if (decode_pcm_)
    {
        delete[] decode_pcm_;
        decode_pcm_ = nullptr;
    }

    if (encoded_aac_data_)
    {
        delete[] encoded_aac_data_;
        encoded_aac_data_ = nullptr;
    }

    if (opus_decoder_)
    {
        opus_decoder_destroy(opus_decoder_);
        opus_decoder_ = nullptr;
    }

    ELOG_ERROR("Closed Successfully");
}

void ExternalOutput::asyncTask(std::function<void(std::shared_ptr<ExternalOutput>)> f)
{
    std::weak_ptr<ExternalOutput> weak_this = shared_from_this();
    worker_->task([weak_this, f] {
        if (auto this_ptr = weak_this.lock())
        {
            f(this_ptr);
        }
    });
}

void ExternalOutput::receiveRawData(const RawDataPacket & /*packet*/)
{
    return;
}
// This is called by our fec_ object once it recovers a packet.
bool ExternalOutput::OnRecoveredPacket(const uint8_t *rtp_packet, size_t rtp_packet_length)
{
    video_queue_.pushPacket((const char *)rtp_packet, rtp_packet_length);
    return true;
}

int32_t ExternalOutput::OnReceivedPayloadData(const uint8_t *payload_data, size_t payload_size,
                                              const licode::webrtc::WebRtcRTPHeader *rtp_header)
{
    // Unused by WebRTC's FEC implementation; just something we have to implement.
    return 0;
}

int ExternalOutput::initAudioCodec(int sample_rate, int channel_num)
{
    //初始化aac编码器
    if (init_audio_codec_)
    {
        return 0;
    }
    aac_codec_ = avcodec_find_encoder_by_name("libfdk_aac");
    if (!aac_codec_)
    {
        ELOG_ERROR("avcodec_find_encoder error.");
        return -1;
    }

    codec_context_ = avcodec_alloc_context3(aac_codec_);
    if (!codec_context_)
    {
        ELOG_ERROR("avcodec_alloc_context3 error.");
        return -2;
    }

    //编码器参数设置
    codec_context_->codec_type = AVMEDIA_TYPE_AUDIO;
    codec_context_->bit_rate = 64000;
    codec_context_->sample_rate = sample_rate;
    codec_context_->sample_fmt = AV_SAMPLE_FMT_S16;
    if (channel_num == 2)
    {
        codec_context_->channel_layout = AV_CH_LAYOUT_STEREO;
    }
    else if (channel_num == 1)
    {
        codec_context_->channel_layout = AV_CH_LAYOUT_MONO;
    }

    codec_context_->channels = channel_num;
    codec_context_->flags |= AV_CODEC_FLAG_GLOBAL_HEADER;

    int ret = avcodec_open2(codec_context_, aac_codec_, NULL);
    if (ret < 0)
    {
        ELOG_ERROR("avcodec_open2 error sample_rate=%d.", sample_rate);
        return -3;
    }

    uint8_t meta_data[2];
    write_audio_metadata(meta_data, sample_rate, channel_num);
    for (auto r : recorders_)
    {
        if (r)
        {
            r->SetESConfig(meta_data, 2);
        }
    }

    int error = 0;
    ELOG_INFO("opus decoder init %d %d", sample_rate, channel_num);
    opus_decoder_ = opus_decoder_create(sample_rate, channel_num, &error);
    if (0 != error)
    {
        ELOG_ERROR("error create opus decoder");
        return -4;
    }
    pcm_buf_count_ = 0;
    init_audio_codec_ = true;
    if (!pcm_buf_)
    {
        pcm_buf_ = new opus_int16[20480];
    }

    if (!decode_pcm_)
    {
        decode_pcm_ = new opus_int16[20480];
    }

    if (!encoded_aac_data_)
    {
        encoded_aac_data_ = new uint8_t[20480];
    }

    return 0;
}

void ExternalOutput::writeAudioData(char *buf, int len)
{
    RtpHeader *head = reinterpret_cast<RtpHeader *>(buf);
    uint16_t current_audio_sequence_number = head->getSeqNumber();
    if (first_audio_timestamp_ != -1 && current_audio_sequence_number != last_audio_sequence_number_ + 1)
    {
        // Something screwy.  We should always see sequence numbers incrementing monotonically.
        ELOG_DEBUG("Unexpected audio sequence number; current %d, previous %d",
                   current_audio_sequence_number, last_audio_sequence_number_);
    }

    last_audio_sequence_number_ = current_audio_sequence_number;
    if (first_audio_timestamp_ == -1)
    {
        first_audio_timestamp_ = head->getTimestamp();
    }

    long long current_timestamp = head->getTimestamp(); // NOLINT
    if (current_timestamp - first_audio_timestamp_ < 0)
    {
        // we wrapped.  add 2^32 to correct this. We only handle a single wrap around
        // since that's 13 hours of recording, minimum.
        current_timestamp += 0xFFFFFFFF;
    }

    int64_t timestamp_to_write = 0;
    auto audio_iterator = audio_maps_.find(head->getPayloadType());
    if (audio_iterator == audio_maps_.end())
    {
        return;
    }

    int sample_rate = audio_iterator->second.clock_rate;
    int channels = audio_iterator->second.channels;

    if (!init_audio_codec_)
    { //初始化编解码器
        if (0 != initAudioCodec(sample_rate, channels))
        {
            ELOG_ERROR("initAudioCodec failed.");
            return;
        }
    }

    timestamp_to_write = (current_timestamp - first_audio_timestamp_) * 1000 / audio_iterator->second.clock_rate;
    if (reEncodeAudioData(reinterpret_cast<uint8_t *>(buf) + head->getHeaderLength(),
                          (size_t)(len - head->getHeaderLength()),
                          sample_rate,
                          channels,
                          encoded_aac_data_,
                          aac_data_len_))
    {
        for (auto r : recorders_)
        {
            if (r)
            {
                r->WriteAACData((const uint8_t *)encoded_aac_data_, aac_data_len_, timestamp_to_write);
            }
        }
    }
}

bool ExternalOutput::reEncodeAudioData(uint8_t *buf, size_t len, int sample_rate, int channels, uint8_t *out_buf, size_t &out_len)
{
    bool ret = false;
    bool fill_pcm = false;
    AVFrame *audio_frame = nullptr;
    out_len = 0;
    if (opus_decoder_)
    { //重编码
        int frame_count = opus_decode(opus_decoder_,
                                      buf,
                                      len,
                                      decode_pcm_,
                                      sample_rate / 50 * channels, //每个声道给pcm数组的长度
                                      0);

        for (int i = 0; i < frame_count * channels; i++)
        { //存入buffer中
            pcm_buf_[i + pcm_buf_count_] = decode_pcm_[i];
        }

        pcm_buf_count_ += frame_count * channels;
        if (pcm_buf_count_ >= 1024 * channels)
        {
            audio_frame = av_frame_alloc();
            audio_frame->nb_samples = 1024;
            audio_frame->format = AV_SAMPLE_FMT_S16;
            if (channels == 2)
            {
                audio_frame->channel_layout = AV_CH_LAYOUT_STEREO;
            }
            else if (channels == 1)
            {
                audio_frame->channel_layout = AV_CH_LAYOUT_MONO;
            }

            audio_frame->pts = 0;
            fill_pcm = true;
            int code = avcodec_fill_audio_frame(audio_frame, channels, AV_SAMPLE_FMT_S16, (const uint8_t *)pcm_buf_, 1024 * channels * sizeof(opus_int16), 0);
            if (code < 0)
            {
                ret = false;
                goto exit;
            }

            int got_frame = 0;
            AVPacket audio_pkt;
            av_init_packet(&audio_pkt);
            audio_pkt.data = NULL;
            audio_pkt.size = 0;
            code = avcodec_encode_audio2(codec_context_, &audio_pkt, audio_frame, &got_frame);
            if (code < 0)
            {
                ELOG_ERROR("encode aac data failed, code = %d", code);
                ret = false;
                goto exit;
            }

            if (got_frame == 1)
            {
                memcpy(out_buf, audio_pkt.data, audio_pkt.size);
                out_len = audio_pkt.size;
                ret = true;
            }
            else
            {
                ELOG_ERROR("encode aac data failed, code = %d, got_frame = 0, frame_count = %d", code, frame_count);
            }
        }
    }
exit:
    if (audio_frame)
    {
        av_frame_free(&audio_frame);
        audio_frame = nullptr;
    }

    if (fill_pcm)
    {
        memmove(pcm_buf_, pcm_buf_ + 1024 * channels, (pcm_buf_count_ - 1024 * channels) * sizeof(opus_int16));
        pcm_buf_count_ -= 1024 * channels;
    }
    return ret;
}

void ExternalOutput::writeVideoData(char *buf, int len)
{
    RtpHeader *head = reinterpret_cast<RtpHeader *>(buf);

    uint16_t current_video_sequence_number = head->getSeqNumber();
    if (current_video_sequence_number != last_video_sequence_number_ + 1)
    {
        // Something screwy.  We should always see sequence numbers incrementing monotonically.
        ELOG_DEBUG("Unexpected video sequence number; current %d, previous %d",
                   current_video_sequence_number, last_video_sequence_number_);
        // Restart the depacketizer so it looks for the start of a frame
        if (depacketizer_ != nullptr)
        {
            depacketizer_->reset();
        }
    }

    last_video_sequence_number_ = current_video_sequence_number;

    if (first_video_timestamp_ == -1)
    {
        first_video_timestamp_ = head->getTimestamp();
    }
    auto map_iterator = video_maps_.find(head->getPayloadType());
    if (map_iterator != video_maps_.end())
    {
        updateVideoCodec(map_iterator->second);
        if (map_iterator->second.encoding_name == "VP8" || map_iterator->second.encoding_name == "H264")
        {
            maybeWriteVideoPacket(buf, len);
        }
    }
}

void ExternalOutput::updateAudioCodec(RtpMap map)
{
    if (audio_codec_ != AV_CODEC_ID_NONE)
    {
        return;
    }
    audio_map_ = map;
    if (map.encoding_name == "opus")
    {
        audio_codec_ = AV_CODEC_ID_OPUS;
    }
    else if (map.encoding_name == "PCMU")
    {
        audio_codec_ = AV_CODEC_ID_PCM_MULAW;
    }
}

void ExternalOutput::updateVideoCodec(RtpMap map)
{
    if (depacketizer_)
    {
        return;
    }
    video_map_ = map;
    if (map.encoding_name == "VP8")
    {
        depacketizer_.reset(new Vp8Depacketizer());
    }
    else if (map.encoding_name == "H264")
    {
        depacketizer_.reset(new H264Depacketizer());
    }
}

bool ExternalOutput::findSps(uint8_t *buf, int len, uint8_t *sps, int &len_sps)
{
    bool find_header = false;
    int i = 0;
    int header_pos = 0;
    while (!find_header && i < len - 5)
    {
        if (buf[i] == 0 && buf[i + 1] == 0 && buf[i + 2] == 0 && buf[i + 3] == 1 && buf[i + 4] == 0x67)
        {
            find_header = true;
            header_pos = i;
            break;
        }
        i++;
    }

    if (!find_header)
    {
        return false;
    }
    i = header_pos + 5;
    int tail_pos = len - 1;
    bool find_tail = false;
    while (!find_tail && i < len - 5)
    {
        if (buf[i] == 0 && buf[i + 1] == 0 && buf[i + 2] == 0 && buf[i + 3] == 1)
        {
            tail_pos = i - 1;
            break;
        }
        i++;
    }

    memcpy(sps, buf + header_pos, tail_pos - header_pos + 1);
    len_sps = tail_pos - header_pos + 1;
    return true;
}

bool ExternalOutput::findPps(uint8_t *buf, int len, uint8_t *pps, int &pps_len)
{
    bool find_header = false;
    int i = 0;
    int header_pos = 0;
    while (!find_header && i < len - 5)
    {
        if (buf[i] == 0 && buf[i + 1] == 0 && buf[i + 2] == 0 && buf[i + 3] == 1 && buf[i + 4] == 0x68)
        {
            find_header = true;
            header_pos = i;
            break;
        }
        i++;
    }

    if (!find_header)
    {
        return false;
    }
    i = header_pos + 5;
    int tail_pos = len - 1;
    bool find_tail = false;
    while (!find_tail && i < len - 5)
    {
        if (buf[i] == 0 && buf[i + 1] == 0 && buf[i + 2] == 0 && buf[i + 3] == 1)
        {
            tail_pos = i - 1;
            break;
        }
        i++;
    }

    memcpy(pps, buf + header_pos, tail_pos - header_pos + 1);
    pps_len = tail_pos - header_pos + 1;
    return true;
}

void ExternalOutput::maybeWriteVideoPacket(char *buf, int len)
{
    RtpHeader *head = reinterpret_cast<RtpHeader *>(buf);
    if (!depacketizer_)
    {
        ELOG_ERROR("depacketizer_ is null, %d", head->getPayloadType());
        return;
    }

    depacketizer_->fetchPacket((unsigned char *)buf, len);
    bool deliver = depacketizer_->processPacket();
    if (deliver)
    {
        long long current_timestamp = head->getTimestamp(); // NOLINT
        if (current_timestamp - first_video_timestamp_ < 0)
        {
            // we wrapped.  add 2^32 to correct this.
            // We only handle a single wrap around since that's ~13 hours of recording, minimum.
            current_timestamp += 0xFFFFFFFF;
        }

        int64_t timestamp_to_write = 0;
        auto video_iterator = video_maps_.find(head->getPayloadType());
        if (video_iterator == video_maps_.end())
        {
            return;
        }
        timestamp_to_write = (current_timestamp - first_video_timestamp_) * 1000 / video_iterator->second.clock_rate;

        AVPacket av_packet;
        av_init_packet(&av_packet);
        unsigned char *data = depacketizer_->frame();
        int size = depacketizer_->frameSize();
        //添加h264 track
        if (!got_sps_pps_)
        {
            uint8_t sps[128];
            int sps_len = 0;
            uint8_t pps[128];
            int pps_len = 0;
            if (findSps(data, size, sps, sps_len) && findPps(data, size, pps, pps_len))
            { //找到sps了
                for (auto r : recorders_)
                {
                    if (r)
                    {
                        r->SetSPS(sps, sps_len);
                        r->SetPPS(pps, pps_len);
                        r->WriteH264Data(data, size, timestamp_to_write);
                    }
                }
                got_sps_pps_ = true;
            }
        }
        else
        {
            for (auto r : recorders_)
            {
                if (r)
                {
                    r->WriteH264Data(data, size, timestamp_to_write);
                }
            }
        }
        depacketizer_->reset();
    }
}

void ExternalOutput::notifyUpdateToHandlers()
{
    asyncTask([](std::shared_ptr<ExternalOutput> output) {
        output->pipeline_->notifyUpdate();
    });
}

void ExternalOutput::initializePipeline()
{
    stats_->getNode()["total"].insertStat("senderBitrateEstimation",
                                          CumulativeStat{static_cast<uint64_t>(kExternalOutputMaxBitrate)});

    handler_manager_ = std::make_shared<HandlerManager>(shared_from_this());
    pipeline_->addService(handler_manager_);
    pipeline_->addService(quality_manager_);
    pipeline_->addService(stats_);

    pipeline_->addFront(std::make_shared<LayerBitrateCalculationHandler>());
    pipeline_->addFront(std::make_shared<QualityFilterHandler>());

    pipeline_->addFront(std::make_shared<ExternalOuputWriter>(shared_from_this()));
    pipeline_->finalize();
    pipeline_initialized_ = true;
}

void ExternalOutput::write(std::shared_ptr<DataPacket> packet)
{
    queueData(packet->data, packet->length, packet->type);
}

void ExternalOutput::queueDataAsync(std::shared_ptr<DataPacket> copied_packet)
{
    asyncTask([copied_packet](std::shared_ptr<ExternalOutput> this_ptr) {
        if (!this_ptr->pipeline_initialized_)
        {
            return;
        }
        this_ptr->pipeline_->write(std::move(copied_packet));
    });
}

int ExternalOutput::deliverAudioData_(std::shared_ptr<DataPacket> audio_packet, const std::string &stream_id)
{
    std::shared_ptr<DataPacket> copied_packet = std::make_shared<DataPacket>(*audio_packet);
    copied_packet->type = AUDIO_PACKET;
    queueDataAsync(copied_packet);
    return 0;
}

int ExternalOutput::deliverVideoData_(std::shared_ptr<DataPacket> video_packet, const std::string &stream_id)
{
    if (video_source_ssrc_ == 0)
    {
        RtpHeader *h = reinterpret_cast<RtpHeader *>(video_packet->data);
        video_source_ssrc_ = h->getSSRC();
    }

    std::shared_ptr<DataPacket> copied_packet = std::make_shared<DataPacket>(*video_packet);
    copied_packet->type = VIDEO_PACKET;
    ext_processor_.processRtpExtensions(copied_packet);
    queueDataAsync(copied_packet);
    return 0;
}

int ExternalOutput::deliverEvent_(MediaEventPtr event)
{
    auto output_ptr = shared_from_this();
    worker_->task([output_ptr, event] {
        if (!output_ptr->pipeline_initialized_)
        {
            return;
        }
        output_ptr->pipeline_->notifyEvent(event);
    });
    return 1;
}

void ExternalOutput::queueData(char *buffer, int length, packetType type)
{
    if (!recording_)
    {
        return;
    }

    RtcpHeader *head = reinterpret_cast<RtcpHeader *>(buffer);
    if (head->isRtcp())
    {
        return;
    }

    if (first_data_received_ == time_point())
    {
        first_data_received_ = clock::now();
        if (getAudioSinkSSRC() == 0)
        {
            ELOG_DEBUG("No audio detected");
            audio_map_ = RtpMap{0, "PCMU", 8000, AUDIO_TYPE, 1};
            audio_codec_ = AV_CODEC_ID_PCM_MULAW;
        }
    }
    if (need_to_send_fir_ && video_source_ssrc_)
    {
        sendFirPacket();
        need_to_send_fir_ = false;
    }

    if (type == VIDEO_PACKET)
    {
        RtpHeader *h = reinterpret_cast<RtpHeader *>(buffer);
        uint8_t payloadtype = h->getPayloadType();
        if (video_offset_ms_ == -1)
        {
            video_offset_ms_ = ClockUtils::durationToMs(clock::now() - first_data_received_);
            // ELOG_DEBUG("File %s, video offset msec: %llu", context_->filename, video_offset_ms_);
            video_queue_.setTimebase(video_maps_[payloadtype].clock_rate);
        }

        // If this is a red header, let's push it to our fec_receiver_, which will spit out frames in one
        // of our other callbacks.
        // Otherwise, just stick it straight into the video queue.
        if (payloadtype == RED_90000_PT)
        {
            // The only things AddReceivedRedPacket uses are headerLength and sequenceNumber.
            // Unfortunately the amount of crap
            // we would have to pull in from the WebRtc project to fully construct
            // a licode::webrtc::RTPHeader object is obscene.  So
            // let's just do this hacky fix.
            licode::webrtc::RTPHeader hacky_header;
            hacky_header.headerLength = h->getHeaderLength();
            hacky_header.sequenceNumber = h->getSeqNumber();

            // AddReceivedRedPacket returns 0 if there's data to process
            if (0 == fec_receiver_->AddReceivedRedPacket(hacky_header, (const uint8_t *)buffer,
                                                         length, ULP_90000_PT))
            {
                fec_receiver_->ProcessReceivedFec();
            }
        }
        else
        {
            video_queue_.pushPacket(buffer, length);
        }
    }
    else
    {
        if (audio_offset_ms_ == -1)
        {
            audio_offset_ms_ = ClockUtils::durationToMs(clock::now() - first_data_received_);
            // ELOG_DEBUG("File %s, audio offset msec: %llu", context_->filename, audio_offset_ms_);

            // Let's also take a moment to set our audio queue timebase.
            RtpHeader *h = reinterpret_cast<RtpHeader *>(buffer);
            if (h->getPayloadType() == PCMU_8000_PT)
            {
                audio_queue_.setTimebase(8000);
            }
            else if (h->getPayloadType() == OPUS_48000_PT)
            {
                audio_queue_.setTimebase(48000);
            }
        }
        audio_queue_.pushPacket(buffer, length);
    }

    if (audio_queue_.hasData() || video_queue_.hasData())
    {
        // One or both of our queues has enough data to write stuff out.  Notify our writer.
        cond_.notify_one();
    }
}

int ExternalOutput::sendFirPacket()
{
    if (fb_sink_ != nullptr)
    {
        RtcpHeader pli_header;
        pli_header.setPacketType(RTCP_PS_Feedback_PT);
        pli_header.setBlockCount(1);
        pli_header.setSSRC(55543);
        pli_header.setSourceSSRC(video_source_ssrc_);
        pli_header.setLength(2);
        char *buf = reinterpret_cast<char *>(&pli_header);
        int len = (pli_header.getLength() + 1) * 4;
        std::shared_ptr<DataPacket> pli_packet = std::make_shared<DataPacket>(0, buf, len, VIDEO_PACKET);
        fb_sink_->deliverFeedback(pli_packet);
        return len;
    }
    return -1;
}

void ExternalOutput::sendLoop()
{
    while (recording_)
    {
        boost::unique_lock<boost::mutex> lock(mtx_);
        cond_.wait(lock);
        while (audio_queue_.hasData())
        {
            boost::shared_ptr<DataPacket> audio_packet = audio_queue_.popPacket();
            writeAudioData(audio_packet->data, audio_packet->length);
        }
        while (video_queue_.hasData())
        {
            boost::shared_ptr<DataPacket> video_packet = video_queue_.popPacket();
            writeVideoData(video_packet->data, video_packet->length);
        }
        if (!inited_ && first_data_received_ != time_point())
        {
            inited_ = true;
        }
    }

    // Since we're bailing, let's completely drain our queues of all data.
    while (audio_queue_.getSize() > 0)
    {
        boost::shared_ptr<DataPacket> audio_packet = audio_queue_.popPacket(true); // ignore our minimum depth check
        writeAudioData(audio_packet->data, audio_packet->length);
    }
    while (video_queue_.getSize() > 0)
    {
        boost::shared_ptr<DataPacket> video_packet = video_queue_.popPacket(true); // ignore our minimum depth check
        writeVideoData(video_packet->data, video_packet->length);
    }
}
} // namespace erizo
