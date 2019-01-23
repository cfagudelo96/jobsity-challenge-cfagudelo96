import React, { Component } from 'react';
import { connect } from 'react-redux';

import { playPreviousClip, playNextClip } from '../../actions';
import Loading from '../loading/Loading';
import './Video.css';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.setupAndPlayVideo();
    this.listenToHotkeys();
  }

  setupAndPlayVideo() {
    this.videoRef.current.load();
    this.videoRef.current.play();
    this.listenToClipEnding();
  }

  listenToClipEnding() {
    const { playNextClip } = this.props;
    this.videoRef.current.ontimeupdate = () => {
      if (this.clipEnded()) {
        playNextClip();
      }
    }
  }

  clipEnded() {
    const epsilon = 0.1;
    const selectedClipInfo = this.getSelectedClip();
    return Math.abs(this.videoRef.current.currentTime - selectedClipInfo.endTime) <= epsilon;
  }

  listenToHotkeys() {
    const { playPreviousClip, playNextClip } = this.props;
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        playPreviousClip();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        playNextClip();
      }
    });
  }

  componentDidUpdate(prevProps) {
    const clip = this.getSelectedClip();
    const previousClip = prevProps.clips[prevProps.selectedClipId];
    const shouldPlayNewClip =
      (clip.id !== previousClip.id || clip.startTime !== previousClip.startTime || clip.endTime !== previousClip.endTime);
    if (shouldPlayNewClip) {
      this.videoRef.current.pause();
      this.setState({ loading: true });
      setTimeout(() => {
        this.setupAndPlayVideo();
        this.setState({ loading: false });
      }, 3000);
    }
  }

  getSelectedClip() {
    const { clips, selectedClipId } = this.props;
    return clips[selectedClipId];
  }

  render() {
    const { video } = this.props;
    const selectedClipInfo = this.getSelectedClip();
    return (
      <div>
        <div className="embed-responsive embed-responsive-16by9">
          {this.state.loading && <Loading />}
          <video ref={this.videoRef} controls className="embed-responsive-item">
            <source src={`${video.src}#t=${selectedClipInfo.startTime},${selectedClipInfo.endTime}`} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  video: state.video,
  selectedClipId: state.clips.selectedClipId,
  clips: state.clips.entities
});

export default connect(mapStateToProps, { playPreviousClip, playNextClip })(Video);
