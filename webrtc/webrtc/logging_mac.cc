#include "webrtc/base/logging.h"

#if defined(WEBRTC_MAC)
namespace licode {
namespace rtc {
  std::string DescriptionFromOSStatus(OSStatus err) {
    return "";
  }
}
}
#endif
