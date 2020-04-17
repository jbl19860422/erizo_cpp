#ifndef FILE_RECORDER_H
#define FILE_RECORDER_H
#include <string>
#include <functional>
#include <memory>
#include <math.h>

class FileRecorder {
public:
    FileRecorder(){};
    virtual ~FileRecorder(){};
public:
    virtual int SetSPS(const uint8_t *sps, size_t len) = 0;
    virtual int SetPPS(const uint8_t *pps, size_t len) = 0;
    virtual int SetESConfig(const uint8_t *config, size_t len) = 0;
    virtual int CreateFile(const std::string &file) = 0;
    virtual int WriteH264Data(const uint8_t *nalu_data, size_t len, int64_t pts) = 0;
    virtual int WriteAACData(const uint8_t *nalu_data, size_t len, int64_t pts) = 0;
    virtual int CloseFile() = 0;

    virtual void onCreateFile(const std::function<void(const std::string &file, int64_t timestamp)> &create_file_cb);
    virtual void onDone(const std::function<void(const std::string &file, int64_t dur_video, int64_t dur_audio)> &done_cb);
    virtual void onUpdateInfo(const std::function<void(const std::string &file, const std::string &extra_info)> &update_info_cb);
protected:
    std::shared_ptr<std::function<void(const std::string &file, int64_t timestamp)>> create_file_cb_ = nullptr;
    std::shared_ptr<std::function<void(const std::string &file, int64_t dur_video, int64_t dur_audio)>> done_cb_ = nullptr;
    std::shared_ptr<std::function<void(const std::string &file, const std::string &extra_info)>> update_info_cb_ = nullptr;

    int64_t total_duration_ms_ = 0;
};

typedef  unsigned int UINT;
typedef  unsigned char BYTE;
typedef  unsigned long DWORD;
 
UINT Ue(BYTE *pBuff, UINT nLen, UINT &nStartBit);
int Se(BYTE *pBuff, UINT nLen, UINT &nStartBit);
DWORD u(UINT BitCount,BYTE * buf,UINT &nStartBit);
void de_emulation_prevention(BYTE *buf, unsigned int *buf_size);
bool h264_decode_sps(BYTE * buf,unsigned int nLen,int &width,int &height,int &fps);
bool decode_es_config(uint8_t *es, int &sample_rate, int &channel_num);
#endif