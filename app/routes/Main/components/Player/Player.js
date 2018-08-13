import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import NavBar from './NavBar';
import styles from './playerStyles.scss';

const volumeWidth = 50;


const opts = {
  width: 580,
  height: 330,
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    rel: 0,
    playsinline: 1,
    modestbranding: 1,
    // loop: 1,
    fs: 0,
    iv_load_policy: 3
  }
};
const onEnd = ({ target }) => {
  target.playVideo();
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      currentTime: 0,
      volume: 50,

    }
    this.player = null;
    this.progressTimeout = null;
    this.onReady = this.onReady.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onSetVolume = this.onSetVolume.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    const { isAddToList, onAddVideoToList } = this.props;
    const { info } = this.state;
    if ((nextProps.isAddToList !== isAddToList) && info) {
        onAddVideoToList(info);
        this.setState({ info: null });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.progressTimeout);
  }
  onReady({ target }) {
    this.player = target;
    this.onPlay();
    this.onProgress();
  }
  onProgress() {
    const currentTime = this.player.getCurrentTime();
    const duration = this.player.getDuration();
    this.setState({ duration, currentTime });
    this.progressTimeout = setTimeout(this.onProgress, 1000);
  }
  onPlay() {
    // const { currentTime } = this.state;
    // this.player.seekTo(currentTime);
    this.player.playVideo();
  }
  onPause() {
    this.player.pauseVideo();
  }
  onSeek({ rangeCurrent }) {
    this.player.seekTo(rangeCurrent);
    this.setState({ currentTime: rangeCurrent });
  }
  onSetVolume({ rangeCurrent }) {
    this.player.setVolume(rangeCurrent * volumeWidth / 100);
    this.setState({ volume: rangeCurrent });
  }
  onStateChange({ data }) {
    console.log(data);
    if (data === 1 ) {
      const info = this.player.getVideoData();
      this.setState({ info });
    }
  }
  // onChange() {
  //   this.player.cueVideoById({
  //       videoId: 'sg_WE0ToJjM',
  //       // startSeconds: 100,
  //       // endSeconds: 1000,
  //     });
  //   this.player.playVideo();
  // }
  render() {
    const { videoId } = this.props;
    const { duration, currentTime, volume } = this.state;
    const paramsNavBar = {
      onPlay: this.onPlay,
      onPause: this.onPause,
      paramsTime: {
        onRangeMouseUp: this.onPlay,
        onRangeMouseDown: this.onPause,
        onRangeSeek: this.onSeek,
        rangeTotal: duration,
        rangeCurrent: currentTime,
      },
      paramsVolume: {
        style: { width: volumeWidth, flex: 'inherit' },
        onRangeSeek: this.onSetVolume,
        rangeTotal: 100,
        rangeCurrent: volume,
      },

    }
    return (
      <div className={styles.containerPlayer}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this.onReady}
          onEnd={onEnd}
          onStateChange={this.onStateChange}
        />
        <NavBar {...paramsNavBar} />
      </div>
    );
  }
}
Player.propTypes = {
  videoId: PropTypes.string,
  isAddToList: PropTypes.bool,
  onAddVideoToList: PropTypes.func,
};

Player.defaultProps = {
  videoId: null,
  isAddToList: false,
  onAddVideoToList: () => {},
};

export default Player;

// seekTo (amount) {
//     this.callPlayer('seekTo', amount)
//   }
//   setVolume (fraction) {
//     this.callPlayer('setVolume', fraction * 100)
//   }
//   mute = () => {
//     this.callPlayer('mute')
//   }
//   unmute = () => {
//     this.callPlayer('unMute')
//   }
//   setPlaybackRate (rate) {
//     this.callPlayer('setPlaybackRate', rate)
//   }
//   getDuration () {
//     return this.callPlayer('getDuration')
//   }
//   getCurrentTime () {
//     return this.callPlayer('getCurrentTime')
//   }
//   getSecondsLoaded () {
//     return this.callPlayer('getVideoLoadedFraction') * this.getDuration()
//   }
