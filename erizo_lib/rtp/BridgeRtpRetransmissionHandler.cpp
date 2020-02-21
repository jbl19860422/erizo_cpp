#include "BridgeMediaStream.h"
#include "rtp/BridgeRtpRetransmissionHandler.h"
#include "rtp/RtpUtils.h"
#include <algorithm>

static constexpr int kNackBlpSize = 16;

namespace erizo
{
DEFINE_LOGGER(BridgeRtpRetransmissionHandler, "rtp.BridgeRtpRetransmissionHandler");

BridgeRtpRetransmissionHandler::BridgeRtpRetransmissionHandler() : m_init(false), m_enable(true),
                                                                   m_stream(nullptr)
{
    ELOG_DEBUG("message: BridgeRtpRetransmissionHandler construct");
}

void BridgeRtpRetransmissionHandler::enable()
{
    m_enable = true;
}

void BridgeRtpRetransmissionHandler::disable()
{
    m_enable = false;
}

void BridgeRtpRetransmissionHandler::notifyUpdate()
{
    auto pipeline = getContext()->getPipelineShared();
    if (pipeline && !m_stream)
    {
        m_stream = pipeline->getService<BridgeMediaStream>().get();
        m_packet_buffer = pipeline->getService<PacketBufferService>();
        if (m_stream && m_packet_buffer)
        {
            m_init = true;
        }
        else
        {
            ELOG_ERROR("message: rtp retransmission service error");
        }
    }
}

void BridgeRtpRetransmissionHandler::read(Context *ctx, std::shared_ptr<DataPacket> packet)
{
    if (!m_enable || !m_init)
    {
        return;
    }

    bool contains_nack = false;
    bool is_fully_recovered = true;

    RtpUtils::forEachRtcpBlock(packet, [this, &contains_nack, &is_fully_recovered](RtcpHeader *chead) {
        if (chead->packettype == RTCP_RTP_Feedback_PT)
        {
            contains_nack = true;

            RtpUtils::forEachNack(chead, [this, chead, &is_fully_recovered](uint16_t new_seq_num,
                                                                            uint16_t new_plb, RtcpHeader *nack_head) {
                uint16_t initial_seq_num = new_seq_num;
                uint16_t plb = new_plb;

                for (int i = -1; i <= kNackBlpSize; i++)
                {
                    uint16_t seq_num = initial_seq_num + i + 1;
                    bool packet_nacked = i == -1 || (plb >> i) & 0x0001;

                    if (packet_nacked)
                    {
                        std::shared_ptr<DataPacket> recovered;

                        if (m_stream->getVideoSinkSSRC() == chead->getSourceSSRC())
                        {
                            recovered = m_packet_buffer->getVideoPacket(seq_num);
                        }
                        else if (m_stream->getAudioSinkSSRC() == chead->getSourceSSRC())
                        {
                            recovered = m_packet_buffer->getAudioPacket(seq_num);
                        }

                        if (recovered.get())
                        {
                            RtpHeader *recovered_head = reinterpret_cast<RtpHeader *>(recovered->data);
                            if (recovered_head->getSeqNumber() == seq_num)
                            {
                                ELOG_DEBUG("message: retransmission:%d", seq_num);
                                getContext()->fireWrite(recovered);
                                continue;
                            }
                        }
                        ELOG_DEBUG("message: packet missed in buffer %d", seq_num);
                        is_fully_recovered = false;
                    }
                }
            });
        }
    });
    if (!contains_nack || !is_fully_recovered)
    {
        ctx->fireRead(std::move(packet));
    }
}

void BridgeRtpRetransmissionHandler::write(Context *ctx, std::shared_ptr<DataPacket> packet)
{
    if (!m_init)
    {
        return;
    }
    RtcpHeader *chead = reinterpret_cast<RtcpHeader *>(packet->data);
    if (!chead->isRtcp())
    {
        m_packet_buffer->insertPacket(packet);
    }
    ctx->fireWrite(std::move(packet));
}


void BridgeRtpRetransmissionHandler::read(Context *ctx, std::shared_ptr<DataPacket> packet, const std::string &stream_id)
{
    if (!m_enable || !m_init)
    {
        return;
    }

    bool contains_nack = false;
    bool is_fully_recovered = true;

    RtpUtils::forEachRtcpBlock(packet, [this, &contains_nack, &is_fully_recovered](RtcpHeader *chead) {
        if (chead->packettype == RTCP_RTP_Feedback_PT)
        {
            contains_nack = true;

            RtpUtils::forEachNack(chead, [this, chead, &is_fully_recovered](uint16_t new_seq_num,
                                                                            uint16_t new_plb, RtcpHeader *nack_head) {
                uint16_t initial_seq_num = new_seq_num;
                uint16_t plb = new_plb;

                for (int i = -1; i <= kNackBlpSize; i++)
                {
                    uint16_t seq_num = initial_seq_num + i + 1;
                    bool packet_nacked = i == -1 || (plb >> i) & 0x0001;

                    if (packet_nacked)
                    {
                        std::shared_ptr<DataPacket> recovered;

                        if (m_stream->getVideoSinkSSRC() == chead->getSourceSSRC())
                        {
                            recovered = m_packet_buffer->getVideoPacket(seq_num);
                        }
                        else if (m_stream->getAudioSinkSSRC() == chead->getSourceSSRC())
                        {
                            recovered = m_packet_buffer->getAudioPacket(seq_num);
                        }

                        if (recovered.get())
                        {
                            RtpHeader *recovered_head = reinterpret_cast<RtpHeader *>(recovered->data);
                            if (recovered_head->getSeqNumber() == seq_num)
                            {
                                ELOG_DEBUG("message: retransmission:%d", seq_num);
                                getContext()->fireWrite(recovered);
                                continue;
                            }
                        }
                        ELOG_DEBUG("message: packet missed in buffer %d", seq_num);
                        is_fully_recovered = false;
                    }
                }
            });
        }
    });
    if (!contains_nack || !is_fully_recovered)
    {
        ctx->fireRead(std::move(packet));
    }
}

void BridgeRtpRetransmissionHandler::write(Context *ctx, std::shared_ptr<DataPacket> packet, const std::string &stream_id)
{
    if (!m_init)
    {
        return;
    }
    RtcpHeader *chead = reinterpret_cast<RtcpHeader *>(packet->data);
    if (!chead->isRtcp())
    {
        m_packet_buffer->insertPacket(packet);
    }
    ctx->fireWrite(std::move(packet));
}

} // namespace erizo
