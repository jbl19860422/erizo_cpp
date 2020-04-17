#ifndef CONFIG_H
#define CONFIG_H

#include <string>
#include <vector>
#include <unordered_map>

#include <json/json.h>
#include <logger.h>

namespace erizo
{
class ExtMap;
class RtpMap;
} // namespace erizo

class Config
{
    DECLARE_LOGGER();

public:
    static Config *getInstance();
    virtual ~Config();
    int init(const std::string &config_file);

private:
    Config();
    int initConfig(const Json::Value &root);
    int initMedia(const Json::Value &root);

public:
    // RabbitMQ config
    std::string rabbitmq_username;
    std::string rabbitmq_passwd;
    std::string rabbitmq_hostname;
    unsigned short rabbitmq_port;
    std::string uniquecast_exchange;
    std::string boardcast_exchange;
    //mysql config
    std::string mysql_url;
    std::string mysql_username;
    std::string mysql_passwd;

    // Erizo threadpool config
    int worker_thread_num;
    int io_worker_thread_num;
    int bridge_io_thread_num;

    // Erizo libnice config
    // stun
    std::string stun_server;
    unsigned short stun_port;
    // turn
    std::string turn_server;
    unsigned short turn_port;
    std::string turn_username;
    std::string turn_passwd;
    std::map<std::string, std::string> network_interfaces_;
    // other
    unsigned int ice_components;
    bool should_trickle;
    int max_port;
    int min_port;
    // ip trans
    std::unordered_map<std::string, std::string> address_trans_map;//在阿里云这样的机器，无法指定外网网卡，只能通过替换ip地址了

    //Erizo media type
    std::string audio_codec;
    std::string video_codec;

    std::vector<erizo::ExtMap> ext_maps;
    std::vector<erizo::RtpMap> rtp_maps;

    //record
    std::string record_path_;
    std::string record_report_url_;

private:
    static Config *instance_;
};

#endif