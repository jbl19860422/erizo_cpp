#include "video_render.h"
using namespace erizo;
ErizoVideoRenderer::ErizoVideoRenderer(const std::string &stream_id):stream_id_(stream_id) {

}

void ErizoVideoRenderer::OnFrame(const webrtc::VideoFrame& frame) {
    if(frame_cb_) {
        (*frame_cb_)(stream_id_, frame);
    }
}

void ErizoVideoRenderer::OnFrame(const ON_FRAME_CALLBACK &cb) {
    frame_cb_ = std::make_shared<ON_FRAME_CALLBACK>(cb);
}
