#include "http_simple_client.h"

DEFINE_LOGGER(HttpSimpleClient, "HttpSimpleClient");
HttpSimpleClient::HttpSimpleClient() {
    timeout_ = false;
    requesting_ = false;
}

HttpSimpleClient::~HttpSimpleClient() {
    if(base_) {
        event_base_loopexit(base_, NULL);
    }
}

void HttpSimpleClient::request_succ_callback(struct evhttp_request *remote_resp, void *arg)
{
    HttpSimpleClient *http_client = (HttpSimpleClient*)arg;
    http_client->timeout_ = false;

    struct evkeyvalq *headers = evhttp_request_get_input_headers(remote_resp);
    struct evkeyval *header;
    std::map<std::string, std::string> headers_map;
    for (header = headers->tqh_first; header; header = header->next.tqe_next) {
        if(header->key && header->value) {
            headers_map.emplace(header->key, header->value);
        }
    }

    size_t len = evbuffer_get_length(remote_resp->input_buffer);
    uint8_t *data = new uint8_t[len];
    size_t read_len = evbuffer_copyout(remote_resp->input_buffer, data, len);
    if(read_len < len) {
        // ELOG_ERROR("evbuffer_copyout error, require=%d, out=%d", len, read_len);
        delete[] data;
        data = nullptr;
        return;
    }
    event_base_loopexit(http_client->base_, NULL);
    if(http_client->succ_cb_) {
        (*http_client->succ_cb_)(headers_map, data, read_len);
    }
    delete[] data;
    data = nullptr;
}

void HttpSimpleClient::request_error_callback(evhttp_request_error error, void *arg)
{
    HttpSimpleClient *http_client = (HttpSimpleClient*)arg;
    http_client->timeout_ = false;
    event_base_loopexit(http_client->base_, NULL);
    if(http_client->error_cb_) {
        if(error == EVREQ_HTTP_TIMEOUT) {
            (*http_client->error_cb_)("connection timeout");
        }
    }
}

void HttpSimpleClient::connection_close_callback(struct evhttp_connection *conn, void *arg)
{
    HttpSimpleClient *http_client = (HttpSimpleClient*)arg;
    http_client->timeout_ = false;
    event_base_loopexit(http_client->base_, NULL);
    if(http_client->error_cb_) {
        (*http_client->error_cb_)("connection closed");
    }
}

int HttpSimpleClient::post(const std::string &url, 
                           const std::map<std::string, std::string> &headers,
                           const std::string &post_data,
                           const std::function<void(const std::map<std::string, std::string> &headers, const uint8_t *data, size_t len)> &succ_cb,
                           const std::function<void(const std::string &error)> &error_cb,
                           const std::function<void()> &timeout_cb,
                           int32_t timeout_sec) 
{
    int ret = 0;
    if(requesting_) {//每次只接收一个请求，多个请求声明多个对象
        return -1;
    }
    
    struct evhttp_uri *uri = nullptr;
    struct evhttp_request *request = nullptr;
    struct evhttp_connection *connection = nullptr;
    do {
        requesting_ = true;
        uri = evhttp_uri_parse(url.c_str());
        if(!uri) {
            ELOG_ERROR("error http url:%s", url.c_str());
            ret = -1;
            break;
        }

        base_ = event_base_new();
        if(!base_) {
            ELOG_ERROR("event_base_new error!");
            ret = -2;
            break;
        }

        dnsbase_ = evdns_base_new(base_, 1);
        if(!dnsbase_) {
            ELOG_ERROR("evdns_base_new error!");
            ret = -3;
            break;
        }

        request = evhttp_request_new(HttpSimpleClient::request_succ_callback, this);
        if(!request) {
            ELOG_ERROR("evhttp_request_new error!");
            ret = -4;
            break;
        }

        evhttp_request_set_error_cb(request, HttpSimpleClient::request_error_callback);
        const char *host = evhttp_uri_get_host(uri);
        if(!host) {
            ELOG_ERROR("evhttp_uri_get_host error!");
            ret = -5;
            break;
        }

        int port = evhttp_uri_get_port(uri);
        if(port < 0) {
            port = 80;
        }

        const char *path = evhttp_uri_get_path(uri);
        if(path == NULL || strlen(path) == 0) {
            ELOG_ERROR("path error");
            ret = -6;
            break;
        }

        connection = evhttp_connection_base_new(base_, dnsbase_, host, port);
        if(!connection) {
            ELOG_ERROR("evhttp_connection_base_new error");
            ret = -7;
            break;
        }
        evhttp_connection_set_retries(connection, 2);

        if(timeout_sec != -1) {
            evhttp_connection_set_timeout(connection, timeout_sec);
        }

        evhttp_connection_set_closecb(connection, HttpSimpleClient::connection_close_callback, this);
        for(auto it : headers) {
            evhttp_add_header(evhttp_request_get_output_headers(request), it.first.c_str(), it.second.c_str());
        }
        
        evhttp_add_header(evhttp_request_get_output_headers(request), "Content-Length", std::to_string(post_data.size()).c_str());
        evhttp_add_header(evhttp_request_get_output_headers(request), "Host", host);
        evbuffer_add(request->output_buffer, post_data.data(), post_data.size());

        succ_cb_ = std::make_shared<std::function<void(const std::map<std::string, std::string> &headers, const uint8_t *data, size_t len)>>(succ_cb);
        error_cb_ = std::make_shared<std::function<void(const std::string &error)>>(error_cb);
        timeout_cb_ = std::make_shared<std::function<void()>>(timeout_cb);

        evhttp_make_request(connection, request, EVHTTP_REQ_POST, url.c_str());
        if(timeout_sec != -1) {
            timeout_ = true;
            struct timeval timeout;
            timeout.tv_sec = timeout_sec;
            timeout.tv_usec = 0;
            while(1) {
                event_base_loopexit(base_, &timeout);
                event_base_dispatch(base_);
                break;
            }
        } else {
            event_base_dispatch(base_);
        }
    } while(0);

    if(connection) {
        evhttp_connection_free(connection);
        connection = nullptr;
    }

    if(base_) {
        event_base_free(base_);
        base_ = nullptr;
    }
    if(dnsbase_) {
        evdns_base_free(dnsbase_, 0);
        dnsbase_ = nullptr;
    }

    if(uri) {
        evhttp_uri_free(uri);
        uri = nullptr;
    }

    if(timeout_) {
        if(timeout_cb_) {
            (*timeout_cb_)();
        }
    }

    requesting_ = false;
    return ret;
}


int HttpSimpleClient::get(const std::string &url, 
                           const std::map<std::string, std::string> &headers,
                           const std::function<void(const std::map<std::string, std::string> &headers, const uint8_t *data, size_t len)> &succ_cb,
                           const std::function<void(const std::string &error)> &error_cb,
                           const std::function<void()> &timeout_cb,
                           int32_t timeout_sec) 
{
    int ret = 0;
    if(requesting_) {//每次只接收一个请求，多个请求声明多个对象
        return -1;
    }
    
    struct evhttp_uri *uri = nullptr;
    struct evhttp_request *request = nullptr;
    struct evhttp_connection *connection = nullptr;
    do {
        requesting_ = true;
        uri = evhttp_uri_parse(url.c_str());
        if(!uri) {
            ELOG_ERROR("error http url:%s", url.c_str());
            ret = -1;
            break;
        }

        base_ = event_base_new();
        if(!base_) {
            ELOG_ERROR("event_base_new error!");
            ret = -2;
            break;
        }

        dnsbase_ = evdns_base_new(base_, 1);
        if(!dnsbase_) {
            ELOG_ERROR("evdns_base_new error!");
            ret = -3;
            break;
        }

        request = evhttp_request_new(HttpSimpleClient::request_succ_callback, this);
        if(!request) {
            ELOG_ERROR("evhttp_request_new error!");
            ret = -4;
            break;
        }

        evhttp_request_set_error_cb(request, HttpSimpleClient::request_error_callback);
        const char *host = evhttp_uri_get_host(uri);
        if(!host) {
            ELOG_ERROR("evhttp_uri_get_host error!");
            ret = -5;
            break;
        }

        int port = evhttp_uri_get_port(uri);
        if(port < 0) {
            port = 80;
        }

        const char *path = evhttp_uri_get_path(uri);
        if(path == NULL || strlen(path) == 0) {
            ELOG_ERROR("path error");
            ret = -6;
            break;
        }

        connection = evhttp_connection_base_new(base_, dnsbase_, host, port);
        if(!connection) {
            ELOG_ERROR("evhttp_connection_base_new error");
            ret = -7;
            break;
        }
        evhttp_connection_set_retries(connection, 2);

        if(timeout_sec != -1) {
            evhttp_connection_set_timeout(connection, timeout_sec);
        }

        evhttp_connection_set_closecb(connection, HttpSimpleClient::connection_close_callback, this);
        for(auto it : headers) {
            evhttp_add_header(evhttp_request_get_output_headers(request), it.first.c_str(), it.second.c_str());
        }
        
        evhttp_add_header(evhttp_request_get_output_headers(request), "Content-Length", 0);
        evhttp_add_header(evhttp_request_get_output_headers(request), "Host", host);

        succ_cb_ = std::make_shared<std::function<void(const std::map<std::string, std::string> &headers, const uint8_t *data, size_t len)>>(succ_cb);
        error_cb_ = std::make_shared<std::function<void(const std::string &error)>>(error_cb);
        timeout_cb_ = std::make_shared<std::function<void()>>(timeout_cb);

        evhttp_make_request(connection, request, EVHTTP_REQ_GET, url.c_str());
        if(timeout_sec != -1) {
            timeout_ = true;
            struct timeval timeout;
            timeout.tv_sec = timeout_sec;
            timeout.tv_usec = 0;
            while(1) {
                event_base_loopexit(base_, &timeout);
                event_base_dispatch(base_);
                break;
            }
        } else {
            event_base_dispatch(base_);
        }
    } while(0);

    if(connection) {
        evhttp_connection_free(connection);
        connection = nullptr;
    }

    if(base_) {
        event_base_free(base_);
        base_ = nullptr;
    }
    if(dnsbase_) {
        evdns_base_free(dnsbase_, 0);
        dnsbase_ = nullptr;
    }
    
    if(uri) {
        evhttp_uri_free(uri);
        uri = nullptr;
    }

    if(timeout_) {
        if(timeout_cb_) {
            (*timeout_cb_)();
        }
    }

    requesting_ = false;
    return ret;
}
