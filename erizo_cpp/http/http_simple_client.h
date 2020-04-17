#ifndef HTTP_SIMPLE_CLIENT_H
#define HTTP_SIMPLE_CLIENT_H

#include <map>
#include <atomic>
#include <memory>
#include <functional>
#include <string>

#include <logger.h>
#include <string.h>

#include "event2/http.h"
#include "event2/http_struct.h"
#include "event2/event.h"
#include "event2/buffer.h"
#include "event2/dns.h"
#include "event2/thread.h"
#include "evhttp.h"

class HttpSimpleClient {
    DECLARE_LOGGER();
public:
    HttpSimpleClient();
    virtual ~HttpSimpleClient();

public:
    int post(const std::string &url, 
             const std::map<std::string, std::string> &headers,
             const std::string &post_data,
             const std::function<void(const std::map<std::string, std::string> &headers, const uint8_t *data, size_t len)> &succ_cb,
             const std::function<void(const std::string &error)> &error_cb,
             const std::function<void()> &timeout_cb,
             int32_t timeout_sec = -1);

    int get(const std::string &url, 
            const std::map<std::string, std::string> &headers,
            const std::function<void(const std::map<std::string, std::string> &headers, const uint8_t *data, size_t len)> &succ_cb,
            const std::function<void(const std::string &error)> &error_cb,
            const std::function<void()> &timeout_cb,
            int32_t timeout_sec = -1);
private:
    static void request_succ_callback(struct evhttp_request *remote_resp, void *arg);
    static void request_error_callback(evhttp_request_error error, void *arg);
    static void connection_close_callback(struct evhttp_connection *conn, void *arg);
private:
    std::shared_ptr<std::function<void(const std::map<std::string, std::string> &headers, const uint8_t *data, size_t len)>> succ_cb_ = nullptr;
    std::shared_ptr<std::function<void(const std::string &error)>> error_cb_ = nullptr;
    std::shared_ptr<std::function<void()>> timeout_cb_ = nullptr;

    std::atomic<bool> timeout_;
private:
    struct event_base *base_;
    struct evdns_base *dnsbase_;
    std::atomic<bool> requesting_;
};

#endif