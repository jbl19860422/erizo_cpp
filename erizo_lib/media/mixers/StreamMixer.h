
/*
* StreamMixer.h
*/
#ifndef ERIZO_SRC_ERIZO_MEDIA_MIXERS_StreamMixer_H_
#define ERIZO_SRC_ERIZO_MEDIA_MIXERS_StreamMixer_H_
#include <map>
#include <vector>
#include <tuple>
#include <condition_variable>

#include "./MediaDefinitions.h"
#include "media/MediaProcessor.h"
#include "BridgeMediaStream.h"
#include "media/codecs/AudioCodec.h"
#include "media/Depacketizer.h"
#include "thread/Worker.h"
#include "./logger.h"
#include "call/call_config.h"
#include "call/call.h"
#include "media/base/media_engine.h"
#include "api/call/call_factory_interface.h"
#include "test/fake_videorenderer.h"
#include "api/scoped_refptr.h"
#include "video_render.h"
#include "media/base/video_source_base.h"
#include "MediaStream.h"
#include "media/mixers/mixer.h"
#include "api/video_codecs/video_decoder_factory.h"

namespace erizo {
class WebRtcConnection;
class OneToManyProcessor;
class StreamMixer;
class RTPSink;

class MixStream : public rtc::VideoSinkInterface<webrtc::VideoFrame>, public webrtc::Transport {//单独一路带混合的流
  DECLARE_LOGGER();
public:
  MixStream(const Layer &layer, 
            cricket::MediaEngineInterface *media_engine);
  virtual ~MixStream();
  bool init();
  void close();
  void OnFrame(const webrtc::VideoFrame& frame);
  std::tuple<std::shared_ptr<char>, int, int> getVideoData();
  int DeliverPacket(webrtc::MediaType media_type,
                    std::shared_ptr<DataPacket> data_packet);
public:
  //transport interface
  virtual bool SendRtp(const uint8_t* packet,
                       size_t length,
                       const webrtc::PacketOptions& options);
  virtual bool SendRtcp(const uint8_t* packet, size_t length);
private:
  std::unique_ptr<webrtc::RtcEventLog> rtc_event_log_ = nullptr;
  std::unique_ptr<webrtc::Call> call_ = nullptr;
  webrtc::VideoReceiveStream *video_recv_stream_ = nullptr;
  webrtc::AudioReceiveStream *audio_recv_stream_ = nullptr;
  rtc::scoped_refptr<webrtc::AudioDecoderFactory> audio_decoder_factory_ = nullptr;
  std::unique_ptr<webrtc::VideoDecoderFactory> video_decoder_factory_ = nullptr;
  Layer layer_;
  std::mutex buf_mutex_;
  std::shared_ptr<char> yuv420_buf_ = nullptr;
  int width_ = 0;
  int height_ = 0;
  cricket::MediaEngineInterface *media_engine_;
  uint64_t frame_count_ = 0;
  bool initialized_ = false;
  friend class StreamMixer;
};

class CustomBitrateAllocationStrategy : public rtc::BitrateAllocationStrategy {
  DECLARE_LOGGER();
public:
  CustomBitrateAllocationStrategy(StreamMixer *stream_mixer);
  virtual ~CustomBitrateAllocationStrategy() {};
  //bitrate allocation strategy
  std::vector<uint32_t> AllocateBitrates(uint32_t available_bitrate,
                                         std::vector<BitrateAllocationStrategy::TrackConfig> track_configs);
private:
  StreamMixer *stream_mixer_;
};

class StreamMixer : public MediaSink, public MediaSource, 
                    public FeedbackSink, public FeedbackSource, 
                    public rtc::VideoSourceBase, public webrtc::Transport,
                    public std::enable_shared_from_this<StreamMixer> {
  DECLARE_LOGGER();
  enum classPayloadTypes : uint8_t {
    kSendRtxPayloadType = 98,
    kRtxRedPayloadType = 99,
    kVideoSendPayloadType = 100,
    kAudioSendPayloadType = 103,
    kRedPayloadType = 118,
    kUlpfecPayloadType = 119,
    kFlexfecPayloadType = 120,
    kPayloadTypeH264 = 122,
    kPayloadTypeVP8 = 123,
    kPayloadTypeVP9 = 124,
    kFakeVideoSendPayloadType = 125,
  };

  const char* kCName = "mix_stream";
public:
  StreamMixer();
  ~StreamMixer();

  int init(const Mixer &mixer);
  void addMixerLayer(const Layer &layer);
  void removeMixerLayer(const Layer &layer);

  std::string getStreamId();
  const Mixer & getMixerConfig() const;
  void addSubscriber(const std::string &client_id, std::shared_ptr<erizo::MediaStream> media_stream);
  void addSubscriber(const std::string &bridge_stream_id, std::shared_ptr<erizo::BridgeMediaStream> bridge_media_stream);
  void removeSubscriber(const std::string &client);

  void mixFrame();
  virtual void close() override;
private:
  virtual int deliverAudioData_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id) override;
  virtual int deliverVideoData_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id) override;
  virtual int deliverFeedback_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id) override;
  virtual int deliverEvent_(MediaEventPtr event) override { return 0; }
  virtual int sendPLI() override { return 0; }
  int createSendStream();
  int createRecvStreams();
  int removeRecvStreams();
  int removeSendStream();
  std::vector<webrtc::RtpExtension> GetVideoRtpExtensions();
  webrtc::VideoCodecH264 GetDefaultH264Settings();
public:
  //transport
  virtual bool SendRtp(const uint8_t* packet,
                       size_t length,
                       const webrtc::PacketOptions& options);
  virtual bool SendRtcp(const uint8_t* packet, size_t length);
private:
  Mixer mixer_;
  std::unique_ptr<webrtc::RtcEventLog> rtc_event_log_;
  std::unique_ptr<webrtc::VideoEncoderFactory> video_encoder_factory_ = nullptr;
  rtc::scoped_refptr<webrtc::AudioEncoderFactory> audio_encoder_factory_ = nullptr;
  std::unique_ptr<webrtc::VideoBitrateAllocatorFactory> bitrate_allocator_factory_ = nullptr;

  // rtc::scoped_refptr<webrtc::AudioDecoderFactory> audio_decoder_factory_;
  // std::unique_ptr<webrtc::VideoDecoderFactory> video_decoder_factory_;

  std::unique_ptr<cricket::MediaEngineInterface> recv_media_engine_;
  rtc::scoped_refptr<webrtc::AudioDeviceModule> recv_adm_;
  // rtc::scoped_refptr<webrtc::AudioMixer> recv_audio_mixer_;
  std::unique_ptr<rtc::Thread> recv_worker_thread_;
  
  std::atomic<bool> mix_start_;
  rtc::scoped_refptr<webrtc::AudioDeviceModule> send_adm_;
  std::unique_ptr<rtc::Thread> send_worker_thread_;
  std::shared_ptr<std::thread> video_mix_thread_;
  std::unique_ptr<webrtc::Call> send_call_ = nullptr;
  webrtc::VideoSendStream *video_send_stream_ = nullptr;
  webrtc::AudioSendStream *audio_send_stream_ = nullptr;
  // std::vector<webrtc::VideoStream> video_send_streams_;
  std::shared_ptr<erizo::OneToManyProcessor> otm_processor_;
  std::unique_ptr<CustomBitrateAllocationStrategy> bitrate_allocation_strategy_;
  bool initialized_ = false;
  bool exit_;
  std::mutex exit_mutex_;
  std::condition_variable exit_cv_;

  std::string audio_track_id_;
  std::string video_track_id_;

  std::map<std::string, std::shared_ptr<MixStream>> mix_streams_;
  friend class CustomBitrateAllocationStrategy;
};
}  // namespace erizo
#endif  // ERIZO_SRC_ERIZO_MEDIA_MIXERS_StreamMixer_H_
