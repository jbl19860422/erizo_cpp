#ifndef ERIZO_SRC_ERIZO_MEDIA_EXTERNALOUTPUT_H_
#define ERIZO_SRC_ERIZO_MEDIA_EXTERNALOUTPUT_H_

#include <boost/thread.hpp>

extern "C" {
#include <libavcodec/avcodec.h>
#include <libavutil/channel_layout.h>
#include <libavformat/avformat.h>
#include <libavutil/avutil.h>
#include <libavutil/opt.h>
#include <libavresample/avresample.h> 
#include <libavcodec/avcodec.h>
}

#include <fstream>
#include <string>

#include "./MediaDefinitions.h"
#include "MediaStream.h"
#include "thread/Worker.h"
#include "rtp/RtpPacketQueue.h"
#include "rtp/RtpExtensionProcessor.h"
#include "webrtc/modules/rtp_rtcp/source/ulpfec_receiver_impl.h"
#include "media/MediaProcessor.h"
#include "media/Depacketizer.h"
#include "./Stats.h"
#include "lib/Clock.h"
#include "SdpInfo.h"
#include "rtp/QualityManager.h"
#include "pipeline/Handler.h"
#include "pipeline/HandlerManager.h"
#include "opus/opus.h"
#include "mp4v2/mp4v2.h"
#include "media/recorder/file_recorder.h"

#include "./logger.h"

#define MAX_AUDIO_BUF_SIZE 48000*2

namespace erizo {

static constexpr uint64_t kExternalOutputMaxBitrate = 1000000000;

class ExternalOutput : public MediaSink, public RawDataReceiver, public FeedbackSource,
                       public licode::webrtc::RtpData, public HandlerManagerListener,
                       public std::enable_shared_from_this<ExternalOutput> {
  DECLARE_LOGGER();

 public:
  explicit ExternalOutput(std::shared_ptr<Worker> worker, 
                          const std::string &stream_id, 
                          const std::vector<std::string> &output_files,
                          const std::vector<RtpMap> rtp_mappings,
                          const std::vector<erizo::ExtMap> ext_mappings,
                          const std::function<void(const std::string &stream_id, const std::string &file, int64_t timestamp_ms)> &create_file_cb,
                          const std::function<void(const std::string &stream_id, const std::string &file, int64_t dur_video, int64_t dur_audio)> &done_cb);
  virtual ~ExternalOutput();
  bool init(int64_t appid, const std::string & room_id, const std::string & stream_id, const std::string & client_id,
            const std::string & reply_to);
  void receiveRawData(const RawDataPacket& packet) override;

  // webrtc::RtpData callbacks.  This is for Forward Error Correction (per rfc5109) handling.
  bool OnRecoveredPacket(const uint8_t* packet, size_t packet_length) override;
  int32_t OnReceivedPayloadData(const uint8_t* payload_data,
                                        size_t payload_size,
                                        const licode::webrtc::WebRtcRTPHeader* rtp_header) override;

  void close() override;

  void write(std::shared_ptr<DataPacket> packet);

  void notifyUpdateToHandlers() override;

  bool isRecording() { return recording_; }

  /**
    * Sets the Event Listener for this StreamMixer
    */
  void setMediaStreamEventListener(MediaStreamEventListener* listener);

  int64_t appid_;
  std::string room_id_;
  std::string stream_id_;
  std::string client_id_;
  std::string reply_to_;

 private:

  bool closed_ = false;
  std::shared_ptr<Worker> worker_;
  Pipeline::Ptr pipeline_;
  std::unique_ptr<licode::webrtc::UlpfecReceiver> fec_receiver_;
  RtpPacketQueue audio_queue_, video_queue_;
  std::atomic<bool> recording_, inited_;
  std::mutex mtx_;  // a mutex we use to signal our writer thread that data is waiting.
  boost::thread thread_;
  std::condition_variable cond_;
  uint32_t video_source_ssrc_;
  std::unique_ptr<Depacketizer> depacketizer_ = nullptr;

  // Timestamping strategy: we use the RTP timestamps so we don't have to restamp and we're not
  // subject to error due to the RTP packet queue depth and playout.
  //
  // However, the units of our audio and video RTP timestamps are not comparable because:
  //
  // 1. RTP timestamps start at a random value
  // 2. The units are completely different.  Video is typically on a 90khz clock, whereas audio
  //    typically follows whatever the sample rate is (e.g. 8khz for PCMU, 48khz for Opus, etc.)
  //
  // So, our strategy is to keep track of the first audio and video timestamps we encounter so we
  // can adjust subsequent timestamps by that much so our timestamps roughly start at zero.
  //
  // Audio and video can also start at different times, and it's possible video wouldn't even arrive
  // at all (or arrive late) so we also need to keep track of a start time offset.  We also need to track
  // this *before* stuff enters the RTP packet queue, since that guy will mess with the timing of stuff that's
  // outputted in an attempt to re-order incoming packets.  So when we receive an audio or video packet,
  // we set first_data_received_.  We then use that to compute audio/videoStartTimeOffset_ appropriately,
  // and that value is added to every timestamp we write.
  long long first_video_timestamp_;  // NOLINT
  long long first_audio_timestamp_;  // NOLINT
  clock::time_point first_data_received_;  // NOLINT
  long long video_offset_ms_;  // NOLINT
  long long audio_offset_ms_;  // NOLINT

  // The last sequence numbers we received for audio and video.  Allows us to react to packet loss.
  uint16_t last_video_sequence_number_;
  uint16_t last_audio_sequence_number_;

  // our VP8 frame search state.  We're always looking for either the beginning or the end of a frame.
  // Note: VP8 purportedly has two packetization schemes; per-frame and per-partition.  A frame is
  // composed of one or more partitions.  However, we don't seem to be sent anything but partition 0
  // so the second scheme seems not applicable.  Too bad.
  bool need_to_send_fir_;
  std::vector<RtpMap> rtp_mappings_;
  enum AVCodecID audio_codec_;
  std::map<uint, RtpMap> video_maps_;
  std::map<uint, RtpMap> audio_maps_;
  RtpMap video_map_;
  RtpMap audio_map_;
  bool pipeline_initialized_;
  std::shared_ptr<Stats> stats_;
  std::shared_ptr<QualityManager> quality_manager_;
  std::shared_ptr<HandlerManager> handler_manager_;
  RtpExtensionProcessor ext_processor_;

  //音频编解码
  OpusDecoder *opus_decoder_ = nullptr;
  AVCodec *aac_codec_ = nullptr;
  AVCodecContext *codec_context_ = nullptr;
  bool init_audio_codec_ = false;

  bool got_sps_pps_ = false;
  long long last_timestamp_ = 0;

  opus_int16 *pcm_buf_ = nullptr;
  size_t pcm_buf_count_ = 0;
  opus_int16 *decode_pcm_ = nullptr;
  uint8_t *encoded_aac_data_ = nullptr;
  size_t aac_data_len_;

  uint32_t last_packet_time_ = 0;
  MediaStreamEventListener *media_stream_event_listener_ = nullptr;

  int sendFirPacket();
  void asyncTask(std::function<void(std::shared_ptr<ExternalOutput>)> f);
  void queueData(char* buffer, int length, packetType type);
  void queueDataAsync(std::shared_ptr<DataPacket> copied_packet);
  void sendLoop();
  int deliverAudioData_(std::shared_ptr<DataPacket> audio_packet, const std::string &stream_id = "") override;
  int deliverVideoData_(std::shared_ptr<DataPacket> video_packet, const std::string &stream_id = "") override;
  int deliverEvent_(MediaEventPtr event) override;
  void writeAudioData(char* buf, int len);
  void writeVideoData(char* buf, int len);
  void updateVideoCodec(RtpMap map);
  void updateAudioCodec(RtpMap map);
  void maybeWriteVideoPacket(char* buf, int len);
  void initializePipeline();
  void syncClose();

  bool findSps(uint8_t* buf, int len, uint8_t* sps, int &sps_len);
  bool findPps(uint8_t* buf, int len, uint8_t* pps, int &pps_len);
  void write_audio_metadata(uint8_t *buf, int samplerate, int channels);
  int initAudioCodec(int sample_rate, int channel_num);
  bool reEncodeAudioData(uint8_t *buf, size_t len, int sample_rate, int channels, uint8_t *out_buf, size_t &out_len);
  std::vector<FileRecorder*> recorders_;
};

class ExternalOuputWriter : public OutboundHandler {
 public:
  explicit ExternalOuputWriter(std::shared_ptr<ExternalOutput> output) : output_{output} {}

  void enable() override {}
  void disable() override {}

  std::string getName() override {
    return "writer";
  }

  void write(Context *ctx, std::shared_ptr<DataPacket> packet) override {
    if (auto output = output_.lock()) {
      output->write(std::move(packet));
    }
  }

  void notifyUpdate() override {
  }

 private:
  std::weak_ptr<ExternalOutput> output_;
};

}  // namespace erizo
#endif  // ERIZO_SRC_ERIZO_MEDIA_EXTERNALOUTPUT_H_
