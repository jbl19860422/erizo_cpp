cmake_minimum_required(VERSION 2.8)

project (ERIZO_LIB)

set(ERIZO_LIB_VERSION_MAJOR 0)
set(ERIZO_LIB_VERSION_MINOR 1)

set(CMAKE_CXX_FLAGS "-g -Wall -gdwarf-2 -gstrict-dwarf -std=c++11 -DWEBRTC_APM_DEBUG_DUMP=0 -DWEBRTC_LINUX -DWEBRTC_POSIX -Wno-error=write-strings -Wno-error=unused-but-set-variable -Wno-error=sign-compare -Wno-error=deprecated-declarations -Wno-deprecated-declarations -Wno-error=unused-variable -Wno-error=class-memaccess -Wno-error=parentheses -Wno-error=format= -Wno-error=unused-value -Wno-error=delete-non-virtual-dtor ${ERIZO_CMAKE_CXX_FLAGS} -L${CMAKE_BINARY_DIR}/lib")

include_directories("${ERIZO_LIB_SOURCE_DIR}" "${CMAKE_BINARY_DIR}/include" "${CMAKE_BINARY_DIR}/include/webrtc_inc" "${CMAKE_BINARY_DIR}/include/webrtc_inc/third_party/abseil-cpp" "${NRAPPKIT_INCLUDE}" "/usr/local/include/opencv4")
link_directories("${CMAKE_BINARY_DIR}/lib")
# rpath
set(CMAKE_SKIP_BUILD_RPATH FALSE)                 # 编译时加上RPATH  
set(CMAKE_BUILD_WITH_INSTALL_RPATH FALSE)         # 编译时RPATH不使用安装的RPATH  
set(CMAKE_INSTALL_RPATH ${CMAKE_BINARY_DIR}/lib)  # 安装RPATH为空  
set(CMAKE_INSTALL_RPATH_USE_LINK_PATH TRUE)       # 安装的执行文件加上RPATH

# link_directories("${THIRD_PARTY_LIB}")

file(GLOB_RECURSE ERIZO_LIB_SOURCES "${ERIZO_LIB_SOURCE_DIR}/*.h" "${ERIZO_LIB_SOURCE_DIR}/*.c" "${ERIZO_LIB_SOURCE_DIR}/*.cpp" "${ERIZO_LIB_SOURCE_DIR}/*.cc")

add_library(erizo SHARED ${ERIZO_LIB_SOURCES})

add_dependencies(erizo
    webrtc
    libboost
    libopenssl
    libnice
    libopus
    libsrtp
    libevent
    librocketmq
    libjsoncpp
    libmp4v2
    liblog4cxx
    libffmpeg
)

target_include_directories(erizo
    PUBLIC ${ERIZO_LIB_SOURCE_DIR}
    PUBLIC ${THIRD_PARTY_INCLUDE}
)

target_link_libraries(erizo
    PUBLIC webrtc
    ssl
    crypto
    log4cxx
    boost_system
    boost_thread
    event
    webrtcall_abi
    webrtc
    mp4v2
    avutil
    avcodec
    avformat
    nice
    X11             
    opencv_core     #重新编译
    opencv_imgproc  #重新编译
    ${GLIB_LIBRARIES} 
)

install(TARGETS erizo LIBRARY DESTINATION lib)
