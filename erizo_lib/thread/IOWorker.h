#ifndef ERIZO_SRC_ERIZO_THREAD_IOWORKER_H_
#define ERIZO_SRC_ERIZO_THREAD_IOWORKER_H_

#include <atomic>
#include <memory>
#include <mutex>  // NOLINT
#include <future>  // NOLINT
#include <thread>  // NOLINT
#include <vector>
#include <condition_variable>

namespace erizo {

class IOWorker : public std::enable_shared_from_this<IOWorker> {
 public:
  typedef std::function<void()> Task;
  IOWorker();
  ~IOWorker();

  virtual void start();
  virtual void start(std::shared_ptr<std::promise<void>> start_promise);
  virtual void close();

  virtual void task(Task f);

 private:
  std::atomic<bool> started_;
  std::atomic<bool> closed_;
  std::unique_ptr<std::thread> thread_;
  std::vector<Task> tasks_;
  mutable std::mutex task_mutex_;
  std::condition_variable task_cond_;
};
}  // namespace erizo

#endif  // ERIZO_SRC_ERIZO_THREAD_IOWORKER_H_
