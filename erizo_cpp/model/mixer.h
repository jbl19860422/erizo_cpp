// #ifndef MIXER_H_
// #define MIXER_H_
// #include <string>
// #include <vector>

// #include <json/json.h>
// #include "bridge_stream.h"
// #include "common/utils.h"

// struct Layer {
// public:
//     std::string stream_id;
//     int index = 0;    
//     int width;
//     int height;
//     int off_x;
//     int off_y;
//     double audio_gain = 1.0f;//音频增益，1是默认值,0则静音
//     uint32_t video_ssrc;
//     uint32_t audio_ssrc;
//     BridgeStream bridge_stream;
//     std::shared_ptr<erizo::FeedbackSink> bridge_feedback_sink = nullptr;

//     bool operator==(const Layer &b) {//相等判断，用于判断是否可以加入此层
//         if(stream_id == b.stream_id && index == b.index) {
//             return true;
//         }
//         return false;
//     }

//     std::string toJSON() const
//     {
//         Json::Value root;
//         root["stream_id"] = stream_id;
//         root["index"] = index;
//         root["width"] = width;
//         root["height"] = height;
//         root["off_x"] = off_x;
//         root["off_y"] = off_y;
//         root["audio_gain"] = audio_gain;
//         root["video_ssrc"] = video_ssrc;
//         root["audio_ssrc"] = audio_ssrc;
//         root["bridge_stream"] = bridge_stream.toJsonValue();
//         Json::FastWriter writer;
//         return writer.write(root);
//     }

//     const Json::Value toJsonValue() const
//     {
//         Json::Value root;
//         root["stream_id"] = stream_id;
//         root["index"] = index;
//         root["width"] = width;
//         root["height"] = height;
//         root["off_x"] = off_x;
//         root["off_y"] = off_y;
//         root["audio_gain"] = audio_gain;
//         root["video_ssrc"] = video_ssrc;
//         root["audio_ssrc"] = audio_ssrc;
//         root["bridge_stream"]  = bridge_stream.toJsonValue();
//         return root;
//     }

//     static int fromJSON(const std::string &json, Layer &layer)
//     {
//         Json::Value root;
//         Json::Reader reader(Json::Features::strictMode());
//         if (!reader.parse(json, root))
//             return -1;

//         RETURN_IF_CHECK_MEM_ERR(root, "stream_id", String, -2);
//         RETURN_IF_CHECK_MEM_ERR(root, "index", Int, -3);
//         RETURN_IF_CHECK_MEM_ERR(root, "width", Int, -4);
//         RETURN_IF_CHECK_MEM_ERR(root, "height", Int, -5);
//         RETURN_IF_CHECK_MEM_ERR(root, "off_x", Int, -6);
//         RETURN_IF_CHECK_MEM_ERR(root, "off_y", Int, -7);

//         layer.stream_id = root["stream_id"].asString();
//         layer.index = root["index"].asInt();
//         layer.width = root["width"].asInt();
//         layer.height = root["height"].asInt();
//         layer.off_x = root["off_x"].asInt();
//         layer.off_y = root["off_y"].asInt();
//         layer.audio_gain = root["audio_gain"].asDouble();
//         if(root.isMember("video_ssrc") && root["video_ssrc"].isUInt()) {
//             layer.video_ssrc = root["video_ssrc"].asUInt();
//         }
        
//         if(root.isMember("audio_ssrc") && root["audio_ssrc"].isUInt()) {
//             layer.audio_ssrc = root["audio_ssrc"].asUInt();
//         }
        
//         if(root.isMember("bridge_stream") && root["bridge_stream"].isObject()) {
//             if(0 != BridgeStream::fromJSON(root["bridge_stream"], layer.bridge_stream)) {
//                 return -8;
//             }
//         }

//         if(root.isMember("audio_gain") && root["audio_gain"].isDouble()) {
//             layer.audio_gain = root["audio_gain"].asDouble();
//         }
//         return 0;
//     }

//     static int fromJSON(const Json::Value &root, Layer &layer)
//     {
//         RETURN_IF_CHECK_MEM_ERR(root, "stream_id", String, -2);
//         RETURN_IF_CHECK_MEM_ERR(root, "index", Int, -3);
//         RETURN_IF_CHECK_MEM_ERR(root, "width", Int, -4);
//         RETURN_IF_CHECK_MEM_ERR(root, "height", Int, -5);
//         RETURN_IF_CHECK_MEM_ERR(root, "off_x", Int, -6);
//         RETURN_IF_CHECK_MEM_ERR(root, "off_y", Int, -7);

//         layer.stream_id = root["stream_id"].asString();
//         layer.index = root["index"].asInt();
//         layer.width = root["width"].asInt();
//         layer.height = root["height"].asInt();
//         layer.off_x = root["off_x"].asInt();
//         layer.off_y = root["off_y"].asInt();
//         layer.audio_gain = root["audio_gain"].asDouble();
//         if(root.isMember("video_ssrc") && root["video_ssrc"].isUInt()) {
//             layer.video_ssrc = root["video_ssrc"].asUInt();
//         }
        
//         if(root.isMember("audio_ssrc") && root["audio_ssrc"].isUInt()) {
//             layer.audio_ssrc = root["audio_ssrc"].asUInt();
//         }
        
//         if(root.isMember("bridge_stream") && root["bridge_stream"].isObject()) {
//             if(0 != BridgeStream::fromJSON(root["bridge_stream"], layer.bridge_stream)) {
//                 return 1;
//             }
//         }

//         if(root.isMember("audio_gain") && root["audio_gain"].isDouble()) {
//             layer.audio_gain = root["audio_gain"].asDouble();
//         }

//         return 0;
//     }
// };

// struct Mixer {
// public:
//     std::string id;
//     std::string room_id;
//     std::string org_client_id;//发起的client_id
//     std::string client_id;
//     std::string erizo_id;
//     std::string agent_id;
//     std::string agent_ip;
//     std::string bridge_ip;
//     uint16_t bridge_port;
//     uint32_t video_ssrc;
//     uint32_t audio_ssrc;
//     uint32_t bitrate;//控制码率
//     int width;//输出宽度
//     int height;//输出高度
//     std::vector<Layer> layers;

//     std::string toJSON() const
//     {
//         Json::Value root;
//         root["id"] = id;
//         root["room_id"] = room_id;
//         root["erizo_id"] = erizo_id;
//         root["agent_id"] = agent_id;
//         root["agent_ip"] = agent_ip;
//         root["org_client_id"] = org_client_id;
//         root["client_id"] = client_id;
//         root["bridge_ip"] = bridge_ip;
//         root["bridge_port"] = bridge_port;
//         root["video_ssrc"] = video_ssrc;
//         root["audio_ssrc"] = audio_ssrc;
//         root["width"] = width;
//         root["height"] = height;
//         root["bitrate"] = bitrate;
//         Json::Value j_layers;
//         for (auto l : layers) {
//             j_layers.append(l.toJsonValue());
//         }
//         root["layers"] = j_layers;
//         Json::FastWriter writer;
//         return writer.write(root);
//     }

//     const Json::Value toJsonValue() const
//     {
//         Json::Value root;
//         root["id"] = id;
//         root["room_id"] = room_id;
//         root["erizo_id"] = erizo_id;
//         root["agent_id"] = agent_id;
//         root["agent_ip"] = agent_ip;
//         root["org_client_id"] = org_client_id;
//         root["client_id"] = client_id;
//         root["bridge_ip"] = bridge_ip;
//         root["bridge_port"] = bridge_port;
//         root["video_ssrc"] = video_ssrc;
//         root["audio_ssrc"] = audio_ssrc;
//         root["width"] = width;
//         root["height"] = height;
//         root["bitrate"] = bitrate;
//         Json::Value j_layers;
//         for (auto l : layers) {
//             j_layers.append(l.toJsonValue());
//         }
//         root["layers"] = j_layers;
//         return root;
//     }

//     static int fromJSON(const std::string &json, Mixer &mixer)
//     {
//         Json::Value root;
//         Json::Reader reader(Json::Features::strictMode());
//         if (!reader.parse(json, root))
//             return -1;

//         RETURN_IF_CHECK_MEM_ERR(root, "id", String, -2);
//         RETURN_IF_CHECK_MEM_ERR(root, "room_id", String, -3);
//         RETURN_IF_CHECK_MEM_ERR(root, "erizo_id", String, -4);
//         RETURN_IF_CHECK_MEM_ERR(root, "agent_id", String, -5);
//         RETURN_IF_CHECK_MEM_ERR(root, "agent_ip", String, -6);
//         RETURN_IF_CHECK_MEM_ERR(root, "org_client_id", String, -7);
//         RETURN_IF_CHECK_MEM_ERR(root, "client_id", String, -8);
//         RETURN_IF_CHECK_MEM_ERR(root, "bridge_ip", String, -9);
//         RETURN_IF_CHECK_MEM_ERR(root, "bridge_port", Int, -10);
//         RETURN_IF_CHECK_MEM_ERR(root, "video_ssrc", UInt, -11);
//         RETURN_IF_CHECK_MEM_ERR(root, "audio_ssrc", UInt, -12);
//         RETURN_IF_CHECK_MEM_ERR(root, "width", UInt, -13);
//         RETURN_IF_CHECK_MEM_ERR(root, "height", UInt, -14);
//         RETURN_IF_CHECK_MEM_ERR(root, "bitrate", UInt, -15);
//         RETURN_IF_CHECK_MEM_ERR(root, "layers", Array, -16);

//         mixer.id = root["id"].asString();
//         mixer.room_id = root["room_id"].asString();
//         mixer.erizo_id = root["erizo_id"].asString();
//         mixer.agent_id = root["agent_id"].asString();
//         mixer.agent_ip = root["agent_ip"].asString();
//         mixer.org_client_id = root["org_client_id"].asString();
//         mixer.client_id = root["client_id"].asString();
//         mixer.bridge_ip = root["bridge_ip"].asString();
//         mixer.bridge_port = root["bridge_port"].asInt();
//         mixer.video_ssrc = root["video_ssrc"].asUInt();
//         mixer.audio_ssrc = root["audio_ssrc"].asUInt();
//         mixer.width = root["width"].asInt();
//         mixer.height = root["height"].asInt();
//         mixer.bitrate = root["bitrate"].asUInt();
        
//         Json::Value layers = root["layers"];
//         for(int i = 0; i < layers.size(); i++) {
//             Layer l;
//             if(0 != Layer::fromJSON(layers[i], l)) {
//                 printf("parse layer failed.\n");
//                 return -17;
//             }
//             mixer.layers.emplace_back(std::move(l));
//         }
//         return 0;
//     }

//     static int fromJSON(const Json::Value &root, Mixer &mixer)
//     {
//         RETURN_IF_CHECK_MEM_ERR(root, "id", String, -2);
//         RETURN_IF_CHECK_MEM_ERR(root, "room_id", String, -3);
//         RETURN_IF_CHECK_MEM_ERR(root, "erizo_id", String, -4);
//         RETURN_IF_CHECK_MEM_ERR(root, "agent_id", String, -5);
//         RETURN_IF_CHECK_MEM_ERR(root, "agent_ip", String, -6);
//         RETURN_IF_CHECK_MEM_ERR(root, "org_client_id", String, -7);
//         RETURN_IF_CHECK_MEM_ERR(root, "client_id", String, -8);
//         RETURN_IF_CHECK_MEM_ERR(root, "bridge_ip", String, -9);
//         RETURN_IF_CHECK_MEM_ERR(root, "bridge_port", Int, -10);
//         RETURN_IF_CHECK_MEM_ERR(root, "video_ssrc", UInt, -11);
//         RETURN_IF_CHECK_MEM_ERR(root, "audio_ssrc", UInt, -12);
//         RETURN_IF_CHECK_MEM_ERR(root, "width", UInt, -13);
//         RETURN_IF_CHECK_MEM_ERR(root, "height", UInt, -14);
//         RETURN_IF_CHECK_MEM_ERR(root, "bitrate", UInt, -15);
//         RETURN_IF_CHECK_MEM_ERR(root, "layers", Array, -16);

//         mixer.id = root["id"].asString();
//         mixer.room_id = root["room_id"].asString();
//         mixer.erizo_id = root["erizo_id"].asString();
//         mixer.agent_id = root["agent_id"].asString();
//         mixer.agent_ip = root["agent_ip"].asString();
//         mixer.org_client_id = root["org_client_id"].asString();
//         mixer.client_id = root["client_id"].asString();
//         mixer.bridge_ip = root["bridge_ip"].asString();
//         mixer.bridge_port = root["bridge_port"].asInt();
//         mixer.video_ssrc = root["video_ssrc"].asUInt();
//         mixer.audio_ssrc = root["audio_ssrc"].asUInt();
//         mixer.width = root["width"].asInt();
//         mixer.height = root["height"].asInt();
//         mixer.bitrate = root["bitrate"].asUInt();

//         Json::Value layers = root["layers"];
//          for(int i = 0; i < layers.size(); i++) {
//             Layer l;
//             if(0 != Layer::fromJSON(layers[i], l)) {
//                 printf("parse layer failed.\n");
//                 return -17;
//             }
//             mixer.layers.emplace_back(std::move(l));
//         }

//         return 0;
//     }
// };
// #endif

#ifndef MIXER_H_
#define MIXER_H_
#include <string>
#include <vector>

#include <json/json.h>
#include "bridge_stream.h"
#include "common/utils.h"

struct Layer {
public:
    std::string stream_id;
    int index = 0;    
    int width;
    int height;
    int off_x;
    int off_y;
    double audio_gain = 1.0f;//音频增益，1是默认值,0则静音
    uint32_t video_ssrc;
    uint32_t audio_ssrc;
    BridgeStream bridge_stream;
    std::shared_ptr<erizo::FeedbackSink> bridge_feedback_sink = nullptr;

    bool operator==(const Layer &b) {//相等判断，用于判断是否可以加入此层
        if(stream_id == b.stream_id && index == b.index) {
            return true;
        }
        return false;
    }

    std::string toJSON() const
    {
        Json::Value root;
        root["stream_id"] = stream_id;
        root["index"] = index;
        root["width"] = width;
        root["height"] = height;
        root["offset_x"] = off_x;
        root["offset_y"] = off_y;
        // root["audio_gain"] = audio_gain;
        root["video_ssrc"] = video_ssrc;
        root["audio_ssrc"] = audio_ssrc;
        root["bridge_stream"] = bridge_stream.toJsonValue();
        Json::FastWriter writer;
        return writer.write(root);
    }

    const Json::Value toJsonValue() const
    {
        Json::Value root;
        root["stream_id"] = stream_id;
        root["index"] = index;
        root["width"] = width;
        root["height"] = height;
        root["offset_x"] = off_x;
        root["offset_y"] = off_y;
        root["audio_gain"] = audio_gain;
        root["video_ssrc"] = video_ssrc;
        root["audio_ssrc"] = audio_ssrc;
        root["bridge_stream"]  = bridge_stream.toJsonValue();
        return root;
    }

    static int fromJSON(const std::string &json, Layer &layer)
    {
        Json::Value root;
        Json::Reader reader(Json::Features::strictMode());
        if (!reader.parse(json, root))
            return -1;

        RETURN_IF_CHECK_MEM_ERR(root, "stream_id", String, -2);
        RETURN_IF_CHECK_MEM_ERR(root, "index", Int, -3);
        RETURN_IF_CHECK_MEM_ERR(root, "width", Int, -4);
        RETURN_IF_CHECK_MEM_ERR(root, "height", Int, -5);
        RETURN_IF_CHECK_MEM_ERR(root, "offset_x", Int, -6);
        RETURN_IF_CHECK_MEM_ERR(root, "offset_y", Int, -7);

        layer.stream_id = root["stream_id"].asString();
        layer.index = root["index"].asInt();
        layer.width = root["width"].asInt();
        layer.height = root["height"].asInt();
        layer.off_x = root["offset_x"].asInt();
        layer.off_y = root["offset_y"].asInt();
        // layer.audio_gain = root["audio_gain"].asDouble();
        if(root.isMember("video_ssrc") && root["video_ssrc"].isUInt()) {
            layer.video_ssrc = root["video_ssrc"].asUInt();
        }
        
        if(root.isMember("audio_ssrc") && root["audio_ssrc"].isUInt()) {
            layer.audio_ssrc = root["audio_ssrc"].asUInt();
        }
        
        if(root.isMember("bridge_stream") && root["bridge_stream"].isObject()) {
            if(0 != BridgeStream::fromJSON(root["bridge_stream"], layer.bridge_stream)) {
                return -8;
            }
        }

        if(root.isMember("audio_gain") && root["audio_gain"].isDouble()) {
            layer.audio_gain = root["audio_gain"].asDouble();
        }
        return 0;
    }

    static int fromJSON(const Json::Value &root, Layer &layer)
    {
        RETURN_IF_CHECK_MEM_ERR(root, "stream_id", String, -2);
        RETURN_IF_CHECK_MEM_ERR(root, "index", Int, -3);
        RETURN_IF_CHECK_MEM_ERR(root, "width", Int, -4);
        RETURN_IF_CHECK_MEM_ERR(root, "height", Int, -5);
        RETURN_IF_CHECK_MEM_ERR(root, "offset_x", Int, -6);
        RETURN_IF_CHECK_MEM_ERR(root, "offset_y", Int, -7);

        layer.stream_id = root["stream_id"].asString();
        layer.index = root["index"].asInt();
        layer.width = root["width"].asInt();
        layer.height = root["height"].asInt();
        layer.off_x = root["offset_x"].asInt();
        layer.off_y = root["offset_y"].asInt();
        layer.audio_gain = root["audio_gain"].asDouble();
        if(root.isMember("video_ssrc") && root["video_ssrc"].isUInt()) {
            layer.video_ssrc = root["video_ssrc"].asUInt();
        }
        
        if(root.isMember("audio_ssrc") && root["audio_ssrc"].isUInt()) {
            layer.audio_ssrc = root["audio_ssrc"].asUInt();
        }
        
        if(root.isMember("bridge_stream") && root["bridge_stream"].isObject()) {
            if(0 != BridgeStream::fromJSON(root["bridge_stream"], layer.bridge_stream)) {
                return 1;
            }
        }

        if(root.isMember("audio_gain") && root["audio_gain"].isDouble()) {
            layer.audio_gain = root["audio_gain"].asDouble();
        }

        return 0;
    }
};

struct Mixer {
public:
    int64_t     appid;
    std::string id;
    std::string room_id;
    std::string org_client_id;//发起的client_id
    std::string client_id;
    std::string erizo_id;
    std::string agent_id;
    std::string agent_ip;
    std::string bridge_ip;
    uint16_t bridge_port;
    uint32_t video_ssrc;
    uint32_t audio_ssrc;
    uint32_t bitrate;//控制码率
    int width;//输出宽度
    int height;//输出高度
    std::vector<Layer> layers;

    std::string toJSON() const
    {
        Json::Value root;
        root["appid"] = appid;
        root["id"] = id;
        root["room_id"] = room_id;
        root["erizo_id"] = erizo_id;
        root["agent_id"] = agent_id;
        root["agent_ip"] = agent_ip;
        root["org_client_id"] = org_client_id;
        root["client_id"] = client_id;
        root["bridge_ip"] = bridge_ip;
        root["bridge_port"] = bridge_port;
        root["video_ssrc"] = video_ssrc;
        root["audio_ssrc"] = audio_ssrc;
        root["width"] = width;
        root["height"] = height;
        root["bitrate"] = bitrate;
        Json::Value j_layers;
        for (auto l : layers) {
            j_layers.append(l.toJsonValue());
        }
        root["layers"] = j_layers;
        Json::FastWriter writer;
        return writer.write(root);
    }

    const Json::Value toJsonValue() const
    {
        Json::Value root;
        root["appid"] = appid;
        root["id"] = id;
        root["room_id"] = room_id;
        root["erizo_id"] = erizo_id;
        root["agent_id"] = agent_id;
        root["agent_ip"] = agent_ip;
        root["org_client_id"] = org_client_id;
        root["client_id"] = client_id;
        root["bridge_ip"] = bridge_ip;
        root["bridge_port"] = bridge_port;
        root["video_ssrc"] = video_ssrc;
        root["audio_ssrc"] = audio_ssrc;
        root["width"] = width;
        root["height"] = height;
        root["bitrate"] = bitrate;
        Json::Value j_layers;
        for (auto l : layers) {
            j_layers.append(l.toJsonValue());
        }
        root["layers"] = j_layers;
        return root;
    }

    static int fromJSON(const std::string &json, Mixer &mixer)
    {
        Json::Value root;
        Json::Reader reader(Json::Features::strictMode());
        if (!reader.parse(json, root))
            return -1;

        RETURN_IF_CHECK_MEM_ERR(root, "appid", Int64, -1);
        RETURN_IF_CHECK_MEM_ERR(root, "id", String, -2);
        RETURN_IF_CHECK_MEM_ERR(root, "room_id", String, -3);
        RETURN_IF_CHECK_MEM_ERR(root, "erizo_id", String, -4);
        RETURN_IF_CHECK_MEM_ERR(root, "agent_id", String, -5);
        RETURN_IF_CHECK_MEM_ERR(root, "agent_ip", String, -6);
        RETURN_IF_CHECK_MEM_ERR(root, "org_client_id", String, -7);
        RETURN_IF_CHECK_MEM_ERR(root, "client_id", String, -8);
        RETURN_IF_CHECK_MEM_ERR(root, "bridge_ip", String, -9);
        RETURN_IF_CHECK_MEM_ERR(root, "bridge_port", Int, -10);
        RETURN_IF_CHECK_MEM_ERR(root, "video_ssrc", UInt, -11);
        RETURN_IF_CHECK_MEM_ERR(root, "audio_ssrc", UInt, -12);
        RETURN_IF_CHECK_MEM_ERR(root, "width", UInt, -13);
        RETURN_IF_CHECK_MEM_ERR(root, "height", UInt, -14);
        RETURN_IF_CHECK_MEM_ERR(root, "bitrate", UInt, -15);
        RETURN_IF_CHECK_MEM_ERR(root, "layers", Array, -16);

        mixer.appid = root["appid"].asInt64();
        mixer.id = root["id"].asString();
        mixer.room_id = root["room_id"].asString();
        mixer.erizo_id = root["erizo_id"].asString();
        mixer.agent_id = root["agent_id"].asString();
        mixer.agent_ip = root["agent_ip"].asString();
        mixer.org_client_id = root["org_client_id"].asString();
        mixer.client_id = root["client_id"].asString();
        mixer.bridge_ip = root["bridge_ip"].asString();
        mixer.bridge_port = root["bridge_port"].asInt();
        mixer.video_ssrc = root["video_ssrc"].asUInt();
        mixer.audio_ssrc = root["audio_ssrc"].asUInt();
        mixer.width = root["width"].asInt();
        mixer.height = root["height"].asInt();
        mixer.bitrate = root["bitrate"].asUInt();
        
        Json::Value layers = root["layers"];
        for(int i = 0; i < layers.size(); i++) {
            Layer l;
            int ret = Layer::fromJSON(layers[i], l);
            if(0 != ret) {
                printf("parse layer failed.\n");
                return ret - 16;
            }
            mixer.layers.emplace_back(std::move(l));
        }
        return 0;
    }

    static int fromJSON(const Json::Value &root, Mixer &mixer)
    {
        RETURN_IF_CHECK_MEM_ERR(root, "appid", Int64, -1);
        RETURN_IF_CHECK_MEM_ERR(root, "id", String, -2);
        RETURN_IF_CHECK_MEM_ERR(root, "room_id", String, -3);
        RETURN_IF_CHECK_MEM_ERR(root, "erizo_id", String, -4);
        RETURN_IF_CHECK_MEM_ERR(root, "agent_id", String, -5);
        RETURN_IF_CHECK_MEM_ERR(root, "agent_ip", String, -6);
        RETURN_IF_CHECK_MEM_ERR(root, "org_client_id", String, -7);
        RETURN_IF_CHECK_MEM_ERR(root, "client_id", String, -8);
        RETURN_IF_CHECK_MEM_ERR(root, "bridge_ip", String, -9);
        RETURN_IF_CHECK_MEM_ERR(root, "bridge_port", Int, -10);
        RETURN_IF_CHECK_MEM_ERR(root, "video_ssrc", UInt, -11);
        RETURN_IF_CHECK_MEM_ERR(root, "audio_ssrc", UInt, -12);
        RETURN_IF_CHECK_MEM_ERR(root, "width", UInt, -13);
        RETURN_IF_CHECK_MEM_ERR(root, "height", UInt, -14);
        RETURN_IF_CHECK_MEM_ERR(root, "bitrate", UInt, -15);
        RETURN_IF_CHECK_MEM_ERR(root, "layers", Array, -16);

        mixer.appid = root["appid"].asInt64();
        mixer.id = root["id"].asString();
        mixer.room_id = root["room_id"].asString();
        mixer.erizo_id = root["erizo_id"].asString();
        mixer.agent_id = root["agent_id"].asString();
        mixer.agent_ip = root["agent_ip"].asString();
        mixer.org_client_id = root["org_client_id"].asString();
        mixer.client_id = root["client_id"].asString();
        mixer.bridge_ip = root["bridge_ip"].asString();
        mixer.bridge_port = root["bridge_port"].asInt();
        mixer.video_ssrc = root["video_ssrc"].asUInt();
        mixer.audio_ssrc = root["audio_ssrc"].asUInt();
        mixer.width = root["width"].asInt();
        mixer.height = root["height"].asInt();
        mixer.bitrate = root["bitrate"].asUInt();

        Json::Value layers = root["layers"];
         for(int i = 0; i < layers.size(); i++) {
            Layer l;
            int ret = Layer::fromJSON(layers[i], l);
            if(0 != ret) {
                printf("parse layer failed.\n");
                return ret - 16;
            }
            mixer.layers.emplace_back(std::move(l));
        }

        return 0;
    }
};
#endif