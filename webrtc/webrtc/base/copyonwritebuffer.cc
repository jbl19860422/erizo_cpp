/*
 *  Copyright 2016 The WebRTC Project Authors. All rights reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree. An additional intellectual property rights grant can be found
 *  in the file PATENTS.  All contributing project authors may
 *  be found in the AUTHORS file in the root of the source tree.
 */

#include "webrtc/base/copyonwritebuffer.h"
namespace licode {
namespace rtc {

CopyOnWriteBuffer::CopyOnWriteBuffer() {
  LICODE_RTC_DCHECK(IsConsistent());
}

CopyOnWriteBuffer::CopyOnWriteBuffer(const CopyOnWriteBuffer& buf)
    : buffer_(buf.buffer_) {
}

CopyOnWriteBuffer::CopyOnWriteBuffer(CopyOnWriteBuffer&& buf)
    : buffer_(std::move(buf.buffer_)) {
}

CopyOnWriteBuffer::CopyOnWriteBuffer(size_t size)
    : buffer_(size > 0 ? new RefCountedObject<Buffer>(size) : nullptr) {
  LICODE_RTC_DCHECK(IsConsistent());
}

CopyOnWriteBuffer::CopyOnWriteBuffer(size_t size, size_t capacity)
    : buffer_(size > 0 || capacity > 0
          ? new RefCountedObject<Buffer>(size, capacity)
          : nullptr) {
  LICODE_RTC_DCHECK(IsConsistent());
}

CopyOnWriteBuffer::~CopyOnWriteBuffer() = default;

bool CopyOnWriteBuffer::operator==(const CopyOnWriteBuffer& buf) const {
  // Must either use the same buffer internally or have the same contents.
  LICODE_RTC_DCHECK(IsConsistent());
  LICODE_RTC_DCHECK(buf.IsConsistent());
  return buffer_.get() == buf.buffer_.get() ||
      (buffer_.get() && buf.buffer_.get() &&
      *buffer_.get() == *buf.buffer_.get());
}

void CopyOnWriteBuffer::SetSize(size_t size) {
  LICODE_RTC_DCHECK(IsConsistent());
  if (!buffer_) {
    if (size > 0) {
      buffer_ = new RefCountedObject<Buffer>(size);
    }
    LICODE_RTC_DCHECK(IsConsistent());
    return;
  }

  // Clone data if referenced.
  if (!buffer_->HasOneRef()) {
    buffer_ = new RefCountedObject<Buffer>(
        buffer_->data(),
        std::min(buffer_->size(), size),
        std::max(buffer_->capacity(), size));
  }
  buffer_->SetSize(size);
  LICODE_RTC_DCHECK(IsConsistent());
}

void CopyOnWriteBuffer::EnsureCapacity(size_t capacity) {
  LICODE_RTC_DCHECK(IsConsistent());
  if (!buffer_) {
    if (capacity > 0) {
      buffer_ = new RefCountedObject<Buffer>(0, capacity);
    }
    LICODE_RTC_DCHECK(IsConsistent());
    return;
  } else if (capacity <= buffer_->capacity()) {
    return;
  }

  CloneDataIfReferenced(std::max(buffer_->capacity(), capacity));
  buffer_->EnsureCapacity(capacity);
  LICODE_RTC_DCHECK(IsConsistent());
}

void CopyOnWriteBuffer::Clear() {
  if (!buffer_)
    return;

  if (buffer_->HasOneRef()) {
    buffer_->Clear();
  } else {
    buffer_ = new RefCountedObject<Buffer>(0, buffer_->capacity());
  }
  LICODE_RTC_DCHECK(IsConsistent());
}

void CopyOnWriteBuffer::CloneDataIfReferenced(size_t new_capacity) {
  if (buffer_->HasOneRef()) {
    return;
  }

  buffer_ = new RefCountedObject<Buffer>(buffer_->data(), buffer_->size(),
      new_capacity);
  LICODE_RTC_DCHECK(IsConsistent());
}



}  // namespace rtc
}// namespace licode
