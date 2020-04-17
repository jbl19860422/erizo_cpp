#include "config.h"

#include <fstream>
#include <string.h>
#include <SdpInfo.h>

DEFINE_LOGGER(Config, "Config");
Config *Config::instance_ = nullptr;
Config::~Config()
{
}

Config *Config::getInstance()
{
    if (instance_ == nullptr)
        instance_ = new Config;
    return instance_;
}

Config::Config()
{
    rabbitmq_username = "linmin";
    rabbitmq_passwd = "linmin";
    rabbitmq_hostname = "localhost";
    rabbitmq_port = 5672;
    uniquecast_exchange = "erizo_uniquecast_exchange";
    boardcast_exchange = "erizo_boardcast_exchange";

    mysql_url = "tcp://172.19.5.107:3306";
    mysql_username = "root";
    mysql_passwd = "licode";

    worker_thread_num = 5;
    io_worker_thread_num = 5;
    bridge_io_thread_num = 5;

    stun_server = "stun:stun.l.google.com";
    stun_port = 19302;
    turn_server = "";
    turn_port = 0;
    turn_username = "";
    turn_passwd = "";

    ice_components = 0;
    should_trickle = false;
    max_port = 0;
    min_port = 0;

    audio_codec = "opus";
    video_codec = "h264";

    record_path_ = "/data/record";
}

int Config::initConfig(const Json::Value &root)
{
    Json::Value rabbitmq = root["rabbitmq"];
    if (!root.isMember("rabbitmq") ||
        rabbitmq.type() != Json::objectValue ||
        !rabbitmq.isMember("host") ||
        rabbitmq["host"].type() != Json::stringValue ||
        !rabbitmq.isMember("port") ||
        rabbitmq["port"].type() != Json::intValue ||
        !rabbitmq.isMember("username") ||
        rabbitmq["username"].type() != Json::stringValue ||
        !rabbitmq.isMember("password") ||
        rabbitmq["password"].type() != Json::stringValue ||
        !rabbitmq.isMember("boardcast_exchange") ||
        rabbitmq["boardcast_exchange"].type() != Json::stringValue ||
        !rabbitmq.isMember("uniquecast_exchange") ||
        rabbitmq["uniquecast_exchange"].type() != Json::stringValue)
    {
        ELOG_ERROR("rabbitmq config check error");
        return 1;
    }

    Json::Value mysql = root["mysql"];
    if (!root.isMember("mysql") ||
        mysql.type() != Json::objectValue ||
        !mysql.isMember("url") ||
        mysql["url"].type() != Json::stringValue ||
        !mysql.isMember("username") ||
        mysql["username"].type() != Json::stringValue ||
        !mysql.isMember("password") ||
        mysql["password"].type() != Json::stringValue)
    {
        ELOG_ERROR("mysql config check error");
        return 1;
    }

    Json::Value ice = root["ice"];
    if (!root.isMember("ice") ||
        ice.type() != Json::objectValue ||
        !ice.isMember("network_interfaces") ||
        ice["network_interfaces"].type() != Json::arrayValue ||
        !ice.isMember("ice_components") ||
        ice["ice_components"].type() != Json::intValue ||
        !ice.isMember("should_trickle") ||
        ice["should_trickle"].type() != Json::booleanValue ||
        !ice.isMember("min_port") ||
        ice["min_port"].type() != Json::intValue ||
        !ice.isMember("max_port") ||
        ice["max_port"].type() != Json::intValue)
    {
        ELOG_ERROR("ice config check error");
        return 1;
    }

    Json::Value network_interface = ice["network_interfaces"];
    for (uint32_t i = 0; i < network_interface.size(); i++)
    {
        Json::Value item = network_interface[i];
        if (!item.isMember("isp") ||
            item["isp"].type() != Json::stringValue ||
            !item.isMember("iface") ||
            item["iface"].type() != Json::stringValue)
            continue;
        network_interfaces_[item["isp"].asString()] = item["iface"].asString();
    }

    if(ice.isMember("address_trans") && ice["address_trans"].isObject())
    {
        Json::Value address_trans = ice["address_trans"];
        Json::Value::Members members = address_trans.getMemberNames();
        for (auto it = members.begin(); it != members.end(); it++)
        {
            std::string value = address_trans[*it].asString();
            address_trans_map[*it] = value;
        }
    }

    Json::Value stun = ice["stun"];
    if (!ice.isMember("stun") ||
        stun.type() != Json::objectValue ||
        !stun.isMember("host") ||
        stun["host"].type() != Json::stringValue ||
        !stun.isMember("port") ||
        stun["port"].type() != Json::intValue)
    {
        ELOG_ERROR("stun config check error");
        return 1;
    }

    Json::Value turn = ice["turn"];
    if (!ice.isMember("turn") ||
        turn.type() != Json::objectValue ||
        !turn.isMember("host") ||
        turn["host"].type() != Json::stringValue ||
        !turn.isMember("port") ||
        turn["port"].type() != Json::intValue ||
        !turn.isMember("username") ||
        turn["username"].type() != Json::stringValue ||
        !turn.isMember("password") ||
        turn["password"].type() != Json::stringValue)
    {
        ELOG_ERROR("turn config check error");
        return 1;
    }

    Json::Value media = root["media"];
    if (!root.isMember("media") ||
        media.type() != Json::objectValue ||
        !media.isMember("audio_codec") ||
        media["audio_codec"].type() != Json::stringValue ||
        !media.isMember("video_codec") ||
        media["video_codec"].type() != Json::stringValue)
    {
        ELOG_ERROR("media config check error");
        return 1;
    }

    Json::Value erizo = root["erizo"];
    if (!root.isMember("erizo") ||
        erizo.type() != Json::objectValue ||
        !erizo.isMember("worker_thread_num") ||
        erizo["worker_thread_num"].type() != Json::intValue ||
        !erizo.isMember("io_worker_thread_num") ||
        erizo["io_worker_thread_num"].type() != Json::intValue ||
        !erizo.isMember("bridge_io_thread_num") ||
        erizo["bridge_io_thread_num"].type() != Json::intValue)
    {
        ELOG_ERROR("erizo config check error");
        return 1;
    }

    if(!root.isMember("record_path") || !root["record_path"].isString()) {
        ELOG_ERROR("record path config check error");
        return 1;
    }

    if(!root.isMember("record_report_url") || !root["record_report_url"].isString()) {
        ELOG_ERROR("reocrd report url config check error");
        return 1;
    }
    
    record_path_ = root["record_path"].asString();
    record_report_url_ = root["record_report_url"].asString();

    rabbitmq_hostname = rabbitmq["host"].asString();
    rabbitmq_port = rabbitmq["port"].asInt();
    rabbitmq_username = rabbitmq["username"].asString();
    rabbitmq_passwd = rabbitmq["password"].asString();
    uniquecast_exchange = rabbitmq["uniquecast_exchange"].asString();
    boardcast_exchange = rabbitmq["boardcast_exchange"].asString();

    mysql_url = mysql["url"].asString();
    mysql_username = mysql["username"].asString();
    mysql_passwd = mysql["password"].asString();

    stun_server = stun["host"].asString();
    stun_port = stun["port"].asInt();
    turn_server = turn["host"].asString();
    turn_port = turn["port"].asInt();
    turn_username = turn["username"].asString();
    turn_passwd = turn["password"].asString();
    ice_components = ice["ice_components"].asInt();
    should_trickle = ice["should_trickle"].asBool();
    min_port = ice["min_port"].asInt();
    max_port = ice["max_port"].asInt();
    audio_codec = media["audio_codec"].asString();
    video_codec = media["video_codec"].asString();

    worker_thread_num = erizo["worker_thread_num"].asInt();
    io_worker_thread_num = erizo["io_worker_thread_num"].asInt();
    bridge_io_thread_num = erizo["bridge_io_thread_num"].asInt();

    return 0;
}

int Config::initMedia(const Json::Value &root)
{
    ext_maps.clear();
    if (root.isMember("extMappings") && root["extMappings"].type() == Json::arrayValue)
    {
        uint32_t num = root["extMappings"].size();
        for (uint32_t i = 0; i < num; i++)
        {
            ext_maps.push_back({i, root["extMappings"][i].asString()});
        }
    }

    rtp_maps.clear();
    if (root.isMember("mediaType") && root["mediaType"].type() == Json::arrayValue)
    {
        uint32_t num = root["mediaType"].size();
        for (uint32_t i = 0; i < num; i++)
        {
            Json::Value value = root["mediaType"][i];
            erizo::RtpMap rtp_map;
            if (value.isMember("payloadType") && value["payloadType"].type() == Json::intValue)
            {
                rtp_map.payload_type = value["payloadType"].asInt();
            }

            if (value.isMember("clockRate") && value["clockRate"].type() == Json::intValue)
            {
                rtp_map.clock_rate = value["clockRate"].asInt();
            }
            if (value.isMember("channels") && value["channels"].type() == Json::intValue)
            {
                rtp_map.channels = value["channels"].asInt();
            }
            if (value.isMember("type") && value["type"].type() == Json::stringValue) {
                std::string media_type = value["type"].asString();
                if (media_type == "audio") {
                    rtp_map.media_type = erizo::AUDIO_TYPE;
                } else if (media_type == "video") {
                    rtp_map.media_type = erizo::VIDEO_TYPE;
                } else {
                    rtp_map.media_type = erizo::OTHER;
                }
            }

            if (value.isMember("feedbackTypes") && value["feedbackTypes"].type() == Json::arrayValue)
            {
                uint32_t fb_type_num = value["feedbackTypes"].size();
                for (uint32_t j = 0; j < fb_type_num && (value["feedbackTypes"][j].type() == Json::stringValue); j++)
                    rtp_map.feedback_types.push_back(value["feedbackTypes"][j].asString());
            }

            if (value.isMember("formatParameters") && value["formatParameters"].type() == Json::objectValue)
            {
                Json::Value::Members members = value["formatParameters"].getMemberNames();
                Json::Value fmt_param = value["formatParameters"];
                for (auto it = members.begin(); it != members.end(); it++)
                {

                    std::string value = fmt_param[*it].asString();
                    rtp_map.format_parameters[*it] = value;
                }
            }

            if (value.isMember("encodingName") && value["encodingName"].type() == Json::stringValue)
            {

                rtp_map.encoding_name = value["encodingName"].asString();
                if (!strcasecmp(rtp_map.encoding_name.c_str(), audio_codec.c_str()))
                {
                    rtp_maps.push_back(rtp_map);
                }
                else if (!strcasecmp(rtp_map.encoding_name.c_str(), video_codec.c_str()))
                {
                    rtp_maps.push_back(rtp_map);
                }
            }
        }
    }

    return 0;
}

int Config::init(const std::string &config_file)
{
    std::ifstream ifs(config_file, std::ios::binary);
    if (!ifs.is_open())
    {
        ELOG_ERROR("open %s failed", config_file);
        return 1;
    }

    Json::Reader reader(Json::Features::strictMode());
    Json::Value root;
    if (!reader.parse(ifs, root))
    {
        ELOG_ERROR("parse %s failed", config_file);
        return 1;
    }

    initMedia(root);
    return initConfig(root);
}
