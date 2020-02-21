#ifndef RECORD_ERIZO_AGENT_H
#define RECORD_ERIZO_AGENT_H

#include <string>

#include <json/json.h>

struct ErizoRecordAgent
{
    std::string id;
    std::string ip;
    std::vector<std::string> source_agents_ip;
    uint64_t last_update;
    int erizo_process_num;
    int record_task_num;//录制任务数量

    std::string toJSON() const
    {
        Json::Value root;
        root["id"] = id;
        root["ip"] = ip;
        for(const auto it : source_agents_ip) {
            root["source_agents_ip"].append(it);
        }
        root["last_update"] = last_update;
        root["erizo_process_num"] = erizo_process_num;
        root["record_task_num"] = record_task_num;

        Json::FastWriter writer;
        return writer.write(root);
    }

    static int fromJSON(const Json::Value &root, ErizoRecordAgent &agent)
    {
        if (!root.isMember("id") ||
            root["id"].type() != Json::stringValue ||
            !root.isMember("ip") ||
            root["ip"].type() != Json::stringValue ||
            !root.isMember("source_agents_ip") ||
            root["source_agents_ip"].isArray() ||
            !root.isMember("last_update") ||
            root["last_update"].type() != Json::uintValue ||
            !root.isMember("record_task_num") ||
            root["record_task_num"].isInt()
            ) {
            return 1;
        }
        
        agent.id = root["id"].asString();
        agent.ip = root["ip"].asString();
        for(int i = 0; i < root["source_agents_ip"].size(); i++) {
            agent.source_agents_ip.push_back(root["source_agents_ip"].asString());
        }
        agent.last_update = root["last_update"].asUInt64();
        agent.erizo_process_num = root["erizo_process_num"].asInt();
        agent.record_task_num = root["record_task_num"].asInt();
        return 0;
    }

    static int fromJSON(const std::string &json, ErizoRecordAgent &agent)
    {
        Json::Value root;
        Json::Reader reader;
        if (!reader.parse(json, root))
            return 1;

        if (!root.isMember("id") ||
            root["id"].type() != Json::stringValue ||
            !root.isMember("ip") ||
            root["ip"].type() != Json::stringValue ||
            !root.isMember("source_agents_ip") ||
            root["source_agents_ip"].isArray() ||
            !root.isMember("last_update") ||
            root["last_update"].type() != Json::uintValue ||
            !root.isMember("record_task_num") ||
            root["record_task_num"].isInt()
            ) {
            return 1;
        }
        
        agent.id = root["id"].asString();
        agent.ip = root["ip"].asString();
        for(int i = 0; i < root["source_agents_ip"].size(); i++) {
            agent.source_agents_ip.push_back(root["source_agents_ip"].asString());
        }
        agent.last_update = root["last_update"].asUInt64();
        agent.erizo_process_num = root["erizo_process_num"].asInt();
        agent.record_task_num = root["record_task_num"].asInt();
        return 0;
    }
};

#endif