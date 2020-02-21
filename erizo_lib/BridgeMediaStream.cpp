#include "BridgeMediaStream.h"

#include "BridgeIO.h"
#include "rtp/BridgeRtpRetransmissionHandler.h"

namespace erizo
{

DEFINE_LOGGER(BridgeMediaStream, "BridgeMediaStream");

BridgeMediaStream::BridgeMediaStream()
{
    ip_ = "";
    port_ = 0;
    stream_id_ = "";
    io_worker_ = nullptr;
    packet_buf_ = nullptr;
    pipeline_ = nullptr;
    is_publisher_ = false;
    init_ = false;
}

void BridgeMediaStream::initializePipeline()
{
    packet_buf_ = std::make_shared<PacketBufferService>();
    pipeline_ = Pipeline::create();
    pipeline_->addService(shared_from_this());
    pipeline_->addService(packet_buf_);
    pipeline_->addFront(std::make_shared<BridgePacketReader>(this));
    pipeline_->addFront(std::make_shared<BridgeRtpRetransmissionHandler>());
    pipeline_->addFront(std::make_shared<BridgePacketWriter>(this));
    pipeline_->finalize();
    pipeline_->notifyUpdate();
}

int BridgeMediaStream::init(const std::string &ip,
                            uint16_t port,
                            const std::string &stream_id,
                            std::shared_ptr<erizo::IOWorker> io_worker,
                            bool is_publisher,
                            uint32_t video_ssrc,
                            uint32_t audio_ssrc)
{
    if (init_)
        return 0;

    ip_ = ip;
    port_ = port;
    stream_id_ = stream_id;
    io_worker_ = io_worker;
    io_worker_->start();
    is_publisher_ = is_publisher;

    setVideoSinkSSRC(video_ssrc);
    setAudioSinkSSRC(audio_ssrc);
    setVideoSourceSSRC(video_ssrc);
    setAudioSourceSSRC(audio_ssrc);

    source_fb_sink_ = this;
    sink_fb_source_ = this;

    initializePipeline();

    memset(send_buf_, 0, sizeof(send_buf_));
    memset(recv_buf_, 0, sizeof(recv_buf_));
    memcpy(send_buf_, stream_id_.c_str(), STREAM_ID_LEN);

    init_ = true;
    return 0;
}

void BridgeMediaStream::uninit()
{
    if (!init_)
        return;
    io_worker_.reset();
    io_worker_ = nullptr;

    pipeline_->close();
    pipeline_.reset();
    pipeline_ = nullptr;

    is_publisher_ = false;
    init_ = false;
}

BridgeMediaStream::~BridgeMediaStream()
{
}

std::shared_ptr<DataPacket> BridgeMediaStream::addBridgeHeader(std::shared_ptr<DataPacket> data_packet)
{
    char *data = data_packet->data;
    int length = data_packet->length;

    if (length + STREAM_ID_LEN > MTU_SIZE)
    {
        ELOG_WARN("buffer full");
        return nullptr;
    }

    memcpy(send_buf_ + STREAM_ID_LEN, data, length);
    return std::make_shared<DataPacket>(1, send_buf_, length + STREAM_ID_LEN, OTHER_PACKET);
}

std::shared_ptr<DataPacket> BridgeMediaStream::removeBridgeHeader(std::shared_ptr<DataPacket> data_packet)
{
    char *data = data_packet->data;
    int length = data_packet->length;

    if (length - STREAM_ID_LEN > MTU_SIZE)
    {
        ELOG_WARN("buffer full");
        return nullptr;
    }

    memcpy(recv_buf_, data + STREAM_ID_LEN, length - STREAM_ID_LEN);
    return std::make_shared<DataPacket>(1, recv_buf_, length - STREAM_ID_LEN, OTHER_PACKET);
}

int BridgeMediaStream::deliverAudioData_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id)
{
    if (!is_publisher_)
    {
        if (pipeline_ != nullptr)
            pipeline_->write(std::move(data_packet));
    }
    else if (audio_sink_ != nullptr)
    {
        audio_sink_->deliverAudioData(std::move(data_packet), stream_id);
    }
    return 0;
}

int BridgeMediaStream::deliverVideoData_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id)
{
    // ELOG_ERROR("BridgeMediaStream::deliverVideoData_");
    if (!is_publisher_)
    {
        if (pipeline_ != nullptr)
            pipeline_->write(std::move(data_packet));
    }
    else if (video_sink_ != nullptr)
    {
        video_sink_->deliverVideoData(std::move(data_packet), stream_id);
    }
    return 0;
}

int BridgeMediaStream::deliverFeedback_(std::shared_ptr<DataPacket> data_packet, const std::string &stream_id)
{
    if (!is_publisher_)
    {
        if (fb_sink_ != nullptr)
        {
            fb_sink_->deliverFeedback(std::move(data_packet), stream_id);
        }
    }
    else
    {
        if (pipeline_ != nullptr)
            pipeline_->write(std::move(data_packet));
    }
    return 0;
}

void BridgeMediaStream::onRead(std::shared_ptr<DataPacket> bridge_packet)
{
    std::shared_ptr<DataPacket> data_packet = removeBridgeHeader(bridge_packet);
    if (data_packet != nullptr)
    {
        char* buf = data_packet->data;
        RtpHeader *head = reinterpret_cast<RtpHeader*> (buf);
        RtcpHeader *chead = reinterpret_cast<RtcpHeader*> (buf);
        if(chead->isRtcp()) {
            uint32_t ssrc = chead->getSSRC();
        }
        
        if (pipeline_ != nullptr)
            pipeline_->read(std::move(data_packet));
    }
}

void BridgeMediaStream::read(std::shared_ptr<DataPacket> data_packet)
{
    uint32_t ssrc;
    RtcpHeader *chead = reinterpret_cast<RtcpHeader *>(data_packet->data);
    RtpHeader *head = reinterpret_cast<RtpHeader *>(data_packet->data);
    if (chead->isRtcp())
    {
        if (chead->isFeedback())
        {
            ssrc = chead->getSourceSSRC();
            if (isVideoSinkSSRC(ssrc))
            {
                data_packet->type = VIDEO_PACKET;
                deliverFeedback(std::move(data_packet), stream_id_);
            }
            else if (isAudioSinkSSRC(ssrc) || ssrc == 0)
            {
                data_packet->type = AUDIO_PACKET;
                deliverFeedback(std::move(data_packet), stream_id_);
            }
            else
            {
                ELOG_WARN("unknow rtcp feedback packet,ssrc:%u", ssrc);
                return;
            }
        }
        else
        {
            ssrc = chead->getSSRC(); //rtcp sr packet
            if (isAudioSourceSSRC(ssrc))
            {
                data_packet->type = AUDIO_PACKET;
                deliverAudioData(std::move(data_packet), stream_id_);
            }
            else if (isVideoSourceSSRC(ssrc))
            {
                data_packet->type = VIDEO_PACKET;
                deliverVideoData(std::move(data_packet), stream_id_);
            }
            else
            {
                ELOG_WARN("unknow rtcp sender packet,ssrc:%u", ssrc);
                return;
            }
        }
    }
    else
    {
        ssrc = head->getSSRC(); //rtp packet
        if (isAudioSourceSSRC(ssrc))
        {
            data_packet->type = AUDIO_PACKET;
            // ELOG_INFO("deliverAudioData");
            deliverAudioData(std::move(data_packet), stream_id_);
        }
        else if (isVideoSourceSSRC(ssrc))
        {
            data_packet->type = VIDEO_PACKET;
            // ELOG_INFO("deliverVideoData");
            deliverVideoData(std::move(data_packet), stream_id_);
        }
        else
        {
            ELOG_WARN("unknow rtp packet,ssrc:%u video_ssrc=%u, audio_ssrc=%u, is_publisher=%d", ssrc, getVideoSourceSSRC(), getAudioSourceSSRC(), is_publisher_);
            return;
        }
    }
}

void BridgeMediaStream::write(std::shared_ptr<DataPacket> data_packet)
{
    std::shared_ptr<DataPacket> bridge_packet = addBridgeHeader(std::move(data_packet));
    if (bridge_packet != nullptr) {
        BridgeIO::getInstance()->onSend(ip_, port_, stream_id_, bridge_packet);
    }
}

} // namespace erizo