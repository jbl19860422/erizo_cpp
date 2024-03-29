/*
 *  Copyright 2011 The WebRTC Project Authors. All rights reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree. An additional intellectual property rights grant can be found
 *  in the file PATENTS.  All contributing project authors may
 *  be found in the AUTHORS file in the root of the source tree.
 */
#ifndef LICODE_WEBRTC_BASE_REFCOUNT_H_
#define LICODE_WEBRTC_BASE_REFCOUNT_H_

#include "webrtc/base/refcountedobject.h"
namespace licode {
namespace rtc {

// Reference count interface.
class RefCountInterface {
 public:
  virtual int AddRef() const = 0;
  virtual int Release() const = 0;

 protected:
  virtual ~RefCountInterface() {}
};

}  // namespace rtc
}//namespace licode

#endif  // WEBRTC_BASE_REFCOUNT_H_
