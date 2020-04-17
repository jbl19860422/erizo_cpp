cmake_minimum_required(VERSION 2.6)

find_package(PkgConfig)
#functions
function(test_lib LIB_NAME)
  if (${LIB_NAME} MATCHES "^.*-NOTFOUND")
    message(FATAL_ERROR "lib not found: " ${LIB_NAME} " check README")
    return()
  endif(${LIB_NAME} MATCHES "^.*-NOTFOUND")
endfunction(test_lib)

project (ERIZO_ALL)

if ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "GNU")
  execute_process(COMMAND ${CMAKE_C_COMPILER} -dumpversion
    OUTPUT_VARIABLE GCC_VERSION)
  if (GCC_VERSION VERSION_LESS 5)
    message(FATAL_ERROR "gcc version must be >= 5 and is ${GCC_VERSION}")
  endif()

  execute_process(COMMAND ${CMAKE_CXX_COMPILER} -dumpversion
    OUTPUT_VARIABLE CXX_VERSION)
  if (CXX_VERSION VERSION_LESS 5)
    message(FATAL_ERROR "g++ version must be >= 5 and is ${CXX_VERSION}")
  endif()
endif()

option (COMPILE_EXAMPLES "COMPILE_EXAMPLES" OFF)

include(3rd.cmake)
set(CMAKE_MACOSX_RPATH 1)
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_CURRENT_SOURCE_DIR}/cmake/")
set(CMAKE_INSTALL_PREFIX "${CMAKE_BINARY_DIR}")
SET(CMAKE_BUILD_WITH_INSTALL_RPATH TRUE) 
SET(CMAKE_INSTALL_RPATH "../lib")
#global variable
set(THIRD_PARTY_INCLUDE "${CMAKE_BINARY_DIR}/include/" "${CMAKE_BINARY_DIR}/include/webrtc_inc" "${CMAKE_BINARY_DIR}/include/webrtc_inc/third_party/abseil-cpp")
set(THIRD_PARTY_LIB "${CMAKE_BINARY_DIR}/lib/")
## Depencencies

# GLIB
find_package(Glib REQUIRED)
include_directories(${GLIB_INCLUDE_DIRS})

# BOOST
# set (BOOST_LIBS thread regex system)
# find_package(Boost COMPONENTS ${BOOST_LIBS} REQUIRED)

# GTHREAD
find_library(GTHREAD gthread-2.0 HINTS "${THIRD_PARTY_LIB}")
test_lib(${GTHREAD})

# SRTP
# find_library(SRTP srtp2 HINTS "${THIRD_PARTY_LIB}")
# test_lib(${SRTP})

# NICE
# find_library(NICE nice HINTS "${THIRD_PARTY_LIB}")
# test_lib(${NICE})

# OPENSSL
# find_library(SSL ssl HINTS "${THIRD_PARTY_LIB}")
# test_lib(${SSL})
# find_library(CRYPTO crypto HINTS "${THIRD_PARTY_LIB}")
# test_lib(${CRYPTO})

# Rabbitmq
# find_library(RABBITMQ rabbitmq HINTS "${THIRD_PARTY_LIB}")
# test_lib(${RABBITMQ})

# nrappkit
find_library(NRAPPKIT nrappkit HINTS "${THIRD_PARTY_LIB}")
test_lib(${NRAPPKIT})

# Event
# find_library(EVENT event HINTS "${THIRD_PARTY_LIB}")
# test_lib(${EVENT})

# Libav
# find_library(AVUTIL avutil HINTS "${THIRD_PARTY_LIB}")
# test_lib(${AVUTIL})
# set (LIBS ${AVUTIL})
# find_library(AVCODEC avcodec HINTS "${THIRD_PARTY_LIB}")
# test_lib(${AVCODEC})
# set (LIBS ${LIBS} ${AVCODEC})
# find_library(AVFORMAT avformat HINTS "${THIRD_PARTY_LIB}")
# test_lib(${AVFORMAT})
# set (LIBS ${LIBS} ${AVFORMAT})

# LOG4CXX
# find_library(LOG log4cxx)
# test_lib(${LOG})

# WEBRTC
include("${CMAKE_CURRENT_SOURCE_DIR}/cmake/webrtc.cmake")

# nrappkit
include("${CMAKE_CURRENT_SOURCE_DIR}/cmake/nrappkit.cmake")

# Erizo lib
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/erizo_lib")
# Erizo cpp
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/erizo_cpp")
