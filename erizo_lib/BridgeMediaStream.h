#ifndef VIRTUAL_MEDIA_STREAM_H
#define VIRTUAL_MEDIA_STREAM_H

#include <string>

#include "MediaDefinitions.h"
#include "thread/IOWorker.h"
#include "rtp/PacketBufferService.h"
#include "pipeline/Pipeline.h"
#include "pipeline/Handler.h"
#include "pipeline/HandlerManager.h"
#include "pipeline/Service.h"
#include "logger.h"
#include "BridgeIO.h"

namespace erizo
{

class BridgeMediaStream : public MediaSink, public MediaSource, public FeedbackSource, public FeedbackSink, public Service, public std::enable_shared_from_this<BridgeMediaStream>
{
  DECLARE_LOGGER();

public:
  BridgeMediaStream();
  ~BridgeMediaStream();

  int init(const std::string &ip,
           uint16_t port,
           const std::string &stream_id,
           std::shared_ptr<erizo::IOWorker> io_worker,
           bool is_publisher,
           uint32_t video_ssrc,
           uint32_t audio_ssrc);
  void uninit();
  void write(std::shared_ptr<DataPacket> data_packet);
  void read(std::shared_ptr<DataPacket> data_packet);
  void onRead(std::shared_ptr<DataPacket> bridge_packet);
private:
  virtual int deliverAudioData_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id = "") override;
  virtual int deliverVideoData_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id = "") override;
  virtual int deliverFeedback_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id = "") override;
  virtual int deliverEvent_(MediaEventPtr event) override { return 0; }
  virtual int sendPLI() override { return 0; }
  virtual void close() override { return; }

  std::shared_ptr<DataPacket> addBridgeHeader(std::shared_ptr<DataPacket> data_packet);
  std::shared_ptr<DataPacket> removeBridgeHeader(std::shared_ptr<DataPacket> data_packet);
  void initializePipeline();

private:
  std::string ip_;
  uint16_t port_;
  std::string stream_id_;

  char send_buf_[MTU_SIZE];
  char recv_buf_[MTU_SIZE];

  std::shared_ptr<erizo::IOWorker> io_worker_;
  std::shared_ptr<PacketBufferService> packet_buf_;
  Pipeline::Ptr pipeline_;

  bool is_publisher_;
  bool init_;
};

class BridgePacketReader : public InboundHandler
{
public:
  explicit BridgePacketReader(BridgeMediaStream *ms) : ms_{ms} {}

  void enable() override {}
  void disable() override {}

  std::string getName() override
  {
    return "reader";
  }

  void read(Context *ctx, std::shared_ptr<DataPacket> packet) override
  {
    ms_->read(std::move(packet));
  }

  void notifyUpdate() override
  {
  }

private:
  BridgeMediaStream *ms_;
};

class BridgePacketWriter : public OutboundHandler
{
public:
  explicit BridgePacketWriter(BridgeMediaStream *ms) : ms_{ms} {}

  void enable() override {}
  void disable() override {}

  std::string getName() override
  {
    return "writer";
  }

  void write(Context *ctx, std::shared_ptr<DataPacket> packet) override
  {
    ms_->write(std::move(packet));
  }

  void notifyUpdate() override
  {
  }

private:
  BridgeMediaStream *ms_;
};

} // namespace erizo
#endif