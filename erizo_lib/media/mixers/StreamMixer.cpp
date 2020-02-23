#include "StreamMixer.h"

#include "BridgeIO.h"
#include "rtp/BridgeRtpRetransmissionHandler.h"
#include "lib/ClockUtils.h"

#include "media/engine/webrtc_media_engine.h"
#include "api/audio_codecs/builtin_audio_encoder_factory.h"
#include "api/audio_codecs/builtin_audio_decoder_factory.h"
#include "api/video_codecs/builtin_video_encoder_factory.h"
#include "api/video_codecs/builtin_video_decoder_factory.h"
#include "pc/test/fake_audio_capture_module.h"

#include "call/call_config.h"
#include "call/call.h"
#include "media/base/media_engine.h"
#include "api/call/call_factory_interface.h"
#include "test/fake_videorenderer.h"
#include "api/call/transport.h"
#include "modules/audio_mixer/audio_mixer_impl.h"
#include "api/video/builtin_video_bitrate_allocator_factory.h"
#include "media/engine/webrtc_video_engine.h"
#include "api/video/video_frame_buffer.h"
#include "api/video/i420_buffer.h"
//-Wno-error=overloaded-virtual -Wno-error=return-type
#include <opencv2/core.hpp>
#include <opencv2/core/mat.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include "modules/rtp_rtcp/source/rtp_packet.h"
#include "OneToManyProcessor.h"
#include "rtp/RtpUtils.h"
extern "C"
{
#include "libavcodec/avcodec.h"
#include "libavformat/avformat.h"
#include "libswscale/swscale.h"
};
namespace erizo
{

DEFINE_LOGGER(StreamMixer, "StreamMixer");
DEFINE_LOGGER(MixStream, "MixStream");
DEFINE_LOGGER(CustomBitrateAllocationStrategy, "CustomBitrateAllocationStrategy");

enum : int {  // The first valid value is 1.
  kTransportSequenceNumberExtensionId = 1,
  kVideoContentTypeExtensionId,
  kVideoRotationRtpExtensionId,
};

MixStream::MixStream(const Layer &layer, 
                     cricket::MediaEngineInterface *media_engine)
{
    layer_ = layer;
    media_engine_ = media_engine;
}

bool MixStream::init()
{
    if(initialized_) {
        return true;
    }
    
    audio_decoder_factory_ = webrtc::CreateBuiltinAudioDecoderFactory();
    video_decoder_factory_ = webrtc::CreateBuiltinVideoDecoderFactory();

    rtc_event_log_ = webrtc::RtcEventLog::CreateNull();
    webrtc::Call::Config call_config(rtc_event_log_.get());
    call_config.audio_state = media_engine_->voice().GetAudioState();
    call_.reset(webrtc::CreateCallFactory()->CreateCall(call_config));
    if(!call_) {
        ELOG_ERROR("create recv call for stream:%s failed.", layer_.stream_id.c_str());
        return false;
    }
    
    webrtc::VideoReceiveStream::Config video_config(this);
    video_config.rtp.remb = true;
    video_config.rtp.transport_cc = false;
    video_config.rtp.local_ssrc = 0x123456;//这个值不能填0
    video_config.sync_group = layer_.bridge_stream.id;

    video_config.renderer = this;
    video_config.rtp.remote_ssrc = layer_.video_ssrc;
    webrtc::VideoReceiveStream::Decoder h264_decoder;
    h264_decoder.payload_type = 101;
    h264_decoder.video_format = webrtc::SdpVideoFormat("H264");
    h264_decoder.decoder_factory = video_decoder_factory_.get();
    video_config.decoders.push_back(h264_decoder);

    video_recv_stream_ = call_->CreateVideoReceiveStream(video_config.Copy());
    if(!video_recv_stream_) {
        ELOG_ERROR("create video recv stream for stream:%s failed.", layer_.stream_id.c_str());
        return false;
    }

    webrtc::AudioReceiveStream::Config audio_config;
    audio_config.rtp.local_ssrc = 0x123456;
    audio_config.decoder_factory = audio_decoder_factory_;
    audio_config.rtcp_send_transport = this;
    audio_config.rtp.remote_ssrc = layer_.audio_ssrc;
    audio_config.rtp.transport_cc = false;
    audio_config.decoder_map = {{111, {"opus", 48000, 2}}};
    audio_config.sync_group = layer_.bridge_stream.id;
    audio_recv_stream_ = call_->CreateAudioReceiveStream(audio_config);
    if(!audio_recv_stream_) {
        ELOG_ERROR("create audio recv stream for stream:%s failed.", layer_.stream_id.c_str());
        return false;
    }

    video_recv_stream_->Start();
    audio_recv_stream_->Start();
    initialized_ = true;
    return true;
}

void MixStream::close()
{
    if(!initialized_)
        return;

    if(video_recv_stream_) {
        video_recv_stream_->Stop();
    }
    
    if(audio_recv_stream_) {
        audio_recv_stream_->Stop();
    }
    
    if(call_ && audio_recv_stream_) {
        call_->DestroyAudioReceiveStream(audio_recv_stream_);
    }

    if(call_ && video_recv_stream_) {
        call_->DestroyVideoReceiveStream(video_recv_stream_);
    }

    call_.reset();
    call_ = nullptr;

    initialized_ = false;
}

void MixStream::OnFrame(const webrtc::VideoFrame& frame) {
    rtc::scoped_refptr<webrtc::I420BufferInterface> buffer(frame.video_frame_buffer()->ToI420());
	if (frame.rotation() != webrtc::kVideoRotation_0) {
		buffer = webrtc::I420Buffer::Rotate(*buffer, frame.rotation());
	}

    int width = frame.width();
    int height = frame.height();
    int mwh = width*height;
    std::lock_guard<std::mutex> lck(buf_mutex_);
    if(!yuv420_buf_ || width_ != width || height_ != height) {
        yuv420_buf_.reset();
        yuv420_buf_ = nullptr;
        yuv420_buf_ = std::shared_ptr<char>(new char[mwh*3/2]);
        width_ = width;
        height_ = height;
    }

    //copy y
    char *y_start = yuv420_buf_.get();
    if(buffer->StrideY() != width) {
        for(int i = 0; i < height; i++) {
            memcpy(y_start + i*width, (char*)buffer->DataY() + buffer->StrideY()*i, width);
        }
    } else {
        memcpy(y_start, (char*)buffer->DataY(), buffer->StrideY()*height);
    }

    int uv_height = (height+1)/2;
    int uv_width = (width+1)/2;
    //copy u
    char *u_start = yuv420_buf_.get() + mwh;
    if(buffer->StrideU() != uv_width) {
        for(int i = 0; i < uv_height; i++) {
            memcpy(u_start + i*uv_width, (char*)buffer->DataU() + buffer->StrideU()*i, uv_width);
        }
    } else {
        memcpy(u_start, (char*)buffer->DataU(), buffer->StrideU()*uv_height);
    }
    //copy v
    char *v_start = yuv420_buf_.get() + mwh*5/4;
    if(buffer->StrideV() != uv_width) {
        for(int i = 0; i < uv_height; i++) {
            memcpy(v_start + i*uv_width, (char*)buffer->DataV() + buffer->StrideV()*i, uv_width);
        }
    } else {
        memcpy(v_start, (char*)buffer->DataV(), buffer->StrideV()*uv_height);
    }

    frame_count_++;
}

std::tuple<std::shared_ptr<char>, int, int> MixStream::getVideoData()
{
    std::lock_guard<std::mutex> lck(buf_mutex_);
    if(width_ == 0 || height_ == 0) {
        return std::make_tuple(nullptr, width_, height_);
    }
    std::shared_ptr<char> temp_buf = std::shared_ptr<char>(new char[width_*height_*3/2]);
    memcpy(temp_buf.get(), yuv420_buf_.get(), width_*height_*3/2);
    return std::make_tuple(temp_buf, width_, height_);
}

int MixStream::DeliverPacket(webrtc::MediaType media_type,
                            std::shared_ptr<DataPacket> data_packet)
{
    if(call_ && call_->Receiver()) {
        rtc::CopyOnWriteBuffer buffer(data_packet->data, data_packet->length);
        webrtc::PacketReceiver::DeliveryStatus status = call_->Receiver()->DeliverPacket(media_type, buffer, data_packet->received_time_ms*1000);
        if(webrtc::PacketReceiver::DELIVERY_OK == status) {
            return 0;
        }
        return -1;
    }
    return -2;
}

bool MixStream::SendRtp(const uint8_t* packet,
                        size_t length,
                        const webrtc::PacketOptions& options)
{
    return true;
}

bool MixStream::SendRtcp(const uint8_t* packet, size_t length)
{
    if(layer_.bridge_feedback_sink) {
        RtcpHeader *chead = reinterpret_cast<RtcpHeader*> ((char*)packet);

        ELOG_ERROR("****************************deliver rtcp back type=%d************************************", chead->getPacketType());
        std::shared_ptr<erizo::DataPacket> ez_packet = std::make_shared<erizo::DataPacket>(1, 
                                                        (const char*)packet, length, erizo::OTHER_PACKET, ClockUtils::getCurrentMs());
        layer_.bridge_feedback_sink->deliverFeedback(ez_packet, layer_.bridge_stream.id);
        return true;
    }
    return false;
}

MixStream::~MixStream() 
{
    close();
}

StreamMixer::StreamMixer()
{
    mix_start_ = false;
    exit_ = false;
    initialized_ = false;
}

std::vector<webrtc::RtpExtension> StreamMixer::GetVideoRtpExtensions() {
  return {webrtc::RtpExtension(webrtc::RtpExtension::kTransportSequenceNumberUri,
                       kTransportSequenceNumberExtensionId),
          webrtc::RtpExtension(webrtc::RtpExtension::kVideoContentTypeUri,
                       kVideoContentTypeExtensionId),
          webrtc::RtpExtension(webrtc::RtpExtension::kVideoRotationUri,
                       kVideoRotationRtpExtensionId)};
}

webrtc::VideoCodecH264 StreamMixer::GetDefaultH264Settings() {
  webrtc::VideoCodecH264 h264_settings;
  memset(&h264_settings, 0, sizeof(h264_settings));

  h264_settings.frameDroppingOn = true;
  h264_settings.keyFrameInterval = 3000;//这个需要修改下，根据外部传入修改
  h264_settings.numberOfTemporalLayers = 1;
  h264_settings.spsData = nullptr;
  h264_settings.spsLen = 0;
  h264_settings.ppsData = nullptr;
  h264_settings.ppsLen = 0;
  h264_settings.profile = webrtc::H264::kProfileConstrainedBaseline;

  return h264_settings;
}

std::string StreamMixer::getStreamId()
{
    return mixer_.id;
}

const Mixer & StreamMixer::getMixerConfig() const
{
    return mixer_;
}

int StreamMixer::init(const Mixer &mixer)
{
    if (initialized_)
        return 0;
    last_packet_time_ = time(NULL);
    mixer_ = mixer;
    auto layer_sort = [](const Layer &a, const Layer &b) {
        return a.index > b.index;
    };
    std::sort(mixer_.layers.begin(), mixer_.layers.end(), layer_sort);

    otm_processor_ = std::make_shared<erizo::OneToManyProcessor>();
    source_fb_sink_ = this;
    sink_fb_source_ = this;
    setAudioSink(otm_processor_.get());
    setVideoSink(otm_processor_.get());
    setEventSink(otm_processor_.get());
    video_sink_ssrc_ = mixer_.video_ssrc;
    audio_sink_ssrc_ = mixer_.audio_ssrc;
    setVideoSourceSSRC(mixer_.video_ssrc);
    setAudioSourceSSRC(mixer_.audio_ssrc);
    otm_processor_->setPublisher(shared_from_this());

    if(0 != createSendStream()) {
        ELOG_ERROR("create send stream failed.");
        return -1;
    }

    if(0 != createRecvStreams()) {
        ELOG_ERROR("create recv streams failed.");
        return -2;
    }

    initialized_ = true;
    video_mix_thread_ = std::make_shared<std::thread>(std::bind(&StreamMixer::mixFrame, this));
    return 0;
}

void StreamMixer::addMixerLayer(const Layer &layer)
{
    if(!initialized_) {
        return;
    }

    if(!recv_worker_thread_) {
        return;
    }

    int ret = recv_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=, &layer]() {
        if(mix_streams_.find(layer.bridge_stream.id) == mix_streams_.end()) {
            std::shared_ptr<MixStream> mix_stream = std::make_shared<MixStream>(layer, recv_media_engine_.get());
            if(!mix_stream->init()) {
                return -1;
            }

            mix_streams_.insert(std::make_pair(layer.bridge_stream.id, mix_stream));
            mixer_.layers.emplace_back(std::move(layer));
            return 0;
        }
        return -2;
    });
}

void StreamMixer::removeMixerLayer(const Layer &layer)
{
    if(!initialized_) {
        return;
    }

    if(!recv_worker_thread_) {
        return;
    }

    int ret = recv_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=, &layer]() {
        auto find_stream = [&layer](const Layer &l){
            return l.stream_id == layer.stream_id && l.index == layer.index;
        };

        int stream_used_count = std::count_if(mixer_.layers.begin(), mixer_.layers.end(), find_stream);
        if(stream_used_count <= 1) {
            auto it_mix_stream = mix_streams_.find(layer.bridge_stream.id);
            if(it_mix_stream != mix_streams_.end()) {
                it_mix_stream->second->close();
                mix_streams_.erase(layer.bridge_stream.id);
            }
        }

        auto remove_layer = [&layer](const Layer &l) {
            return l.stream_id == layer.stream_id && l.index == layer.index;
        };
        std::remove_if(mixer_.layers.begin(), mixer_.layers.end(), remove_layer);
        return 0;
    });
}

int StreamMixer::createSendStream()
{
    send_worker_thread_  = rtc::Thread::Create();
    send_worker_thread_->SetName("send_worker_thread", nullptr);
    send_worker_thread_->Start();

    int ret = send_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=]() {
        send_adm_ = webrtc::AudioDeviceModule::Create(webrtc::AudioDeviceModule::kPlatformDefaultAudio);
        if(!send_adm_) {
            ELOG_ERROR("create adm failed.");
            return -1;
        }

        webrtc::AudioState::Config audio_state_config;
        audio_state_config.audio_mixer = webrtc::AudioMixerImpl::Create();
        audio_state_config.audio_processing = webrtc::AudioProcessingBuilder().Create();
        audio_state_config.audio_device_module = send_adm_;
        rtc_event_log_ = webrtc::RtcEventLog::CreateNull();
        webrtc::Call::Config call_config(rtc_event_log_.get());
        call_config.audio_state = webrtc::AudioState::Create(audio_state_config);
        if(!call_config.audio_state) {
            ELOG_ERROR("audio send stream create failed.");
            return -2;
        }
        call_config.bitrate_config.min_bitrate_bps = 70000;
        call_config.bitrate_config.start_bitrate_bps = 300000;
        call_config.bitrate_config.max_bitrate_bps = 3000000;
        send_call_.reset(webrtc::CreateCallFactory()->CreateCall(call_config));

        webrtc::BitrateConstraints bitrate_config;
        bitrate_config.min_bitrate_bps = 70000;
        bitrate_config.start_bitrate_bps = 300000;
        bitrate_config.max_bitrate_bps = 3000000;
        send_call_->GetTransportControllerSend()->SetSdpBitrateParameters(bitrate_config);
        
        webrtc::AudioSendStream::Config audio_send_config(this);
        audio_track_id_ = "audio-"+mixer_.id;
        audio_send_config.track_id = audio_track_id_;
        audio_send_config.rtp.ssrc = mixer_.audio_ssrc;
        audio_send_config.rtp.c_name = kCName;
        audio_encoder_factory_ = webrtc::CreateBuiltinAudioEncoderFactory();
        audio_send_config.encoder_factory = audio_encoder_factory_;
        const webrtc::SdpAudioFormat kOpusFormat = {"opus", 48000, 2};
        audio_send_config.send_codec_spec = webrtc::AudioSendStream::Config::SendCodecSpec(111, kOpusFormat);
        audio_send_config.min_bitrate_bps = 10000;
        audio_send_config.max_bitrate_bps = 65000;
        audio_send_stream_ = send_call_->CreateAudioSendStream(audio_send_config);
        if(!audio_send_stream_) {
            ELOG_ERROR("audio send stream create failed.");
            return -3;
        }

        webrtc::VideoSendStream::Config video_send_config(this);
        video_encoder_factory_ = webrtc::CreateBuiltinVideoEncoderFactory();
        video_track_id_ = "video-"+mixer_.id;
        video_send_config.track_id = video_track_id_;
        video_send_config.encoder_settings.encoder_factory = video_encoder_factory_.get();
        bitrate_allocator_factory_ = webrtc::CreateBuiltinVideoBitrateAllocatorFactory();
        video_send_config.encoder_settings.bitrate_allocator_factory = bitrate_allocator_factory_.get();
        video_send_config.rtp.payload_name = "H264";
        video_send_config.rtp.payload_type = 101;
        video_send_config.rtp.ssrcs.push_back(mixer_.video_ssrc);
        video_send_config.rtp.extensions = GetVideoRtpExtensions();

        webrtc::VideoEncoderConfig video_encoder_config;
        video_encoder_config.content_type = webrtc::VideoEncoderConfig::ContentType::kRealtimeVideo;
        video_encoder_config.codec_type = webrtc::kVideoCodecH264;
        video_encoder_config.number_of_streams = 1;
        video_encoder_config.max_bitrate_bps = 10000000;
        video_encoder_config.simulcast_layers = std::vector<webrtc::VideoStream>(1);
        video_encoder_config.video_format.name = "H264";
        webrtc::VideoCodecH264 h264 = GetDefaultH264Settings();
        // h264.frameDroppingOn = false;
        video_encoder_config.encoder_specific_settings = new rtc::RefCountedObject<webrtc::VideoEncoderConfig::H264EncoderSpecificSettings>(h264);
        video_encoder_config.encoder_specific_settings->FillVideoCodecH264(&h264);
        video_encoder_config.video_stream_factory = new rtc::RefCountedObject<cricket::EncoderStreamFactory>("H264", 56, false, false);
        // video_send_streams_ = video_encoder_config.video_stream_factory->CreateEncoderStreams(mixer_.width, mixer_.height, video_encoder_config);
        // const unsigned char num_temporal_layers = static_cast<unsigned char>(
        // video_send_streams_.back().num_temporal_layers.value_or(1));
        // h264.numberOfTemporalLayers = 1;//num_temporal_layersnum_temporal_layers;
        
        video_send_stream_ = send_call_->CreateVideoSendStream(video_send_config.Copy(), video_encoder_config.Copy());
        if(!video_send_stream_) {
            ELOG_ERROR("video send stream create failed.");
            return -4;
        }
        video_send_stream_->SetSource(this, webrtc::DegradationPreference::MAINTAIN_FRAMERATE);
        bitrate_allocation_strategy_.reset(new CustomBitrateAllocationStrategy(this));
        send_call_->SetBitrateAllocationStrategy(std::move(bitrate_allocation_strategy_));

        send_call_->GetTransportControllerSend()->OnNetworkAvailability(true);
        //send_call_->SignalChannelNetworkState(MediaType::VIDEO, kNetworkUp);
        audio_send_stream_->Start();
        video_send_stream_->Start();
        return 0;
    });
    return ret;
}

int StreamMixer::createRecvStreams()
{
    if(!send_worker_thread_) {
        ELOG_ERROR("please create send thread before create recv streams.");
        return -1;
    }
    recv_worker_thread_ = rtc::Thread::Create();
    recv_worker_thread_->SetName("recv_worker_thread", nullptr);
	recv_worker_thread_->Start();

    int ret = recv_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=]() {
        recv_adm_ = webrtc::AudioDeviceModule::Create(webrtc::AudioDeviceModule::kPlatformDefaultAudio);
        if(!recv_adm_) {
            ELOG_ERROR("create receive adm failed.");
            return -2;
        }

        recv_media_engine_ = cricket::WebRtcMediaEngineFactory::Create(
              recv_adm_, webrtc::CreateBuiltinAudioEncoderFactory(), webrtc::CreateBuiltinAudioDecoderFactory(),
              webrtc::CreateBuiltinVideoEncoderFactory(), webrtc::CreateBuiltinVideoDecoderFactory(),
              webrtc::AudioMixerImpl::Create(), webrtc::AudioProcessingBuilder().Create());
        
        if(!recv_media_engine_->Init()) {
            ELOG_ERROR("media engine init failed.");
            return -3;
        }

        for(const auto &layer : mixer_.layers) {
            if(mix_streams_.find(layer.bridge_stream.id) != mix_streams_.end()) {
                continue;
            }

            std::shared_ptr<MixStream> mix_stream = std::make_shared<MixStream>(layer, recv_media_engine_.get());
            if(!mix_stream->init()) {
                return -4;
            }

            mix_streams_.insert(std::make_pair(layer.bridge_stream.id, mix_stream));
        }

        recv_adm_->OnPlayout([=](int64_t timestamp, const char *data, size_t len, size_t sample_rate, size_t channel_num, size_t samples) {
            send_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=]() {
                std::unique_ptr<webrtc::AudioFrame> audio_frame(new webrtc::AudioFrame());
                audio_frame->UpdateFrame(
                    (uint32_t)timestamp,
                    (const int16_t*)data,
                    samples,
                    sample_rate,
                    webrtc::AudioFrame::kNormalSpeech,
                    webrtc::AudioFrame::kVadUnknown,
                    channel_num
                );
                audio_send_stream_->SendAudioData(std::move(audio_frame));
                return 0;
            });
        });
        return 0;
    });

    return ret;
}

int StreamMixer::removeRecvStreams()
{
    if(!recv_worker_thread_) {
        ELOG_ERROR("recv worker thread not working");
        return -1;
    }

    int ret = recv_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=]() {
        for(auto it : mix_streams_) {
           it.second->close();
        }
        mix_streams_.clear();

        recv_media_engine_.reset();
        recv_media_engine_ = nullptr;
        
        recv_adm_->Terminate();
        recv_adm_.release();
        recv_adm_ = nullptr;
        return 0;
    });

    recv_worker_thread_->Stop();
    return ret;
}

int StreamMixer::removeSendStream()
{   
    if(!send_worker_thread_) {
        ELOG_ERROR("send worker thread not working");
        return -1;
    }

    int ret = send_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=]() {
        if(send_call_ && audio_send_stream_) {
            send_call_->DestroyAudioSendStream(audio_send_stream_);
            audio_send_stream_= nullptr;
        }

        if(send_call_ && video_send_stream_) {
            send_call_->DestroyVideoSendStream(video_send_stream_);
            video_send_stream_ = nullptr;
        }


        send_adm_->Terminate();
        send_adm_.release();
        send_adm_ = nullptr;

        send_call_.reset();
        send_call_ = nullptr;

        rtc_event_log_.reset();
        rtc_event_log_ = nullptr;

        video_encoder_factory_.reset();
        video_encoder_factory_ = nullptr;

        audio_encoder_factory_.release();
        audio_encoder_factory_ = nullptr;

        bitrate_allocator_factory_.reset();
        bitrate_allocator_factory_ = nullptr;

        bitrate_allocation_strategy_.reset();
        bitrate_allocation_strategy_ = nullptr;
        return 0;
    });

    send_worker_thread_->Stop();
    return ret;
}

void StreamMixer::addSubscriber(const std::string &client_id, std::shared_ptr<erizo::MediaStream> media_stream)
{
    if (otm_processor_ != nullptr)
    {
        std::string subscriber_id = (client_id + "_") + mixer_.id;
        otm_processor_->addSubscriber(media_stream, subscriber_id);
    }
}

void StreamMixer::addSubscriber(const std::string &bridge_stream_id, std::shared_ptr<erizo::BridgeMediaStream> bridge_media_stream)
{
    if (otm_processor_ != nullptr)
    {
        otm_processor_->addSubscriber(bridge_media_stream, bridge_stream_id);
    }
}

void StreamMixer::removeSubscriber(const std::string &client_id)
{
    if (otm_processor_ != nullptr)
    {
        std::string subscriber_id = (client_id + "_") + mixer_.id;
        otm_processor_->removeSubscriber(subscriber_id);
    }
}

void StreamMixer::setMediaStreamEventListener(MediaStreamEventListener* listener)
{
    media_stream_event_listener_ = listener;
}

void StreamMixer::mixFrame() {
    cv::Mat dst_rgb_img(mixer_.height, mixer_.width, CV_8UC3);
    cv::Mat dst_yuv_img;
    int cost_ms = 0;
    while(1) {
        std::unique_lock<std::mutex> lck(exit_mutex_);
        exit_cv_.wait_for(lck, std::chrono::milliseconds(40 - cost_ms));
        if(exit_) {
            break;
        }

        if((time(NULL) - last_packet_time_) > 5) 
        {//超过30秒没有数据流，则通知外面要关闭这个混流
            if(media_stream_event_listener_)
            {
                last_packet_time_ = time(NULL);
                media_stream_event_listener_->notifyMediaStreamEvent(mixer_.stream_id, "Mixer::noPacketOvertime", mixer_.client_id);
            }
        }      

        auto begin = std::chrono::high_resolution_clock::now();
        for(const auto & layer: mixer_.layers) {
            int dst_width = layer.width;
            int dst_height = layer.height;
            int off_x = layer.off_x;
            int off_y = layer.off_y;
            std::string stream_id = layer.bridge_stream.id;
            cv::Mat yuvImg;
            auto it_mix_stream = mix_streams_.find(stream_id);
            if(it_mix_stream == mix_streams_.end()) {
                ELOG_ERROR("could not find stream:%s", stream_id.c_str());
                continue;
            }

            std::shared_ptr<char> buff420;
            int src_width;
            int src_height;
            std::tie(buff420, src_width, src_height) = it_mix_stream->second->getVideoData();
            if(buff420) {
                yuvImg.create(src_height*3/2, src_width, CV_8UC1);
                //yuv转rgb
                memcpy(yuvImg.data, buff420.get(), src_width*src_height*3/2);
                cv::Mat rgbImg;
                cv::cvtColor(yuvImg, rgbImg, cv::COLOR_YUV2RGB_I420);
                //缩放
                cv::Mat scaleImage;
                resize(rgbImg, scaleImage, cv::Size(dst_width, dst_height), 0, 0, cv::INTER_LINEAR);
                //贴图
                cv::Mat imageROI;
                imageROI = dst_rgb_img(cv::Rect(off_x, off_y, scaleImage.cols, scaleImage.rows));
                cv::Mat	matMask;
                cv::cvtColor(scaleImage, matMask, cv::COLOR_BGR2GRAY);
                scaleImage.copyTo(imageROI, matMask);
            }
        }

        cv::cvtColor(dst_rgb_img, dst_yuv_img, cv::COLOR_RGB2YUV_I420);
        auto end = std::chrono::high_resolution_clock::now();
        auto dur = std::chrono::duration_cast<std::chrono::milliseconds>(end-begin);
        cost_ms = dur.count();
        send_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=, &dst_yuv_img]() {
            webrtc::VideoFrame frame =
            webrtc::VideoFrame::Builder()
            .set_video_frame_buffer(webrtc::I420Buffer::Copy(mixer_.width, 
                                                             mixer_.height, 
                                                             dst_yuv_img.data, mixer_.width, 
                                                             dst_yuv_img.data+mixer_.width*mixer_.height, (mixer_.width+1)/2, 
                                                             dst_yuv_img.data+mixer_.width*mixer_.height*5/4, (mixer_.width+1)/2))
            .set_timestamp_us(rtc::SystemTimeMillis()*1000)
            .set_id(0)
            .build();

            for (auto& sink_pair : sink_pairs()) {
                // ELOG_ERROR("********************  start on frame *********************");
                sink_pair.sink->OnFrame(frame);
                // ELOG_ERROR("********************  end on frame *********************");
            }
            return 0;
        });
        
    }
}

void StreamMixer::close()
{
    if (!initialized_)
        return;
    exit_ = true;
    exit_cv_.notify_all();
    if(video_mix_thread_) {
        video_mix_thread_->join();
    }
    removeRecvStreams();
    removeSendStream();
    setFeedbackSink(nullptr);
    setAudioSink(nullptr);
    setVideoSink(nullptr);
    setEventSink(nullptr);
    otm_processor_->close();
    otm_processor_.reset();
    otm_processor_ = nullptr;
    initialized_ = false;
}

StreamMixer::~StreamMixer()
{
    close();
}

int StreamMixer::deliverAudioData_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id)
{
    last_packet_time_ = time(NULL);
    auto it = mix_streams_.find(stream_id);
    if(it == mix_streams_.end()) {
        return 0;
    }

    std::shared_ptr<MixStream> mix_stream = it->second;
    recv_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=]() {
        mix_stream->DeliverPacket(webrtc::MediaType::AUDIO, data_packet);
        return 0;
    });
    return 0;
}

int StreamMixer::deliverVideoData_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id)
{
    last_packet_time_ = time(NULL);
    auto it = mix_streams_.find(stream_id);
    if(it == mix_streams_.end()) {
        return 0;
    }

    std::shared_ptr<MixStream> mix_stream = it->second;
    recv_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=]() {
        mix_stream->DeliverPacket(webrtc::MediaType::VIDEO, data_packet);
        return 0;
    });
    return 0;
}

int StreamMixer::deliverFeedback_(std::shared_ptr<DataPacket> fb_packet, const std::string &stream_id)
{
    RtcpHeader *chead = reinterpret_cast<RtcpHeader*>(fb_packet->data);
    send_worker_thread_->Invoke<int>(RTC_FROM_HERE, [=]() {
        rtc::CopyOnWriteBuffer buffer(fb_packet->data, fb_packet->length);
        send_call_->Receiver()->DeliverPacket(webrtc::MediaType::ANY, buffer, fb_packet->received_time_ms*1000);
        return 0;
    });
    return fb_packet->length;
}

bool StreamMixer::SendRtp(const uint8_t* packet,
                          size_t length,
                          const webrtc::PacketOptions& options)
{
    std::shared_ptr<webrtc::RtpPacket> rtp_packet = std::make_shared<webrtc::RtpPacket>();
    if(!rtp_packet->Parse(packet, length)) {
        return false;
    } 
    
    if(rtp_packet->PayloadType() == 111) {
        std::shared_ptr<erizo::DataPacket> ez_packet = std::make_shared<erizo::DataPacket>(1, (const char*)packet, length, erizo::AUDIO_PACKET, ClockUtils::getCurrentMs());
        otm_processor_->deliverAudioData(std::move(ez_packet), mixer_.id);
    } else if(rtp_packet->PayloadType() == 101) {
        std::shared_ptr<erizo::DataPacket> ez_packet = std::make_shared<erizo::DataPacket>(1, (const char*)packet, length, erizo::VIDEO_PACKET, ClockUtils::getCurrentMs());
        otm_processor_->deliverVideoData(std::move(ez_packet), mixer_.id);
    }
    return true;
}

bool StreamMixer::SendRtcp(const uint8_t* packet, size_t length)
{//这里的rtcp为sr包及sdes包，需要发送给所有的客户端
    RtcpHeader *chead = reinterpret_cast<RtcpHeader*> ((char*)packet);
    if(chead->getSSRC() == mixer_.video_ssrc) {
        std::shared_ptr<erizo::DataPacket> ez_packet = std::make_shared<erizo::DataPacket>(1, (const char*)packet, length, erizo::VIDEO_PACKET, ClockUtils::getCurrentMs());
        otm_processor_->deliverVideoData(std::move(ez_packet), mixer_.id);
    } else if(chead->getSSRC() == mixer_.audio_ssrc) {
        std::shared_ptr<erizo::DataPacket> ez_packet = std::make_shared<erizo::DataPacket>(1, (const char*)packet, length, erizo::AUDIO_PACKET, ClockUtils::getCurrentMs());
        otm_processor_->deliverAudioData(std::move(ez_packet), mixer_.id);
    }
    return true;
}

CustomBitrateAllocationStrategy::CustomBitrateAllocationStrategy(StreamMixer *stream_mixer) 
{
    stream_mixer_ = stream_mixer;
}

std::vector<uint32_t> CustomBitrateAllocationStrategy::AllocateBitrates(uint32_t available_bitrate,
                                       std::vector<BitrateAllocationStrategy::TrackConfig> track_configs)
{
    std::vector<uint32_t> vec_bitrates;
    for(auto track_config : track_configs) {
        if(track_config.track_id == stream_mixer_->audio_track_id_) {
            vec_bitrates.push_back(65000);//audio
        } else if(track_config.track_id == stream_mixer_->video_track_id_) {
            vec_bitrates.push_back(stream_mixer_->mixer_.bitrate);
        }
    }
    return vec_bitrates;
}

} // namespace erizo