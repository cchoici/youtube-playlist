import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import SearchBarContainer from 'routes/Main/containers/SearchBarContainer';
import NavBar from './NavBar';
import styles from './playerStyles.scss';

const volumeWidth = 50;


const opts = {
  width: '100%',
  height: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0,
    // showinfo: 0,
    rel: 0,
    playsinline: 0,
    modestbranding: 1,
    cc_lang_pref: 'en',
    cc_load_policy: 1,
    // loop: 1,
    fs: 0,
    iv_load_policy: 3
  }
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        videoId: null,
        author: '',
        title: '',
        duration: 0,
      },
      currentTime: 0,
      volume: 50,

    }
    this.player = null;
    this.progressTimeout = null;
    this.onReady = this.onReady.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onMute = this.onMute.bind(this);
    this.onSetVolume = this.onSetVolume.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  
  componentWillReceiveProps({ isAddToList }) {
    const { info } = this.state;
    if (isAddToList) {
        this.props.onAddVideoToList(info);
        this.setState({ info: {} });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.progressTimeout);
  }
  onReady({ target }) {
    console.log('player ready');
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
    this.setState({ currentTime: Number(rangeCurrent) });
  }
  onSetVolume({ rangeCurrent }) {
    this.player.setVolume(rangeCurrent * volumeWidth / 100);
    this.setState({ volume: rangeCurrent });
  }
  onMute({ isUnMute }) {
    if (!this.player) return;
    if (isUnMute) {
      this.player.mute();
    } else {
      this.player.unMute();
    }
  }
  onStateChange({ data }) {
    if (data === 1 ) {
      /* eslint-disable-next-line */
      const { video_id, author, title } = this.player.getVideoData();
     const duration = this.player.getDuration();
      this.setState({ info: {
        videoId: video_id,
        author,
        title,
        duration,
      } });
    }
  }
  onEnd() {
    const { loopType, onPlayNextVideo } = this.props;
    if ( loopType === 'SINGLE') {
      this.onPlay();
    } else {
      onPlayNextVideo();
    }
  }
  render() {
    const { videoId } = this.props;
    const { duration, currentTime, volume } = this.state;
    const paramsNavBar = {
      onPlay: this.onPlay,
      onPause: this.onPause,
      onMute: this.onMute,
      paramsTime: {
        type: 'TIME',
        onRangeMouseUp: this.onPlay,
        onRangeMouseDown: this.onPause,
        onRangeSeek: this.onSeek,
        rangeTotal: duration,
        rangeCurrent: currentTime,
      },
      paramsVolume: {
        type: 'VOLUME',
        style: { width: volumeWidth, flex: 'inherit' },
        onRangeSeek: this.onSetVolume,
        rangeTotal: 100,
        rangeCurrent: volume,
      },
    };
    return (
      <div className={styles.containerPlayer}>
        <SearchBarContainer />
        <div className={styles.playerWrapper}>
          { videoId 
              ? <YouTube
                videoId={videoId}
                opts={opts}
                onReady={this.onReady}
                onEnd={this.onEnd}
                onStateChange={this.onStateChange}
              />
              : (
                <div className={styles.msg}>
                  <span>
                    Please input youtube video address <br />on the top bar
                  </span>
                </div>
              )
          }
        </div>
        <NavBar {...paramsNavBar} />
      </div>
    );
  }
}
Player.propTypes = {
  loopType: PropTypes.oneOf(['SINGLE', 'ALL']),
  videoId: PropTypes.string,
  isAddToList: PropTypes.bool,
  onAddVideoToList: PropTypes.func,
  onPlayNextVideo: PropTypes.func,
};

Player.defaultProps = {
  loopType: 'SINGLE',
  videoId: null,
  isAddToList: false,
  onAddVideoToList: () => {},
  onPlayNextVideo: () => {},
};

export default Player;
