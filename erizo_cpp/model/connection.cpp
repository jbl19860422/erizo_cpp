#include "connection.h"

#include <json/json.h>

#include <IceConnection.h>
#include <BridgeMediaStream.h>
#include <OneToManyProcessor.h>
#include <thread/ThreadPool.h>
#include <thread/IOThreadPool.h>
#include <MediaStream.h>

#include "rabbitmq/amqp_helper.h"
#include "common/utils.h"
#include "common/config.h"
#include "core/erizo.h"

DEFINE_LOGGER(Connection, "Connection");

Connection::Connection() : webrtc_connection_(nullptr),
                           otm_processor_(nullptr),
                           media_stream_(nullptr),
                           listener_(nullptr),
                           agent_id_(""),
                           erizo_id_(""),
                           room_id_(""),
                           client_id_(""),
                           stream_id_(""),
                           label_(""),
                           is_publisher_(false),
                           reply_to_(""),
                           init_(false) {}

Connection::~Connection() {}

void Connection::init(const std::string &agent_id,
                      const std::string &erizo_id,
                      const std::string &client_id,
                      const std::string &stream_id,
                      const std::string &label,
                      bool is_publisher,
                      const std::string &reply_to,
                      const std::string &isp,
                      std::shared_ptr<erizo::ThreadPool> thread_pool,
                      std::shared_ptr<erizo::IOThreadPool> io_thread_pool)
{
    if (init_)
        return;

    agent_id_ = agent_id;
    erizo_id_ = erizo_id;
    client_id_ = client_id;
    stream_id_ = stream_id;
    label_ = label;
    is_publisher_ = is_publisher;
    reply_to_ = reply_to;

    std::shared_ptr<erizo::Worker> worker = thread_pool->getLessUsedWorker();
    std::shared_ptr<erizo::IOWorker> io_worker = io_thread_pool->getLessUsedIOWorker();

    erizo::IceConfig ice_config;
    ice_config.stun_server = Config::getInstance()->stun_server;
    ice_config.stun_port = Config::getInstance()->stun_port;
    ice_config.min_port = Config::getInstance()->min_port;
    ice_config.max_port = Config::getInstance()->max_port;
    ice_config.should_trickle = Config::getInstance()->should_trickle;
    ice_config.turn_server = Config::getInstance()->turn_server;
    ice_config.turn_port = Config::getInstance()->turn_port;
    ice_config.turn_username = Config::getInstance()->turn_username;
    ice_config.turn_pass = Config::getInstance()->turn_passwd;
    ice_config.address_trans_map = Config::getInstance()->address_trans_map;
    ice_config.network_interface = "";
  
    auto it = Config::getInstance()->network_interfaces_.find(isp);
    if (it != Config::getInstance()->network_interfaces_.end())
        ice_config.network_interface = it->second;

    webrtc_connection_ = std::make_shared<erizo::WebRtcConnection>(worker, io_worker, Utils::getUUID(), ice_config, Config::getInstance()->rtp_maps, Config::getInstance()->ext_maps, this);

    std::shared_ptr<erizo::Worker> ms_worker = thread_pool->getLessUsedWorker();
    media_stream_ = std::make_shared<erizo::MediaStream>(ms_worker, webrtc_connection_, stream_id, label_, is_publisher_);

    if (is_publisher_)
    {
        otm_processor_ = std::make_shared<erizo::OneToManyProcessor>();
        media_stream_->setAudioSink(otm_processor_.get());
        media_stream_->setVideoSink(otm_processor_.get());
        media_stream_->setEventSink(otm_processor_.get());
        otm_processor_->setPublisher(media_stream_);
    }

    webrtc_connection_->addMediaStream(media_stream_);
    webrtc_connection_->init();
    init_ = true;
}

void Connection::close()
{
    if (!init_)
        return;

    webrtc_connection_->setWebRtcConnectionEventListener(nullptr);
    webrtc_connection_->close();
    webrtc_connection_.reset();
    webrtc_connection_ = nullptr;

    media_stream_->setFeedbackSink(nullptr);
    media_stream_->setAudioSink(nullptr);
    media_stream_->setVideoSink(nullptr);
    media_stream_->setEventSink(nullptr);
    if (is_publisher_)
    {
        otm_processor_->close();
        otm_processor_.reset();
        otm_processor_ = nullptr;
    }
    media_stream_->close();
    media_stream_.reset();
    media_stream_ = nullptr;

    listener_ = nullptr;

    agent_id_ = "";
    erizo_id_ = "";
    room_id_ = "";
    client_id_ = "";
    stream_id_ = "";
    label_ = "";
    is_publisher_ = false;
    reply_to_ = "";

    init_ = false;
}

void Connection::notifyEvent(erizo::WebRTCEvent newEvent, const std::string &message, const std::string &stream_id)
{
    Json::Value data = Json::nullValue;
    switch (newEvent)
    {
        case erizo::CONN_INITIAL:
        {
            data["type"] = "started";
            data["appId"] = appid_;
            data["agentId"] = agent_id_;
            data["erizoId"] = erizo_id_;
            data["streamId"] = stream_id_;
            data["clientId"] = client_id_;
            data["roomId"] = room_id_;
            break;
        }
        case erizo::CONN_SDP_PROCESSED:
        {
            Json::Value msg = Json::objectValue;
            if (is_publisher_)
            {
                uint32_t video_ssrc;
                uint32_t audio_ssrc;
                media_stream_->getRemoteSdpInfo()->getSSRC(video_ssrc, audio_ssrc);
                data["type"] = "publisher_answer";
                msg["videoSSRC"] = video_ssrc;
                msg["audioSSRC"] = audio_ssrc;
            }
            else
            {
                data["type"] = "subscriber_answer";
            }
            
            data["appId"] = appid_;
            data["agentId"] = agent_id_;
            data["erizoId"] = erizo_id_;
            data["streamId"] = stream_id_;
            data["clientId"] = client_id_;
            data["roomId"] = room_id_;
            msg["sdp"] = message;
            data["msg"] = msg;
            break;
        }
        case erizo::CONN_READY:
        {
            data["type"] = "ready";
            data["appId"] = appid_;
            data["agentId"] = agent_id_;
            data["erizoId"] = erizo_id_;
            data["streamId"] = stream_id_;
            data["clientId"] = client_id_;
            data["roomId"] = room_id_;
            data["isPublisher"] = is_publisher_;
            break;
        }
        case erizo::CONN_FAILED:
        {
            ELOG_ERROR("stream-->%s ice failed", stream_id_);
            break;
        }
        default:
        {
            break;
        }
    }

    if (data.type() != Json::nullValue && listener_ != nullptr)
    {
        Json::FastWriter writer;
        std::string msg = writer.write(data);
        if (listener_ != nullptr)
            listener_->onEvent(reply_to_, msg);
    }
}

int Connection::setRemoteSdp(const std::string &sdp)
{
    if (webrtc_connection_ == nullptr || !webrtc_connection_->setRemoteSdp(sdp, stream_id_))
        return 1;
    return 0;
}

int Connection::addRemoteCandidate(const std::string &mid, int sdp_mine_index, const std::string &sdp)
{
    if (webrtc_connection_ == nullptr || !webrtc_connection_->addRemoteCandidate(mid, sdp_mine_index, sdp))
        return 1;
    return 0;
}

void Connection::addSubscriber(const std::string &client_id, std::shared_ptr<erizo::MediaStream> media_stream)
{
    if (otm_processor_ != nullptr)
    {
        std::string subscriber_id = (client_id + "_") + stream_id_;
        otm_processor_->addSubscriber(media_stream, subscriber_id);
    }
    else
    {
        ELOG_ERROR("Connection::addSubscriber otm_processor_ is null");
    }
}

void Connection::addSubscriber(const std::string &bridge_stream_id, std::shared_ptr<erizo::BridgeMediaStream> bridge_media_stream)
{
    if (otm_processor_ != nullptr)
    {
        otm_processor_->addSubscriber(bridge_media_stream, bridge_stream_id);
    }
    else
    {
        ELOG_ERROR("Connection::addSubscriber BridgeMediaStream otm_processor_ is null");
    }
}

void Connection::removeSubscriber(const std::string &client_id)
{
    if (otm_processor_ != nullptr)
    {
        std::string subscriber_id = (client_id + "_") + stream_id_;
        otm_processor_->removeSubscriber(subscriber_id);
    }
}

std::shared_ptr<erizo::MediaStream> Connection::getMediaStream()
{
    return media_stream_;
}