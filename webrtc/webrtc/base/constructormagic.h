/*
 *  Copyright 2004 The WebRTC Project Authors. All rights reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree. An additional intellectual property rights grant can be found
 *  in the file PATENTS.  All contributing project authors may
 *  be found in the AUTHORS file in the root of the source tree.
 */

#ifndef WEBRTC_BASE_CONSTRUCTORMAGIC_H_
#define WEBRTC_BASE_CONSTRUCTORMAGIC_H_

// Put this in the declarations for a class to be unassignable.
#ifndef RTC_DISALLOW_ASSIGN
#define RTC_DISALLOW_ASSIGN(TypeName) \
  void operator=(const TypeName&) = delete
#endif
// A macro to disallow the copy constructor and operator= functions. This should
// be used in the declarations for a class.
#ifndef LICODE_USE_NATIVE_MUTEX_ON_MAC
#define RTC_DISALLOW_COPY_AND_ASSIGN(TypeName) \
  TypeName(const TypeName&) = delete;          \
  RTC_DISALLOW_ASSIGN(TypeName)
#endif
// A macro to disallow all the implicit constructors, namely the default
// constructor, copy constructor and operator= functions.
//
// This should be used in the declarations for a class that wants to prevent
// anyone from instantiating it. This is especially useful for classes
// containing only static methods.
#ifndef RTC_DISALLOW_IMPLICIT_CONSTRUCTORS
#define RTC_DISALLOW_IMPLICIT_CONSTRUCTORS(TypeName) \
  TypeName() = delete;                               \
  RTC_DISALLOW_COPY_AND_ASSIGN(TypeName)
#endif
#endif  // WEBRTC_BASE_CONSTRUCTORMAGIC_H_
