import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Video.css';

class Video extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate() {
    this.videoRef.current.load();
  }

  render() {
    const { video, clips, selectedClip } = this.props;
    const selectedClipInfo = clips[selectedClip];
    return (
      <div className="embed-responsive embed-responsive-16by9">
        <video ref={this.videoRef} controls className="embed-responsive-item">
          <source src={`${video.src}#t=${selectedClipInfo.startTime},${selectedClipInfo.endTime}`} type="video/mp4" />
        </video>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  video: state.video,
  selectedClip: state.selectedClip,
  clips: state.clips
});

export default connect(mapStateToProps)(Video);
