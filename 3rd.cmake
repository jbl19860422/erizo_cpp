include(ExternalProject)

ExternalProject_Add(libboost
    EXCLUDE_FROM_ALL 1
    URL https://nchc.dl.sourceforge.net/project/boost/boost/1.58.0/boost_1_58_0.tar.gz
    BUILD_IN_SOURCE 1
    CONFIGURE_COMMAND ./bootstrap.sh --prefix=${PROJECT_BINARY_DIR}
    BUILD_COMMAND ./b2 cxxflags="--std=c++11" -j4 install
    INSTALL_COMMAND ""
)

ExternalProject_Add(libopenssl
    EXCLUDE_FROM_ALL 1
    URL https://github.com/openssl/openssl/archive/OpenSSL_1_1_0.tar.gz
    BUILD_IN_SOURCE 1
    CONFIGURE_COMMAND ./config --prefix=${PROJECT_BINARY_DIR} --openssldir=${PROJECT_BINARY_DIR} -fPIC --shared
    BUILD_COMMAND make -j4 -s V=0
    INSTALL_COMMAND make install
)

ExternalProject_Add(libsrtp
    DEPENDS libopenssl
    EXCLUDE_FROM_ALL 1
    DOWNLOAD_NAME libsrtp-2.1.0.tar.gz
    URL https://codeload.github.com/cisco/libsrtp/tar.gz/v2.1.0
    BUILD_IN_SOURCE 1
    CONFIGURE_COMMAND ./configure CFLAGS=-fPIC --enable-openssl --prefix=${PROJECT_BINARY_DIR} --with-openssl-dir=${PROJECT_BINARY_DIR}
    BUILD_COMMAND make -j4 -s V=0
    INSTALL_COMMAND make install
)

ExternalProject_Add(libnice
    EXCLUDE_FROM_ALL 1
    URL https://nice.freedesktop.org/releases/libnice-0.1.4.tar.gz
    BUILD_IN_SOURCE 1
    PATCH_COMMAND patch -R ./agent/conncheck.c < ${CMAKE_SOURCE_DIR}/misc/libnice-014.patch0
    CONFIGURE_COMMAND ./configure --prefix=${PROJECT_BINARY_DIR}
    BUILD_COMMAND make -j4 -s V=0
    INSTALL_COMMAND make install
)

ExternalProject_Add(libopus
    EXCLUDE_FROM_ALL 1
    URL http://downloads.xiph.org/releases/opus/opus-1.1.tar.gz
    BUILD_IN_SOURCE 1
    CONFIGURE_COMMAND ./configure --prefix=${PROJECT_BINARY_DIR}
    BUILD_COMMAND make -j4 -s V=0
    INSTALL_COMMAND make install
)

# ExternalProject_Add(libav
#     EXCLUDE_FROM_ALL 1
#     URL https://github.com/libav/libav/archive/v11.11.tar.gz
#     BUILD_IN_SOURCE 1
#     CONFIGURE_COMMAND PKG_CONFIG_PATH=${PROJECT_BINARY_DIR}/lib/pkgconfig ./configure --prefix=${PROJECT_BINARY_DIR} --enable-gpl --enable-nonfree --enable-libfdk-aac --enable-shared --enable-libvpx --enable-libopus --disable-doc
#     BUILD_COMMAND make 
#     INSTALL_COMMAND make install
# )

ExternalProject_Add(libffmpeg
    EXCLUDE_FROM_ALL 1
    URL https://github.com/FFmpeg/FFmpeg/archive/n4.1.tar.gz
    BUILD_IN_SOURCE 1
    PATCH_COMMAND patch ./libavutil/common.h < ${CMAKE_SOURCE_DIR}/misc/ffmpeg_patch/common.patch
    CONFIGURE_COMMAND PKG_CONFIG_PATH=${PROJECT_BINARY_DIR}/lib/pkgconfig ./configure --prefix=${PROJECT_BINARY_DIR} --enable-gpl --enable-nonfree --enable-libfdk-aac --enable-shared --enable-libvpx --enable-libopus --disable-doc
    BUILD_COMMAND make -j4
    INSTALL_COMMAND make install
)

ExternalProject_Add(libevent
    EXCLUDE_FROM_ALL 1
    URL https://github.com/libevent/libevent/releases/download/release-2.1.8-stable/libevent-2.1.8-stable.tar.gz
    BUILD_IN_SOURCE 1
    CONFIGURE_COMMAND ./configure --prefix=${PROJECT_BINARY_DIR}
    BUILD_COMMAND make -j4 -s V=0
    INSTALL_COMMAND make install
)

ExternalProject_Add(librocketmq
    EXCLUDE_FROM_ALL 1
    URL https://github.com/alanxz/rabbitmq-c/archive/v0.9.0.tar.gz
    BUILD_IN_SOURCE 1
    CONFIGURE_COMMAND cmake -DCMAKE_INSTALL_PREFIX=${PROJECT_BINARY_DIR} .
    BUILD_COMMAND make -j4 -s V=0
    INSTALL_COMMAND make install
)

ExternalProject_Add(libjsoncpp
    EXCLUDE_FROM_ALL 1
    URL https://github.com/open-source-parsers/jsoncpp/archive/1.8.4.tar.gz
    BUILD_IN_SOURCE 1
    CONFIGURE_COMMAND cmake -DCMAKE_INSTALL_PREFIX=${PROJECT_BINARY_DIR} .
    BUILD_COMMAND make -j4 -s V=0
    INSTALL_COMMAND make install
)

ExternalProject_Add(libmp4v2
    EXCLUDE_FROM_ALL 1
    URL https://github.com/TechSmith/mp4v2/archive/Release-MP4v2-3.0.2.0.tar.gz
    BUILD_IN_SOURCE 1
    CONFIGURE_COMMAND ./configure --prefix=${PROJECT_BINARY_DIR} CXXFLAGS=-fpermissive CFLAGS=-fpermissive
    BUILD_COMMAND make
    INSTALL_COMMAND make install
)

set(LOG4CXX_PATCH_DIR ${CMAKE_SOURCE_DIR}/misc/log4cxx_patch)
ExternalProject_Add(liblog4cxx
    EXCLUDE_FROM_ALL 1
    URL https://github.com/apache/logging-log4cxx/archive/v0_10_0.tar.gz
    BUILD_IN_SOURCE 1
    PATCH_COMMAND patch ./src/main/include/log4cxx/private/Makefile.am < ${LOG4CXX_PATCH_DIR}/log4cxx_private_Makefile.am.patch && patch ./src/main/include/log4cxx/Makefile.am < ${LOG4CXX_PATCH_DIR}/log4cxx_Makefile.am.patch && patch ./src/examples/cpp/console.cpp < ${LOG4CXX_PATCH_DIR}/log4cxx_console.cpp.patch && patch ./src/main/cpp/inputstreamreader.cpp < ${LOG4CXX_PATCH_DIR}/log4cxx_inputstreamreader.cpp.patch && patch ./src/main/cpp/socketoutputstream.cpp < ${LOG4CXX_PATCH_DIR}/log4cxx_socketoutputstream.cpp.patch
    CONFIGURE_COMMAND ./autogen.sh && ./configure --prefix=${PROJECT_BINARY_DIR} CXXFLAGS=-Wno-narrowing
    BUILD_COMMAND make -j4
    INSTALL_COMMAND make install
)

