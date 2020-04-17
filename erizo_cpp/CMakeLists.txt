cmake_minimum_required(VERSION 2.8)

project (ERIZO_CPP)

set(ERIZO_CPP_VERSION_MAJOR 0)
set(ERIZO_CPP_VERSION_MINOR 1)
set(CMAKE_CXX_FLAGS "-g -Wall -gdwarf-2 -gstrict-dwarf -DWEBRTC_POSIX -DWEBRTC_LINUX -Wno-deprecated-declarations -DDEBUG -std=c++11 ${ERIZO_CPP_CMAKE_CXX_FLAGS}")

# rpath
set(CMAKE_SKIP_BUILD_RPATH FALSE)                 # 编译时加上RPATH  
set(CMAKE_BUILD_WITH_INSTALL_RPATH TRUE)          # 编译时RPATH不使用安装的RPATH  
set(CMAKE_INSTALL_RPATH "${CMAKE_BINARY_DIR}/lib")                       # 安装RPATH为空  
set(CMAKE_INSTALL_RPATH_USE_LINK_PATH TRUE)       # 安装的执行文件加上RPATH
# include, link
include_directories("${ERIZO_CPP_SOURCE_DIR}" "${CMAKE_BINARY_DIR}/include")
link_directories("${CMAKE_BINARY_DIR}/lib")
link_directories("${CMAKE_BINARY_DIR}/lib/x86_64-linux-gnu")

file(GLOB_RECURSE ERIZO_CPP_SOURCES "${ERIZO_CPP_SOURCE_DIR}/*.h" "${ERIZO_CPP_SOURCE_DIR}/*.c" "${ERIZO_CPP_SOURCE_DIR}/*.cpp" "${ERIZO_CPP_SOURCE_DIR}/*.cc")

add_executable(erizo_cpp ${ERIZO_CPP_SOURCES})

#target_link_libraries(erizo_cpp erizo rabbitmq log4cxx pthread jsoncpp boost_system mysqlcppconn event_core event_extra webrtc X11 webrtcall ffmpeg boringssl apr-1 aprutil-1 opencv_core opencv_imgproc)

# target_link_libraries(erizo_cpp erizo rabbitmq pthread log4cxx jsoncpp boost_system fdk-aac event_core event_extra webrtc X11 webrtcall apr-1 aprutil-1 opencv_core opencv_imgproc avcodec ssl crypto)

add_dependencies(erizo_cpp
    erizo
)

target_link_libraries(erizo_cpp 
    erizo 
    rabbitmq 
    pthread 
    log4cxx
    jsoncpp
)

install(TARGETS erizo_cpp RUNTIME DESTINATION bin)

