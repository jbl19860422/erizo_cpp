/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree. An additional intellectual property rights grant can be found
 *  in the file PATENTS.  All contributing project authors may
 *  be found in the AUTHORS file in the root of the source tree.
 */

#ifndef ERIZO_VIDEORENDERER_H_
#define ERIZO_VIDEORENDERER_H_

#include "api/video/video_frame.h"
#include "api/video/video_sink_interface.h"

namespace erizo {

class ErizoVideoRenderer : public rtc::VideoSinkInterface<webrtc::VideoFrame> {
public:
    using ON_FRAME_CALLBACK = std::function<void(const std::string &, const webrtc::VideoFrame& frame)>;
    ErizoVideoRenderer(const std::string &stream_id);
    void OnFrame(const webrtc::VideoFrame& frame);
    void OnFrame(const ON_FRAME_CALLBACK &cb);
private:
    std::string stream_id_;
    std::shared_ptr<ON_FRAME_CALLBACK> frame_cb_ = nullptr;
};
}  // namespace webrtc

#endif  // TEST_FAKE_VIDEORENDERER_H_
