import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import NavBar from './NavBar';
import styles from './playerStyles.scss';

const opts = {
  width: 580,
  height: 330,
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
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
const onStateChange = ({ data }) => {
  console.log('onStateChange:  ',data);
}
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.onReady = this.onReady.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onReady({ target }) {
    this.player = target;
    this.onPlay();
  }
  onPlay() {
   this.player.playVideo();
  }
  onPause() {
    this.player.pauseVideo();
  }
  onChange() {
    this.player.cueVideoById({
        videoId: 'sg_WE0ToJjM',
        // startSeconds: 10,
        // endSeconds: 100,
      });
    this.player.playVideo();
  }
  render() {
    const { videoId } = this.props;
    const paramsNavBar = {
      onPlay: this.onPlay,
      onPause: this.onPause,
      onChange: this.onChange,
    }
    return (
      <div className={styles.containerPlayer}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this.onReady}
          onEnd={onEnd}
          onStateChange={onStateChange}
        />
        <NavBar {...paramsNavBar} />
      </div>
    );
  }
}
Player.propTypes = {
  videoId: PropTypes.string,
  onChange: PropTypes.func,
};

Player.defaultProps = {
  videoId: null,
  onChange: () => {},
};

export default Player;
