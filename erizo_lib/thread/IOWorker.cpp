#include "thread/IOWorker.h"

extern "C" {
#include <r_errors.h>
#include <async_wait.h>
#include <async_timer.h>
}

#include <chrono>  // NOLINT

using erizo::IOWorker;

IOWorker::IOWorker() : started_{false}, closed_{false} {
}

IOWorker::~IOWorker() {
  close();
}

void IOWorker::start() {
  auto promise = std::make_shared<std::promise<void>>();
  start(promise);
}

void IOWorker::start(std::shared_ptr<std::promise<void>> start_promise) {
  if (started_.exchange(true)) {
    return;
  }

  thread_ = std::unique_ptr<std::thread>(new std::thread([this, start_promise] {
    pthread_setname_np(pthread_self(), "erizo_io_worker");
    start_promise->set_value();
    while (!closed_) {
      std::vector<Task> tasks;
      {
        std::unique_lock<std::mutex> lk(task_mutex_);
        task_cond_.wait_for(lk, std::chrono::milliseconds(1000));
        if(tasks_.size() <= 0) {
          continue;
        }
        
        {
          tasks.swap(tasks_);
        }
      }
      
      for (Task &task : tasks) {
        task();
      }
    }
  }));
}

void IOWorker::task(Task f) {
  std::unique_lock<std::mutex> lock(task_mutex_);
  tasks_.push_back(f);
  task_cond_.notify_one();
}

void IOWorker::close() {
  if (!closed_.exchange(true)) {
    task_cond_.notify_one();
    if (thread_ != nullptr) {
      thread_->join();
    }
    tasks_.clear();
  }
}
