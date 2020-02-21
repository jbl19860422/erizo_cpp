#ifndef ERIZO_BRIDGE_IO_H
#define ERIZO_BRIDGE_IO_H

#include "thread/IOThreadPool.h"
#include "MediaDefinitions.h"
#include "./logger.h"

#define MTU_SIZE 1500
#define STREAM_ID_LEN 18

namespace erizo
{

class BridgeMediaStream;

class BridgeIO
{
  DECLARE_LOGGER();

public:
  static BridgeIO *getInstance();
  ~BridgeIO();

  void addStream(const std::string &stream_id, std::shared_ptr<BridgeMediaStream> stream);
  void removeStream(const std::string &stream_id);
  std::shared_ptr<BridgeMediaStream> getStream(std::string &stream_id);

  void onSend(const std::string &ip,uint16_t port,const std::string stream_id,std::shared_ptr<DataPacket> data_packet);
  void onRecv(char *data, int length);

  int init(const std::string &ip, uint16_t port, int thread_num);
  void close();

private:
  BridgeIO();
  int create_udp_socket(const char *local_saddr, int local_port);

private:
  std::vector<std::unique_ptr<std::thread>> m_threads;
  std::vector<std::unique_ptr<std::mutex>> m_sockfds_lock;
  std::vector<int> m_sockfds;
  std::map<std::string, std::shared_ptr<BridgeMediaStream>> m_streams;
  std::mutex m_streams_lock;

  int m_thread_num;
  std::shared_ptr<IOThreadPool> m_io_thread_pool;
  std::atomic<bool> m_run;
  bool m_init;
  
  static BridgeIO *m_instance;
};
} // namespace erizo
#endif