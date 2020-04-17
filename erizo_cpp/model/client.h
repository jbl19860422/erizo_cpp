#ifndef CLIENT_H
#define CLIENT_H

#include <string>
#include <memory>
#include <map>
#include <sstream>


namespace erizo {
class Connection;
class StreamMixer;
class ExternalOutput;
};

struct Client
{
    std::string id;
    std::map<std::string, std::shared_ptr<Connection>> subscribers;
    std::map<std::string, std::shared_ptr<Connection>> publishers;
    std::map<std::string, std::shared_ptr<erizo::StreamMixer>> mixers;
    std::map<std::string, std::shared_ptr<erizo::ExternalOutput>> recorders;

    bool canRemove() {
        if(subscribers.size() <= 0 && publishers.size() <= 0 && mixers.size() <= 0 && recorders.size() <= 0) {
            return true;
        }
        
        return false;
    }

    operator std::string() {
        std::ostringstream ostr;
        ostr << "client:" << subscribers.size() << ", " << publishers.size() << ", " << mixers.size();
        return ostr.str();
    }
};


#endif