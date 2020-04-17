#ifndef BRIDGE_RTP_RETRANSMISSION_HANDLER_H
#define BRIDGE_RTP_RETRANSMISSION_HANDLER_H

#include <memory>
#include <vector>

#include "pipeline/Handler.h"
#include "rtp/PacketBufferService.h"
#include "./logger.h"

namespace erizo
{

class BridgeMediaStream;

class BridgeRtpRetransmissionHandler : public Handler
{
  DECLARE_LOGGER();
  
public:
  explicit BridgeRtpRetransmissionHandler();

  void enable() override;
  void disable() override;

  std::string getName() override
  {
    return "retransmissions";
  }

  void read(Context *ctx, std::shared_ptr<DataPacket> packet) override;
  void write(Context *ctx, std::shared_ptr<DataPacket> packet) override;
  void read(Context *ctx, std::shared_ptr<DataPacket> packet, const std::string &stream_id) override;
  void write(Context *ctx, std::shared_ptr<DataPacket> packet, const std::string &stream_id) override;
  void notifyUpdate() override;

private:
  bool m_init, m_enable;
  BridgeMediaStream *m_stream;
  std::shared_ptr<PacketBufferService> m_packet_buffer;
};
} // namespace erizo

#endif
