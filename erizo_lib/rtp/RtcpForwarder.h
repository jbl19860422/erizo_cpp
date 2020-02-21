#ifndef ERIZO_SRC_ERIZO_RTP_RTCPFORWARDER_H_
#define ERIZO_SRC_ERIZO_RTP_RTCPFORWARDER_H_

#include <boost/shared_ptr.hpp>

#include <map>
#include <list>
#include <set>

#include "./logger.h"
#include "./MediaDefinitions.h"
#include "./SdpInfo.h"
#include "rtp/RtpHeaders.h"
#include "rtp/RtcpProcessor.h"

namespace erizo {

class RtcpForwarder: public RtcpProcessor{
  DECLARE_LOGGER();

 public:
  RtcpForwarder(MediaSink* msink, MediaSource* msource, uint32_t max_video_bw = 300000);
  virtual ~RtcpForwarder() {}
  void addSourceSsrc(uint32_t ssrc) override;
  void setPublisherBW(uint32_t bandwidth) override;
  void analyzeSr(RtcpHeader* chead) override;
  int analyzeFeedback(char* buf, int len) override;
  void checkRtcpFb() override;
};

}  // namespace erizo

#endif  // ERIZO_SRC_ERIZO_RTP_RTCPFORWARDER_H_
