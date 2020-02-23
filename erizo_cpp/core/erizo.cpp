#include <map>

#include "erizo.h"

#include "common/utils.h"
#include "common/config.h"

#include "model/client.h"
#include "model/connection.h"
#include "model/bridge_conn.h"
#include "model/mixer.h"

#include "rabbitmq/amqp_helper.h"

#include "media/ExternalOutput.h"
#include "MediaDefinitions.h"
#include "BridgeMediaStream.h"
#include "media/mixers/StreamMixer.h"
#include "http/http_simple_client.h"

#include <thread/IOThreadPool.h>
#include <thread/ThreadPool.h>

DEFINE_LOGGER(Erizo, "Erizo");

Erizo::Erizo() : amqp_uniquecast_(nullptr),
                 thread_pool_(nullptr),
                 io_thread_pool_(nullptr),
                 agent_id_(""),
                 erizo_id_(""),
                 init_(false)
{
    exit_ = false;
}

Erizo::~Erizo() {}

Erizo *Erizo::instance_ = nullptr;
Erizo *Erizo::getInstance()
{
    if (!instance_)
        instance_ = new Erizo();
    return instance_;
}

void Erizo::waitExit()
{
    std::mutex mtx;
    std::unique_lock<std::mutex> lck(mtx);
    while(!exit_) 
    {
        ELOG_ERROR("**********************************wait for %d****************************", clients_.size());
        if(exit_cv_.wait_for(lck, std::chrono::seconds(5)) == std::cv_status::timeout) 
        {
            continue;
        }
    }
}

void Erizo::quit()
{
    exit_ = true;
    exit_cv_.notify_all();
}

void Erizo::onEvent(const std::string &reply_to, const std::string &msg)
{
    if (!init_)
        return;
    amqp_uniquecast_->sendMessage(reply_to, reply_to, msg);
}

int Erizo::init(const std::string &agent_id, const std::string &erizo_id, const std::string &ip, uint16_t port)
{
    if (init_)
        return 0;

    agent_id_ = agent_id;
    erizo_id_ = erizo_id;

    io_thread_pool_ = std::make_shared<erizo::IOThreadPool>(Config::getInstance()->io_worker_thread_num);
    io_thread_pool_->start();

    thread_pool_ = std::make_shared<erizo::ThreadPool>(Config::getInstance()->worker_thread_num);
    thread_pool_->start();

    amqp_uniquecast_ = std::make_shared<AMQPHelper>();
    if (amqp_uniquecast_->init(erizo_id_, [this](const std::string &msg) {
            Json::Value root;
            Json::Reader reader(Json::Features::strictMode());
            if (!reader.parse(msg, root))
            {
                ELOG_ERROR("json parse root failed,dump %s", msg);
                return;
            }

            if (!root.isMember("method") || !root["method"].isString())
            {
                ELOG_ERROR("json miss method attr, dump %s", msg);
                return;
            }

            if (!root.isMember("data") || !root["data"].isString())
            {
                ELOG_ERROR("json miss method data, dump %s", msg);
                return;
            }

            std::string method = root["method"].asString();
            Json::Value data;
            if (!reader.parse(root["data"].asString(), data))
            {
                ELOG_ERROR("json data format error, dump %s", msg);
                return;
            }

            if ("addPublisher" == method)
            {
                addPublisher(data);
            }
            else if ("addSubscriber" == method)
            {
                addSubscriber(data);
            }
            else if (!method.compare("signallingMsg"))
            {
                processSignaling(data);
            }
            else if ("addVirtualPublisher" == method)
            {
                addVirtualPublisher(data);
            }
            else if (!method.compare("addVirtualSubscriber"))
            {
                addVirtualSubscriber(data);
            }
            else if (!method.compare("removeSubscriber"))
            {
                removeSubscriber(data);
            }
            else if (!method.compare("removePublisher"))
            {
                removePublisher(data);
            }
            else if (!method.compare("removeVirtualPublisher"))
            {
                removeVirtualPublisher(data);
            }
            else if (!method.compare("removeVirtualSubscriber"))
            {
                removeVirtualSubscriber(data);
            }
            else if (!method.compare("addRecorder"))
            {
                addRecorder(data);
            }
            else if (!method.compare("removeRecorder"))
            {
                removeRecorder(data);
            }
            else if (!method.compare("addMixer"))
            {
                addMixer(data);
            }
            else if (!method.compare("addMixerLayer"))
            {
                addMixerLayer(data);
            }
            else if (!method.compare("removeMixer"))
            {
                removeMixer(data);
            }
        }))
    {
        ELOG_ERROR("amqp initialize failed");
        return 1;
    }
    init_ = true;
    return 0;
}

void Erizo::addSubscriber(const Json::Value &root)
{
    CHECK_RETURN_ON_FAIL(root, "appid", Int64);
    CHECK_RETURN_ON_FAIL(root, "room_id", String);
    CHECK_RETURN_ON_FAIL(root, "id", String);
    CHECK_RETURN_ON_FAIL(root, "client_id", String);
    CHECK_RETURN_ON_FAIL(root, "is_bridge", Bool);
    CHECK_RETURN_ON_FAIL(root, "bridge_id", String);
    CHECK_RETURN_ON_FAIL(root, "subscribe_to", String);
    CHECK_RETURN_ON_FAIL(root, "label", String);
    CHECK_RETURN_ON_FAIL(root, "reply_to", String);
    int64_t appid = root["appid"].asInt64();
    std::string room_id = root["room_id"].asString();
    std::string id = root["id"].asString();
    std::string client_id = root["client_id"].asString();
    std::string subscribe_to = root["subscribe_to"].asString();
    std::string stream_label = root["label"].asString();
    std::string reply_to = root["reply_to"].asString();
    bool is_bridge = root["is_bridge"].asBool();
    std::string bridge_id = root["bridge_id"].asString();
    std::string isp;
    std::shared_ptr<Client> client = getOrCreateClient(client_id);
    std::shared_ptr<Connection> pub_conn = getPublishConn(subscribe_to);
    if (pub_conn != nullptr)
    {
        std::shared_ptr<Connection> sub_conn = std::make_shared<Connection>();
        sub_conn->setConnectionListener(this);
        sub_conn->setAppId(appid);
        sub_conn->setRoomId(room_id);
        sub_conn->init(agent_id_, erizo_id_, client_id, subscribe_to, stream_label, false, reply_to, isp, thread_pool_, io_thread_pool_);

        pub_conn->addSubscriber(client_id, sub_conn->getMediaStream());
        client->subscribers[subscribe_to] = sub_conn;
    }
    else
    {
        std::shared_ptr<erizo::StreamMixer> stream_mixer = getStreamMixer(subscribe_to);
        if (!stream_mixer)
        { //非混合流
            std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_id);
            if (bridge_conn != nullptr)
            {
                std::shared_ptr<Connection> sub_conn = std::make_shared<Connection>();
                sub_conn->setConnectionListener(this);
                sub_conn->setAppId(appid);
                sub_conn->setRoomId(room_id);
                sub_conn->init(agent_id_, erizo_id_, client_id, subscribe_to, stream_label, false, reply_to, isp, thread_pool_, io_thread_pool_);
                bridge_conn->addSubscriber(client_id, sub_conn->getMediaStream());
                client->subscribers[subscribe_to] = sub_conn;
            }
            return;
        }
        //混合流
        std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(subscribe_to);
        if (bridge_conn != nullptr)
        {
            std::shared_ptr<Connection> sub_conn = std::make_shared<Connection>();
            sub_conn->setConnectionListener(this);
            sub_conn->setAppId(appid);
            sub_conn->setRoomId(room_id);
            sub_conn->init(agent_id_, erizo_id_, client_id, subscribe_to, stream_label, false, reply_to, isp, thread_pool_, io_thread_pool_);

            bridge_conn->addSubscriber(client_id, sub_conn->getMediaStream());
            client->subscribers[subscribe_to] = sub_conn;
        }
    }
}

void Erizo::removeSubscriber(const Json::Value &root)
{
    CHECK_RETURN_ON_FAIL(root, "appid", Int64);
    CHECK_RETURN_ON_FAIL(root, "room_id", String);
    CHECK_RETURN_ON_FAIL(root, "client_id", String);
    CHECK_RETURN_ON_FAIL(root, "id", String);
    CHECK_RETURN_ON_FAIL(root, "subscribe_to", String);
    CHECK_RETURN_ON_FAIL(root, "is_bridge", Bool);
    CHECK_RETURN_ON_FAIL(root, "bridge_id", String);
    // CHECK_RETURN_ON_FAIL(root, "reply_to", String);
    int64_t appid = root["appid"].asInt64();
    std::string room_id = root["room_id"].asString();
    std::string client_id = root["client_id"].asString();
    std::string id = root["id"].asString();
    std::string subscribe_to = root["subscribe_to"].asString();
    std::string label = root["label"].asString();
    bool is_bridge = root["is_bridge"].asBool();
    std::string bridge_id = root["bridge_id"].asString();
    // std::string reply_to = root["reply_to"].asString();
    std::shared_ptr<Connection> pub_conn = getPublishConn(subscribe_to);
    if (pub_conn != nullptr)
        pub_conn->removeSubscriber(client_id);

    std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_id);
    if (bridge_conn != nullptr)
        bridge_conn->removeSubscriber(client_id);

    std::shared_ptr<Client> client = getOrCreateClient(client_id);
    std::shared_ptr<Connection> sub_conn = getSubscribeConn(client, subscribe_to);
    if (sub_conn != nullptr)
    {
        client->subscribers.erase(subscribe_to);
        if (client->canRemove())
        {
            removeClient(client->id);
        }
        sub_conn->close();
    }

    if(canExit())
    {
        quit();
    }
}

void Erizo::addMixer(const Json::Value &root)
{
    //这里漏了检测了
    Mixer mixer;
    int ret = Mixer::fromJSON(root, mixer);
    if(0 != ret) {
        return;
    }

    std::shared_ptr<erizo::StreamMixer> stream_mixer = std::make_shared<erizo::StreamMixer>();
    for (auto &layer : mixer.layers)
    {
        std::string bridge_stream_id = layer.bridge_stream.id;
        std::string src_stream_id = layer.bridge_stream.src_stream_id;
        std::string ip = layer.bridge_stream.sender_ip;
        uint16_t port = layer.bridge_stream.sender_port;
        std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_stream_id);
        if (bridge_conn == nullptr)
        {
            bridge_conn = std::make_shared<BridgeConn>();
            bridge_conn->init(bridge_stream_id, src_stream_id, ip, port, io_thread_pool_, false, layer.video_ssrc, layer.audio_ssrc);
            bridge_conns_[bridge_stream_id] = bridge_conn;
        }
        bridge_conn->addSubscriber("mixer_" + src_stream_id, stream_mixer);
        layer.bridge_feedback_sink = bridge_conn->getBridgeMediaStream();
    }

    std::string client_id = "cli_mixer_" + mixer.id;
    std::shared_ptr<Client> client = getOrCreateClient(client_id);
    stream_mixer->init(mixer);
    client->mixers[mixer.id] = stream_mixer;

    Json::Value event;
    event["type"] = "ready";
    event["appId"] = mixer.appid;
    event["agentId"] = mixer.agent_id;
    event["erizoId"] = mixer.erizo_id;
    event["streamId"] = mixer.stream_id;
    event["clientId"] = mixer.client_id;
    event["roomId"] = mixer.room_id;
    event["isPublisher"] = true;
    Json::FastWriter writer;
    std::string msg = writer.write(event);
    onEvent(mixer.reply_to, msg);
}

void Erizo::addMixerLayer(const Json::Value &root)
{
    if (!root.isMember("args") ||
        root["args"].type() != Json::arrayValue)
    {
        ELOG_ERROR("json parse args failed,dump %s", Utils::dumpJson(root));
        return;
    }
    if (root["args"].size() < 3)
    {
        ELOG_ERROR("json parse args num failed,dump %s", Utils::dumpJson(root));
        return;
    }

    Json::Value args = root["args"];
    if (args[0].type() != Json::stringValue ||
        args[1].type() != Json::objectValue ||
        args[2].type() != Json::stringValue)
    {
        ELOG_ERROR("json parse args type failed,dump %s", Utils::dumpJson(root));
        return;
    }

    std::string reply_to = args[2].asString();
    std::string mixer_id = args[0].asString();
    Layer layer;
    if (0 != Layer::fromJSON(args[1], layer))
    {
        ELOG_ERROR("json parse layer failed,dump %s", Utils::dumpJson(root));
        return;
    }

    std::string client_id = "cli_mixer_" + mixer_id;
    std::shared_ptr<Client> client = getOrCreateClient(client_id);
    if (client == nullptr)
    {
        ELOG_ERROR("getOrCreateClient failed,dump %s", Utils::dumpJson(root));
        return;
    }

    if (client->mixers.find(mixer_id) == client->mixers.end())
    {
        ELOG_ERROR("could not find mixers,dump %s", Utils::dumpJson(root));
        return;
    }

    std::shared_ptr<erizo::StreamMixer> stream_mixer = client->mixers[mixer_id];
    std::string bridge_stream_id = layer.bridge_stream.id;
    std::string src_stream_id = layer.bridge_stream.src_stream_id;
    std::string ip = layer.bridge_stream.sender_ip;
    uint16_t port = layer.bridge_stream.sender_port;

    std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_stream_id);
    if (bridge_conn == nullptr)
    {
        bridge_conn = std::make_shared<BridgeConn>();
        bridge_conn->init(bridge_stream_id, src_stream_id, ip, port, io_thread_pool_, false, layer.video_ssrc, layer.audio_ssrc);
        bridge_conns_[bridge_stream_id] = bridge_conn;
    }
    bridge_conn->addSubscriber("mixer_" + src_stream_id, stream_mixer);
    stream_mixer->addMixerLayer(layer);
}

void Erizo::removeMixerLayer(const Json::Value &root)
{
    if (!root.isMember("args") ||
        root["args"].type() != Json::arrayValue)
    {
        ELOG_ERROR("json parse args failed,dump %s", Utils::dumpJson(root));
        return;
    }
    if (root["args"].size() < 3)
    {
        ELOG_ERROR("json parse args num failed,dump %s", Utils::dumpJson(root));
        return;
    }

    Json::Value args = root["args"];
    if (args[0].type() != Json::stringValue ||
        args[1].type() != Json::objectValue ||
        args[2].type() != Json::stringValue)
    {
        ELOG_ERROR("json parse args type failed,dump %s", Utils::dumpJson(root));
        return;
    }

    std::string reply_to = args[2].asString();
    std::string mixer_id = args[0].asString();
    
    Layer layer;
    Json::Value j_layer = args[1];
    if (!j_layer.isMember("stream_id") || !j_layer["stream_id"].isString() ||
        !j_layer.isMember("index") || !j_layer["index"].isInt())
    {
        ELOG_ERROR("json parse args type failed, dump %s", Utils::dumpJson(root));
        return;
    }

    layer.stream_id = j_layer["stream_id"].asString();
    layer.index = j_layer["index"].asInt();
    std::string client_id = "cli_mixer_" + mixer_id;
    std::shared_ptr<Client> client = getOrCreateClient(client_id);
    if (client == nullptr)
    {
        ELOG_ERROR("getOrCreateClient failed,dump %s", Utils::dumpJson(root));
        return;
    }

    if (client->mixers.find(mixer_id) == client->mixers.end())
    {
        ELOG_ERROR("could not find mixers,dump %s", Utils::dumpJson(root));
        return;
    }

    std::shared_ptr<erizo::StreamMixer> stream_mixer = client->mixers[mixer_id];
    if (!stream_mixer)
    {
        ELOG_ERROR("could not find mixer, dump %s", Utils::dumpJson(root));
        return;
    }

    auto find_layer = [&layer](const Layer &l) {
        return l.stream_id == layer.stream_id && l.index == layer.index;
    };

    Mixer mixer = stream_mixer->getMixerConfig();
    auto it_layer = std::find_if(mixer.layers.begin(), mixer.layers.end(), find_layer);
    if (it_layer == mixer.layers.end())
    {
        ELOG_ERROR("could not find mixer's layer, dump %s", Utils::dumpJson(root));
        return;
    }

    auto find_stream = [&layer](const Layer &l) {
        return l.stream_id == layer.stream_id;
    };

    int stream_used_count = std::count_if(mixer.layers.begin(), mixer.layers.end(), find_stream);
    if (stream_used_count <= 1)
    {
        std::string bridge_stream_id = it_layer->bridge_stream.id;
        std::string src_stream_id = it_layer->bridge_stream.src_stream_id;
        std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_stream_id);
        if (bridge_conn)
        {
            bridge_conn->removeSubscriber("mixer_" + src_stream_id);
            bridge_conn->close();
            bridge_conns_.erase(bridge_stream_id);
        }
    }
}

void Erizo::removeMixer(const Json::Value &root)
{
    ELOG_ERROR("*************** removeMixer %s *************", Utils::dumpJson(root));
    Mixer mixer;
    if (0 != Mixer::fromJSON(root, mixer))
    {
        ELOG_ERROR("json parse mixer failed,dump %s", Utils::dumpJson(root));
        return;
    }

    std::string client_id = "cli_mixer_" + mixer.id;
    std::shared_ptr<Client> client = getOrCreateClient(client_id);
    if (!client)
    {
        ELOG_ERROR("not find the mixer's client:%s", client_id.c_str());
        return;
    }

    auto it = client->mixers.find(mixer.id);
    if (it == client->mixers.end())
    {
        ELOG_ERROR("not find the mixer[%s] from the client[%s]", mixer.id.c_str(), client_id.c_str());
        return;
    }
    std::shared_ptr<erizo::StreamMixer> stream_mixer = it->second;

    for (const auto &layer : mixer.layers)
    {
        std::string bridge_stream_id = layer.bridge_stream.id;
        std::string src_stream_id = layer.bridge_stream.src_stream_id;
        std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_stream_id);
        if (bridge_conn != nullptr)
        {
            bridge_conn->removeSubscriber("mixer_" + src_stream_id);
            bridge_conn->close();
            bridge_conns_.erase(bridge_stream_id);
        }
    }

    if (stream_mixer)
    {
        stream_mixer->close();
        client->mixers.erase(mixer.id);
    }
    
    if (client->canRemove())
    {
        removeClient(client->id);
    }

    if(canExit())
    {
        quit();
    }
}

void Erizo::addPublisher(const Json::Value &root)
{
    CHECK_RETURN_ON_FAIL(root, "appid", Int64);
    CHECK_RETURN_ON_FAIL(root, "room_id", String);
    CHECK_RETURN_ON_FAIL(root, "client_id", String);
    CHECK_RETURN_ON_FAIL(root, "stream_id", String);
    CHECK_RETURN_ON_FAIL(root, "label", String);
    CHECK_RETURN_ON_FAIL(root, "reply_to", String);
    int64_t appid = root["appid"].asInt64();
    std::string room_id = root["room_id"].asString();
    std::string client_id = root["client_id"].asString();
    std::string stream_id = root["stream_id"].asString();
    std::string label = root["label"].asString();
    std::string reply_to = root["reply_to"].asString();
    // std::string isp = args[5].asString();
    std::string isp;
    std::shared_ptr<Client> client = getOrCreateClient(client_id);
    std::shared_ptr<Connection> conn = std::make_shared<Connection>();
    conn->setConnectionListener(this);
    conn->setAppId(appid);
    conn->setRoomId(room_id);
    conn->init(agent_id_, erizo_id_, client_id, stream_id, label, true, reply_to, isp, thread_pool_, io_thread_pool_);
    client->publishers[stream_id] = conn;
}

void Erizo::addVirtualPublisher(const Json::Value &root)
{
    CHECK_RETURN_ON_FAIL(root, "appid", Int64);
    CHECK_RETURN_ON_FAIL(root, "id", String);
    CHECK_RETURN_ON_FAIL(root, "srcStreamId", String);
    CHECK_RETURN_ON_FAIL(root, "senderIp", String);
    CHECK_RETURN_ON_FAIL(root, "senderPort", Int);
    CHECK_RETURN_ON_FAIL(root, "videoSSRC", UInt);
    CHECK_RETURN_ON_FAIL(root, "audioSSRC", UInt);

    int64_t appid = root["appid"].asInt64();
    std::string bridge_id = root["id"].asString();
    std::string src_stream_id = root["srcStreamId"].asString();
    std::string ip = root["senderIp"].asString();
    uint16_t port = root["senderPort"].asInt();
    uint32_t video_ssrc = root["videoSSRC"].asUInt();
    uint32_t audio_ssrc = root["audioSSRC"].asUInt();

    std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_id);
    if (bridge_conn == nullptr)
    {
        bridge_conn = std::make_shared<BridgeConn>();
        bridge_conn->init(bridge_id, src_stream_id, ip, port, io_thread_pool_, false, video_ssrc, audio_ssrc);
        bridge_conns_[bridge_id] = bridge_conn;
    }
}

void Erizo::removeVirtualPublisher(const Json::Value &root)
{
    CHECK_RETURN_ON_FAIL(root, "appid", Int64);
    CHECK_RETURN_ON_FAIL(root, "roomId", String);
    CHECK_RETURN_ON_FAIL(root, "srcStreamId", String);
    CHECK_RETURN_ON_FAIL(root, "id", String);

    std::string src_stream_id = root["srcStreamId"].asString();
    std::string bridge_id = root["id"].asString();
    std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_id);
    if (bridge_conn != nullptr)
    {
        bridge_conns_.erase(bridge_id);
        bridge_conn->close();
    }
}

void Erizo::addVirtualSubscriber(const Json::Value &root)
{
    CHECK_RETURN_ON_FAIL(root, "appid", Int64);
    CHECK_RETURN_ON_FAIL(root, "id", String);
    CHECK_RETURN_ON_FAIL(root, "srcStreamId", String);
    CHECK_RETURN_ON_FAIL(root, "recverIp", String);
    CHECK_RETURN_ON_FAIL(root, "recverPort", Int);

    int64_t appid = root["appid"].asInt64();
    std::string bridge_id = root["id"].asString();
    std::string src_stream_id = root["srcStreamId"].asString();
    std::string ip = root["recverIp"].asString();
    uint16_t port = root["recverPort"].asInt();

    std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_id);
    if (bridge_conn == nullptr)
    {
        std::shared_ptr<Connection> pub_conn = getPublishConn(src_stream_id);
        std::shared_ptr<erizo::StreamMixer> stream_mixer = nullptr;
        if (pub_conn == nullptr)
        {
            ELOG_ERROR("addVirtualSubscriber failed, pub_conn is null");
            stream_mixer = getStreamMixer(src_stream_id);
            if (stream_mixer == nullptr)
            {
                ELOG_ERROR("addVirtualSubscriber failed, stream_mixer is null");
                return;
            }
        }

        bridge_conn = std::make_shared<BridgeConn>();
        bridge_conn->init(bridge_id, src_stream_id, ip, port, io_thread_pool_, true);
        if (pub_conn)
        {
            pub_conn->addSubscriber(bridge_id, bridge_conn->getBridgeMediaStream());
        }
        else if (stream_mixer)
        {
            stream_mixer->addSubscriber(bridge_id, bridge_conn->getBridgeMediaStream());
        }

        bridge_conns_[bridge_id] = bridge_conn;
    }
}

void Erizo::removeVirtualSubscriber(const Json::Value &root)
{
    CHECK_RETURN_ON_FAIL(root, "appid", Int64);
    CHECK_RETURN_ON_FAIL(root, "roomId", String);
    CHECK_RETURN_ON_FAIL(root, "srcStreamId", String);
    CHECK_RETURN_ON_FAIL(root, "id", String);

    std::string bridge_id = root["id"].asString();
    std::string src_stream_id = root["srcStreamId"].asString();

    std::shared_ptr<Connection> pub_conn = getPublishConn(src_stream_id);
    if (pub_conn != nullptr)
        pub_conn->removeSubscriber(bridge_id);

    std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_id);
    if (bridge_conn != nullptr)
    {
        bridge_conns_.erase(bridge_id);
        bridge_conn->close();
    }
}

void Erizo::removePublisher(const Json::Value &root)
{
    CHECK_RETURN_ON_FAIL(root, "appid", Int64);
    CHECK_RETURN_ON_FAIL(root, "room_id", String);
    CHECK_RETURN_ON_FAIL(root, "client_id", String);
    CHECK_RETURN_ON_FAIL(root, "stream_id", String);
    // CHECK_RETURN_ON_FAIL(root, "reply_to", String);
    int64_t appid = root["appid"].asInt64();
    std::string room_id = root["room_id"].asString();
    std::string client_id = root["client_id"].asString();
    std::string stream_id = root["stream_id"].asString();
    std::string label = root["label"].asString();
    // std::string reply_to = root["reply_to"].asString();

    std::shared_ptr<Client> pub_client = getOrCreateClient(client_id);
    std::shared_ptr<Connection> pub_conn = getPublishConn(pub_client, stream_id);
    if (pub_conn != nullptr)
    {
        std::vector<std::shared_ptr<Client>> sub_clients = getSubscribers(stream_id);
        for (std::shared_ptr<Client> sub_client : sub_clients)
        {
            std::shared_ptr<Connection> sub_conn = getSubscribeConn(sub_client, stream_id);
            if (sub_conn != nullptr)
            {
                sub_client->subscribers.erase(stream_id);
                sub_conn->close();
            }
        }

        std::vector<std::shared_ptr<BridgeConn>> bridge_conns = getBridgeConns(stream_id);
        for (std::shared_ptr<BridgeConn> bridge_conn : bridge_conns)
        {
            bridge_conns_.erase(bridge_conn->getBridgeStreamId());
            bridge_conn->close();
        }

        pub_client->publishers.erase(stream_id);
        if (pub_client->canRemove())
        {
            removeClient(pub_client->id);
        }
        pub_conn->close();
    }

    if(canExit())
    {
        quit();
    }
}

int Erizo::addRecorder(const Json::Value &root)
{
    CHECK_RETURN_CODE_ON_FAIL(root, "appid", Int64, -1);
    CHECK_RETURN_CODE_ON_FAIL(root, "room_id", String, -2);
    CHECK_RETURN_CODE_ON_FAIL(root, "client_id", String, -3);
    CHECK_RETURN_CODE_ON_FAIL(root, "stream_id", String, -4);
    CHECK_RETURN_CODE_ON_FAIL(root, "record_types", Array, -5);
    CHECK_RETURN_CODE_ON_FAIL(root, "reply_to", String, -6);
    CHECK_RETURN_CODE_ON_FAIL(root, "bridge_id", String, -7);
    int64_t appid = root["appid"].asInt64();
    std::string room_id = root["room_id"].asString();
    std::string client_id = "recorder_"+ root["client_id"].asString();
    std::string stream_id = root["stream_id"].asString();
    std::string reply_to = root["reply_to"].asString();
    std::string bridge_id = root["bridge_id"].asString();

    Json::Value json_types = root["record_types"];
    std::vector<std::string> files;
    for (int i = 0; i < json_types.size(); i++)
    {
        std::string file = Config::getInstance()->record_path_ + "/" + stream_id + "_" + std::to_string(Utils::getCurrentMs()) + "." + json_types[i].asString();
        files.push_back(file);
    }

    std::shared_ptr<Client> client = getOrCreateClient(client_id);

    std::function<void(const std::string &, const std::string &, int64_t)> create_cb = 
    [=](const std::string &stream_id, 
       const std::string &file, 
       int64_t timestamp_ms) {
        if(!Config::getInstance()->record_report_url_.empty()) {
            HttpSimpleClient httpClient;
            std::map<std::string, std::string> headers;
            Json::Value param;
            param["room_id"] = room_id;
            param["stream_id"] = stream_id;
            param["file"] = file;
            param["timestamp"] = timestamp_ms;
            Json::FastWriter writer;
            std::string p = writer.write(param);
            httpClient.post(Config::getInstance()->record_report_url_, headers, p, [=](const std::map<std::string, std::string> &headers, const uint8_t *data, size_t len) {
                Json::Value root;
                Json::Reader reader;
                std::string s((const char*)data, len);
                if(!reader.parse(s, root)) {
                    ELOG_ERROR("resp from url[%s] is %s error.", Config::getInstance()->record_report_url_.c_str(), s.c_str());
                    return;
                }

                if(!root.isMember("code") || !root["code"].isInt()) {
                    ELOG_ERROR("resp from url[%s] is %s error.", Config::getInstance()->record_report_url_.c_str(), s.c_str());
                    return;
                }

                int code = root["code"].asInt();
                if(code != 0) {
                    ELOG_ERROR("code[%d] from url[%s] error.", code, Config::getInstance()->record_report_url_.c_str());
                    return;
                }
                ELOG_ERROR("report succeed.");//这里还需要考虑没上报成功的话，就多次上报
            }, [=](const std::string &error) {
                ELOG_ERROR("post to url[%s] param[%s] error.", Config::getInstance()->record_report_url_.c_str(), p.c_str());
            }, [=](){
                ELOG_ERROR("post to url[%s] param[%s] timeout.", Config::getInstance()->record_report_url_.c_str(), p.c_str());
            });
        }
        ELOG_ERROR("create_cb %s %s %lld", stream_id.c_str(), file.c_str(), timestamp_ms);
    };

    std::function<void(const std::string &, const std::string &, int64_t, int64_t)> done_cb = [=](
                                                                                                  const std::string &stream_id,
                                                                                                  const std::string &file,
                                                                                                  int64_t dur_video,
                                                                                                  int64_t dur_audio) {
        ELOG_ERROR("done %s %s %lld %lld", stream_id.c_str(), file.c_str(), dur_video, dur_audio);
    };

    std::shared_ptr<erizo::ExternalOutput> external_output = std::make_shared<erizo::ExternalOutput>(
        thread_pool_->getLessUsedWorker(),
        stream_id,
        files,
        Config::getInstance()->rtp_maps,
        Config::getInstance()->ext_maps,
        create_cb,
        done_cb);
    std::map<std::string, std::string> record_file_map_;

    external_output->init();

    std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_id);
    if (bridge_conn != nullptr)
    {
        if (bridge_conn->otm_processor_)
        {
            bridge_conn->otm_processor_->addSubscriber(external_output, stream_id);
        }
        else
        {
            ELOG_ERROR("bridge_conn's otm is null");
        }
    }
    else
    {
        ELOG_ERROR("bridge_conn is null");
    }

    client->recorders[stream_id] = external_output;
    // Json::Value data;
    // data["ret"] = 0;
    // return data;
    return 0;
}

int Erizo::removeRecorder(const Json::Value &root)
{
    CHECK_RETURN_CODE_ON_FAIL(root, "appid", Int64, -1);
    CHECK_RETURN_CODE_ON_FAIL(root, "room_id", String, -2);
    CHECK_RETURN_CODE_ON_FAIL(root, "client_id", String, -3);
    CHECK_RETURN_CODE_ON_FAIL(root, "stream_id", String, -4);
    // CHECK_RETURN_CODE_ON_FAIL(root, "reply_to", String, -5);
    CHECK_RETURN_CODE_ON_FAIL(root, "bridge_id", String, -6);
    int64_t appid = root["appid"].asInt64();
    std::string room_id = root["room_id"].asString();
    std::string client_id = "recorder_" + root["client_id"].asString();
    std::string stream_id = root["stream_id"].asString();
    // std::string reply_to = root["reply_to"].asString();
    std::string bridge_id = root["bridge_id"].asString();
    std::shared_ptr<Client> client = getOrCreateClient(client_id);
    std::shared_ptr<BridgeConn> bridge_conn = getBridgeConn(bridge_id);
    if (bridge_conn != nullptr)
    {
        if (bridge_conn->otm_processor_)
        {
            std::shared_ptr<erizo::MediaSink> subscriber = bridge_conn->otm_processor_->getSubscriber(stream_id);
            if (subscriber)
            {
                subscriber->close();
                bridge_conn->otm_processor_->removeSubscriber(stream_id);
            }
        }

        client->recorders.erase(stream_id);
        if (client->canRemove())
        {
            removeClient(client->id);
        }
    }

    if(canExit())
    {
        quit();
    }

    // Json::Value data;
    // data["ret"] = 0;
    // return data;
    return 0;
}

void Erizo::close()
{
    if (!init_)
        return;

    amqp_uniquecast_->close();
    amqp_uniquecast_.reset();
    amqp_uniquecast_ = nullptr;

    thread_pool_->close();
    thread_pool_.reset();
    thread_pool_ = nullptr;

    io_thread_pool_->close();
    io_thread_pool_.reset();
    io_thread_pool_ = nullptr;

    clients_.clear();
    bridge_conns_.clear();

    agent_id_ = "";
    erizo_id_ = "";

    init_ = false;
}

void Erizo::processSignaling(const Json::Value &root)
{
    if (!root.isMember("client_id") || !root["client_id"].isString())
    {
        ELOG_ERROR("client_id param error");
        return;
    }

    if (!root.isMember("stream_id") || !root["stream_id"].isString())
    {
        ELOG_ERROR("stream_id param error");
        return;
    }

    if (!root.isMember("msg") || !root["msg"].isObject())
    {
        ELOG_ERROR("msg param error");
        return;
    }

    std::string client_id = root["client_id"].asString();
    std::string stream_id = root["stream_id"].asString();
    Json::Value msg = root["msg"];

    std::shared_ptr<Client> client = getOrCreateClient(client_id);
    if (client == nullptr)
    {
        ELOG_ERROR("could not locate client:%s", client_id);
        return;
    }

    std::shared_ptr<Connection> conn = getConn(client, stream_id);
    if (conn == nullptr)
    {
        ELOG_ERROR("could not locate stream_id:%s", stream_id);
        return;
    }

    if (!msg.isMember("type") || !msg["type"].isString())
    {
        ELOG_ERROR("json parse type failed,dump %s", Utils::dumpJson(root));
        return;
    }

    std::string type = msg["type"].asString();
    if (type == "offer")
    {
        if (!msg.isMember("sdp") || !msg["sdp"].isString())
        {
            ELOG_ERROR("json parse sdp failed,dump %s", Utils::dumpJson(root));
            return;
        }

        std::string sdp = msg["sdp"].asString();
        if (conn->setRemoteSdp(sdp))
            return;
    }
    else if (type == "candidate")
    {
        if (!msg.isMember("candidate") || !msg["candidate"].isObject())
        {
            ELOG_ERROR("json parse candidate failed,dump %s", Utils::dumpJson(root));
            return;
        }

        Json::Value candidate = msg["candidate"];
        if (!candidate.isMember("sdpMLineIndex") ||
            !candidate["sdpMLineIndex"].isInt() ||
            !candidate.isMember("sdpMid") ||
            !candidate["sdpMid"].isString() ||
            !candidate.isMember("candidate") ||
            !candidate["candidate"].isString())
        {
            ELOG_ERROR("json parse [sdpMLineIndex/sdpMid/candidate] failed,dump %s", Utils::dumpJson(root));
            return;
        }

        int sdp_mine_index = candidate["sdpMLineIndex"].asInt();
        std::string mid = candidate["sdpMid"].asString();
        std::string candidate_str = candidate["candidate"].asString();
        if (conn->addRemoteCandidate(mid, sdp_mine_index, candidate_str))
            return;
    }
}

std::shared_ptr<Connection> Erizo::getPublishConn(const std::string &stream_id)
{
    for (auto it = clients_.begin(); it != clients_.end(); it++)
    {
        auto itc = it->second->publishers.find(stream_id);
        if (itc != it->second->publishers.end())
            return itc->second;
    }
    return nullptr;
}

std::shared_ptr<erizo::StreamMixer> Erizo::getStreamMixer(const std::string &stream_id)
{
    for (auto it = clients_.begin(); it != clients_.end(); it++)
    {
        auto itc = it->second->mixers.find(stream_id);
        if (itc != it->second->mixers.end())
            return itc->second;
    }
    return nullptr;
}

std::vector<std::shared_ptr<Client>> Erizo::getSubscribers(const std::string &subscribe_to)
{
    std::vector<std::shared_ptr<Client>> subscribers;
    for (auto it = clients_.begin(); it != clients_.end(); it++)
    {
        auto itc = it->second->subscribers.find(subscribe_to);
        if (itc != it->second->subscribers.end())
            subscribers.push_back(it->second);
    }
    return subscribers;
}

std::shared_ptr<Connection> Erizo::getPublishConn(std::shared_ptr<Client> client, const std::string &stream_id)
{
    auto it = client->publishers.find(stream_id);
    if (it != client->publishers.end())
        return it->second;

    return nullptr;
}

std::shared_ptr<Connection> Erizo::getSubscribeConn(std::shared_ptr<Client> client, const std::string &stream_id)
{
    auto it = client->subscribers.find(stream_id);
    if (it != client->subscribers.end())
        return it->second;

    return nullptr;
}

std::shared_ptr<Connection> Erizo::getConn(std::shared_ptr<Client> client, const std::string &stream_id)
{
    {
        auto it = client->publishers.find(stream_id);
        if (it != client->publishers.end())
            return it->second;
    }
    {
        auto it = client->subscribers.find(stream_id);
        if (it != client->subscribers.end())
            return it->second;
    }

    return nullptr;
}

std::shared_ptr<BridgeConn> Erizo::getBridgeConn(const std::string &stream_id)
{
    auto it = bridge_conns_.find(stream_id);
    if (it != bridge_conns_.end())
        return it->second;
    return nullptr;
}

std::vector<std::shared_ptr<BridgeConn>> Erizo::getBridgeConns(const std::string &src_stream_id)
{
    std::vector<std::shared_ptr<BridgeConn>> bridge_conns;
    for (auto it = bridge_conns_.begin(); it != bridge_conns_.end(); it++)
    {
        if (!it->second->getSrcStreamId().compare(src_stream_id))
            bridge_conns.push_back(it->second);
    }
    return bridge_conns;
}

std::shared_ptr<Client> Erizo::getOrCreateClient(const std::string &client_id)
{
    std::lock_guard<std::mutex> lg(clients_mtx_);
    auto it = clients_.find(client_id);
    if (it == clients_.end())
    {
        clients_[client_id] = std::make_shared<Client>();
        clients_[client_id]->id = client_id;
    }
    return clients_[client_id];
}

bool Erizo::removeClient(const std::string &client_id)
{
    std::lock_guard<std::mutex> lg(clients_mtx_);
    if (clients_.find(client_id) != clients_.end())
    {
        clients_.erase(client_id);
        return true;
    }
    return false;
}

bool Erizo::canExit() 
{
    std::lock_guard<std::mutex> lg(clients_mtx_);
    if(clients_.size() <= 0)
    {
        return true;
    }
    return false;
}