/*
* OneToManyProcessor.h
*/

#ifndef ERIZO_SRC_ERIZO_ONETOMANYPROCESSOR_H_
#define ERIZO_SRC_ERIZO_ONETOMANYPROCESSOR_H_

#include <map>
#include <string>
#include <future>  // NOLINT

#include "./MediaDefinitions.h"
#include "media/ExternalOutput.h"
#include "./logger.h"

namespace erizo {

class MediaStream;

/**
* Represents a One to Many connection.
* Receives media from one publisher and retransmits it to every subscriber.
*/
class OneToManyProcessor : public MediaSink, public FeedbackSink {
  DECLARE_LOGGER();

 public:
  std::map<std::string, std::shared_ptr<MediaSink>> subscribers;
  std::shared_ptr<MediaSource> publisher;

  OneToManyProcessor();
  virtual ~OneToManyProcessor();
  /**
  * Sets the Publisher
  * @param webRtcConn The MediaStream of the Publisher
  */
  void setPublisher(std::shared_ptr<MediaSource> publisher_stream);
  /**
  * Sets the subscriber
  * @param webRtcConn The MediaStream of the subscriber
  * @param peerId An unique Id for the subscriber
  */
  void addSubscriber(std::shared_ptr<MediaSink> subscriber_stream, const std::string& peer_id);
  /**
  * Eliminates the subscriber given its peer id
  * @param peerId the peerId
  */
  void removeSubscriber(const std::string& peer_id);
  /**
  * get the subscriber
  * @param peerId An unique Id for the subscriber
  */
  std::shared_ptr<MediaSink> getSubscriber(const std::string& peer_id);

  void close() override;

 private:
  typedef std::shared_ptr<MediaSink> sink_ptr;
  FeedbackSink* feedbackSink_;

  int deliverAudioData_(std::shared_ptr<DataPacket> audio_packet, const std::string &stream_id = "") override;
  int deliverVideoData_(std::shared_ptr<DataPacket> video_packet, const std::string &stream_id = "") override;
  int deliverFeedback_(std::shared_ptr<DataPacket> fb_packet, const std::string &stream_id = "") override;
  int deliverEvent_(MediaEventPtr event) override;
  void closeAll();
};

}  // namespace erizo
#endif  // ERIZO_SRC_ERIZO_ONETOMANYPROCESSOR_H_
