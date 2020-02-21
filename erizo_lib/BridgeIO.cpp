#include "BridgeIO.h"
#include "BridgeMediaStream.h"

#include <arpa/inet.h>
#include <error.h>
#include <fcntl.h>

#include <event2/event.h>

#define UR_CLIENT_SOCK_BUF_SIZE (65536)
#define UR_SERVER_SOCK_BUF_SIZE (UR_CLIENT_SOCK_BUF_SIZE * 32)

namespace erizo
{
static int set_sock_buf_size(int fd, int sz)
{
    if (setsockopt(fd, SOL_SOCKET, SO_RCVBUF, (const void *)(&sz), (socklen_t)sizeof(sz)) < 0)
    {
        perror("SO_RCVBUF");
        return -1;
    }

    if (setsockopt(fd, SOL_SOCKET, SO_SNDBUF, (const void *)(&sz), (socklen_t)sizeof(sz)) < 0)
    {
        perror("SO_SNDBUF");
        return -1;
    }

    return 0;
}
static int socket_set_reusable(int fd, int flag)
{
    int ret;
    int on;

    on = flag;
    ret = setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, (const void *)&on, (socklen_t)sizeof(on));
    if (ret < 0)
    {
        perror("SO_REUSEADDR");
        return -1;
    }

    on = flag;
    ret = setsockopt(fd, SOL_SOCKET, SO_REUSEPORT, (const void *)&on, (socklen_t)sizeof(on));
    if (ret < 0)
    {
        perror("SO_REUSEPORT");
        return -1;
    }
    return 0;
}
static int addr_bind(int fd, const sockaddr_in *addr, int reusable)
{
    int ret;
    ret = socket_set_reusable(fd, reusable);
    if (ret < 0)
        return -1;

    do
    {
        ret = bind(fd, (const struct sockaddr *)addr, sizeof(struct sockaddr_in));
    } while (ret < 0 && errno == EINTR);
    if (ret < 0)
        perror("bind");

    return ret;
}

static int socket_set_nonblocking(int fd)
{
    if (fcntl(fd, F_SETFL, O_NONBLOCK) == -1)
    {
        perror("O_NONBLOCK");
        return -1;
    }
    return 0;
}

DEFINE_LOGGER(BridgeIO, "BridgeIO");

BridgeIO *BridgeIO::m_instance = nullptr;

BridgeIO *BridgeIO::getInstance()
{
    if (!m_instance)
        m_instance = new BridgeIO();
    return m_instance;
}

void BridgeIO::addStream(const std::string &stream_id, std::shared_ptr<BridgeMediaStream> stream)
{
    std::unique_lock<std::mutex>(m_streams_lock);
    m_streams[stream_id] = stream;
}

void BridgeIO::removeStream(const std::string &stream_id)
{
    std::unique_lock<std::mutex>(m_streams_lock);
    m_streams.erase(stream_id);
}

std::shared_ptr<BridgeMediaStream> BridgeIO::getStream(std::string &stream_id)
{
    std::unique_lock<std::mutex>(m_streams_lock);
    auto it = m_streams.find(stream_id);
    if (it != m_streams.end())
        return it->second;
    return nullptr;
}

void BridgeIO::onSend(const std::string &ip, uint16_t port, const std::string stream_id, std::shared_ptr<DataPacket> data_packet)
{
    std::shared_ptr<IOWorker> worker = m_io_thread_pool->getLessUsedIOWorker();

    worker->task([stream_id, data_packet, ip, port, this] {
        int ret;
        sockaddr_in sa;
        char *data;
        int length;

        memset(&sa, 0, sizeof(sockaddr_in));
        if (inet_pton(AF_INET, ip.c_str(), &sa.sin_addr) != 1)
        {
            ELOG_ERROR("message: convert address string to address structure failed");
            return;
        }

        sa.sin_family = AF_INET;
        sa.sin_port = htons(port);

        size_t hash_val = std::hash<std::string>{}(stream_id);
        int index = hash_val % m_thread_num;

        std::unique_lock<std::mutex>(*(m_sockfds_lock[index].get()));

        data = data_packet->data;
        length = data_packet->length;
        do
        {
            ret = ::sendto(m_sockfds[index], data, length, 0, (sockaddr *)&sa, sizeof(sockaddr_in));
        } while (ret < 0 && errno == EINTR);
    });
}

void BridgeIO::onRecv(char *data, int length)
{
    std::string stream_id(data, STREAM_ID_LEN);
    std::shared_ptr<BridgeMediaStream> stream = getStream(stream_id);
    if (stream == nullptr)
        return;
    stream->onRead(std::make_shared<DataPacket>(1, data, length, OTHER_PACKET));
}

int BridgeIO::create_udp_socket(const char *local_saddr, int local_port)
{
    int udp_fd;
    sockaddr_in local_addr;

    memset(&local_addr, 0, sizeof(sockaddr_in));
    if (inet_pton(AF_INET, local_saddr, &local_addr.sin_addr) != 1)
    {
        ELOG_ERROR("message: convert address string to address structure failed");
        return -1;
    }

    local_addr.sin_family = AF_INET;
    local_addr.sin_port = htons(local_port);

    udp_fd = socket(AF_INET, SOCK_DGRAM, 0);
    if (udp_fd < 0)
    {
        ELOG_ERROR("message: create socket failed,%s", strerror(errno));
        return -1;
    }
    if (set_sock_buf_size(udp_fd, UR_SERVER_SOCK_BUF_SIZE) < 0)
    {
        ELOG_ERROR("message: set socket buffer failed");
        return -1;
    }
    if (addr_bind(udp_fd, &local_addr, 1) < 0)
    {
        ELOG_ERROR("message: socket bind to local address failed");
        return -1;
    }

    if (socket_set_nonblocking(udp_fd) < 0)
    {
        ELOG_ERROR("message: socket set nonblocking failed");
        return -1;
    }

    return udp_fd;
}

static void input_handler(int fd, short what, void *arg)
{
    if (!(what & EV_READ))
        return;

    int ret;
    char buf[MTU_SIZE];

    do
    {
        ret = recv(fd, buf, MTU_SIZE, 0);
    } while (ret < 0 && errno == EINTR);

    if (ret > 0 && ret < MTU_SIZE)
    {
        BridgeIO::getInstance()->onRecv(buf, ret);
    }
}

BridgeIO::BridgeIO()
{
    m_thread_num = 0;
    m_io_thread_pool = nullptr;
    m_run = false;
    m_init = false;
}

int BridgeIO::init(const std::string &ip, uint16_t port, int thread_num)
{
    if (m_init)
        return 0;

    m_thread_num = thread_num;

    m_io_thread_pool = std::make_shared<erizo::IOThreadPool>(thread_num);
    m_io_thread_pool->start();

    m_threads.resize(thread_num);
    m_sockfds.resize(thread_num);
    m_sockfds_lock.resize(thread_num);

    m_run = true;
    for (int i = 0; i < thread_num; i++)
    {
        m_sockfds[i] = create_udp_socket(ip.c_str(), port);
        if (!m_sockfds[i])
        {
            ELOG_ERROR("create socket failed,%s", strerror(errno));
            return 1;
        }
        m_sockfds_lock[i] = std::unique_ptr<std::mutex>(new std::mutex());
        m_threads[i] = std::unique_ptr<std::thread>(new std::thread([this, i] {
            event_config *cfg = event_config_new();
            event_config_set_flag(cfg, EVENT_BASE_FLAG_EPOLL_USE_CHANGELIST);
            event_base *base = event_base_new_with_config(cfg);
            event *udp_ev = event_new(base, m_sockfds[i], EV_READ | EV_PERSIST, input_handler, NULL);
            event_add(udp_ev, NULL);
            while (m_run)
            {
                timeval timeout;
                timeout.tv_sec = 0;
                timeout.tv_usec = 100000;
                event_base_loopexit(base, &timeout);
                event_base_dispatch(base);
            }
            event_base_free(base);
        }));
    }
    return 0;
}

void BridgeIO::close()
{
    if (!m_init)
        return;

    m_run = false;
    for (int i = 0; i < m_thread_num; i++)
    {
        m_threads[i]->join();
        m_threads[i].reset();
        m_threads[i] = nullptr;
        ::close(m_sockfds[i]);
    }

    m_io_thread_pool->close();
    m_io_thread_pool.reset();
    m_io_thread_pool = nullptr;

    m_init = false;
}

BridgeIO::~BridgeIO()
{
    close();
}
} // namespace erizo