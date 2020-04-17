#!/usr/bin/env bash

set -e

SCRIPT=`pwd`/$0
FILENAME=`basename $SCRIPT`
PATHNAME=`dirname $SCRIPT`
ROOT=$PATHNAME
BUILD_DIR=$ROOT/3rdparty
CURRENT_DIR=`pwd`

LIB_DIR=$BUILD_DIR
ERIZO_BUILD_DIR=${ROOT}/build
PREFIX_DIR=$LIB_DIR/build
FAST_MAKE='-j4'

parse_arguments(){
  while [ "$1" != "" ]; do
    case $1 in
      "-c")
        CLEANUP=true
        ;;
    esac
    shift
  done
}

install_apt_deps(){
  sudo apt-get install -qq python-software-properties -y
  sudo apt-get install -qq software-properties-common -y
  sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
  #software
  #sudo apt-get install -qq git make gcc-5 g++-5 cmake pkg-config curl rabbitmq-server -y
  sudo apt-get install -qq pkg-config curl rabbitmq-server -y
  #boost 
  sudo apt-get install -qq libboost-regex-dev libboost-thread-dev libboost-system-dev libboost-test-dev -y
  #3rdparty
  sudo apt-get install -qq yasm libvpx-dev -y
  sudo apt-get install -qq libz-dev libssl-dev libglib2.0-dev liblog4cxx10-dev -y
}

install_openssl(){
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    curl -O -L https://github.com/openssl/openssl/archive/OpenSSL_1_0_2g.tar.gz
    tar -zxvf OpenSSL_1_0_2g.tar.gz
    cd openssl-OpenSSL_1_0_2g 
    ./config --prefix=$PREFIX_DIR --openssldir=$PREFIX_DIR -fPIC --shared
    make $FAST_MAKE -s V=0
    make install_sw
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_openssl
  fi
}

# install_openssl_new(){
#   if [ -d $LIB_DIR ]; then
#     cd $LIB_DIR
#     curl -O -L https://github.com/openssl/openssl/archive/OpenSSL_1_1_1a.tar.gz
#     tar -zxvf OpenSSL_1_0_2g.tar.gz
#     cd openssl-OpenSSL_1_0_2g 
#     ./config --prefix=$PREFIX_DIR --openssldir=$PREFIX_DIR -fPIC --shared
#     make $FAST_MAKE -s V=0
#     make install_sw
#     cd $CURRENT_DIR
#   else
#     mkdir -p $LIB_DIR
#     install_openssl
#   fi
# }



install_libnice(){
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    curl -OL https://nice.freedesktop.org/releases/libnice-0.1.4.tar.gz
    tar -zxvf libnice-0.1.4.tar.gz
    cd libnice-0.1.4
    patch -R ./agent/conncheck.c < $PATHNAME/misc/libnice-014.patch0
    ./configure --prefix=$PREFIX_DIR
    make $FAST_MAKE -s V=0
    make install
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_libnice
  fi
}

install_opus(){
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    curl -OL http://downloads.xiph.org/releases/opus/opus-1.1.tar.gz
    tar -zxvf opus-1.1.tar.gz
    cd opus-1.1
    ./configure --prefix=$PREFIX_DIR
    make $FAST_MAKE -s V=0
    make install
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_opus
  fi
  cd $CURRENT_DIR
}

# intall_fdk_aac() {
#   if [ -d $LIB_DIR ]; then
#     cd $LIB_DIR
#     curl -O -L https://downloads.sourceforge.net/opencore-amr/fdk-aac-2.0.0.tar.gz
#     tar -zxvf fdk-aac-2.0.0.tar.gz

#   else
# }

install_mediadeps(){
  install_opus
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    curl -O -L https://github.com/libav/libav/archive/v11.11.tar.gz
    tar -xvf v11.11.tar.gz
    cd libav-11.11
    PKG_CONFIG_PATH=${PREFIX_DIR}/lib/pkgconfig ./configure --prefix=$PREFIX_DIR --enable-gpl --enable-nonfree --enable-libfdk-aac --enable-shared --enable-libvpx --enable-libopus --disable-doc
    make $FAST_MAKE -s V=0
    make install
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_mediadeps
  fi
}

install_libsrtp(){
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    curl -o libsrtp-2.1.0.tar.gz https://codeload.github.com/cisco/libsrtp/tar.gz/v2.1.0
    tar -zxvf libsrtp-2.1.0.tar.gz
    cd libsrtp-2.1.0
    CFLAGS="-fPIC" ./configure --enable-openssl --prefix=$PREFIX_DIR --with-openssl-dir=$PREFIX_DIR
    make $FAST_MAKE -s V=0 && make uninstall && make install
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_libsrtp
  fi
}

install_libevent(){
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    curl -O -L https://github.com/libevent/libevent/releases/download/release-2.1.8-stable/libevent-2.1.8-stable.tar.gz
    tar -zxvf libevent-2.1.8-stable.tar.gz
    cd libevent-2.1.8-stable
    ./configure --prefix=$PREFIX_DIR
    make $FAST_MAKE -s V=0
    make install
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_libevent
  fi
}

install_librabbitmq(){
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    curl -O -L https://github.com/alanxz/rabbitmq-c/archive/v0.9.0.tar.gz
    tar -zxvf v0.9.0.tar.gz
    cd rabbitmq-c-0.9.0
    cmake -DCMAKE_INSTALL_PREFIX=$PREFIX_DIR .
    make $FAST_MAKE -s V=0
    make install
    mv $PREFIX_DIR/lib/x86_64-linux-gnu/lib* $PREFIX_DIR/lib 
    mv $PREFIX_DIR/lib/x86_64-linux-gnu/pkgconfig/* $PREFIX_DIR/lib/pkgconfig
    rm $PREFIX_DIR/lib/x86_64-linux-gnu -R
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_librabbitmq
  fi
}

install_uwebsocket(){
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    curl -O -L https://github.com/uNetworking/uWebSockets/archive/v0.14.8.tar.gz
    tar -zxvf v0.14.8.tar.gz
    cd uWebSockets-0.14.8
    make $FAST_MAKE -s V=0
    sudo make install
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_uwebsocket
  fi
}

install_jsoncpp(){
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    curl -O -L https://github.com/open-source-parsers/jsoncpp/archive/1.8.4.tar.gz
    tar -zxvf 1.8.4.tar.gz
    cd jsoncpp-1.8.4
    cmake -DCMAKE_INSTALL_PREFIX=$PREFIX_DIR .
    make $FAST_MAKE -s V=0
    make install
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_jsoncpp
  fi
}

install_acl(){
  if [ -d $LIB_DIR ]; then
    cd $LIB_DIR
    # curl -O -L https://github.com/acl-dev/acl/archive/acl.3.4.1.tar.gz
    # tar -zxvf acl.3.4.1.tar.gz
    cd acl-acl.3.4.1
    cd ./lib_acl
    make $FAST_MAKE -s V=0
    cp ./lib/libacl.a $PREFIX_DIR/lib
    cd ../lib_protocol
    make $FAST_MAKE -s V=0
    cp ./lib/libprotocol.a $PREFIX_DIR/lib
    cd ../lib_acl_cpp
    make $FAST_MAKE -s V=0
    cp ./lib/libacl_cpp.a $PREFIX_DIR/lib
    cp ./include/acl_cpp $PREFIX_DIR/include -a
    cd $CURRENT_DIR
  else
    mkdir -p $LIB_DIR
    install_acl
  fi
}

build_erizo(){
   touch erizo/media/mixers/StreamMixer.cpp
   if [ -d $ERIZO_BUILD_DIR ]; then
    cd $ERIZO_BUILD_DIR
    cmake ../
    make
    make install
    cd $CURRENT_DIR
    #rm $ERIZO_BUILD_DIR -rf
    rm ./install -rf
    mkdir install
    mkdir install/include
    cp $PREFIX_DIR/* -a  ./install
    echo "copy files................... `pwd`"
    cp ./install/lib/liberizo.so ../erizo_cpp/libdeps/lib
    cp `find ./erizo -name '*.h'` ./install/include/ --parent
    cd ./webrtc
    cp `find ./webrtc -name '*.h'` ../install/include/ --parent
    cd ..
    echo "build erizo_cpp............"
    cd ../erizo_cpp/
    ./autobuild
  else
    mkdir -p $ERIZO_BUILD_DIR
    build_erizo
  fi
}


cleanup(){
  rm ./3rdparty -rf
}

parse_arguments $*

mkdir -p $PREFIX_DIR

if [ "$CLEANUP" = "true" ]; then
  echo "Cleaning up..."
  cleanup
  exit 0
fi
rm -f 3rdparty/build/lib/liberizo.so
rm -f ./install/lib/liberizo.so
# install_apt_deps
# install_openssl
# install_libnice
# install_libsrtp
# install_libevent
# install_opus
#install_mediadeps
install_librabbitmq
# install_uwebsocket
# install_jsoncpp
# install_acl
# build_erizo
# rm ./temp -rf
# mkdir ./temp
# cp `find ./erizo -name *.h` ./temp --parent
# cp ./temp/erizo /test/cpp/erizo_cpp/libdeps/include/ -a
