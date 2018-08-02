import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import './playerStyles.scss';

const opts = {
  height: '100%',
  width: '100%',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    rel: 0,
    playsinline: 1,
    modestbranding: 1,
    loop: 1,
    fs: 0,
    iv_load_policy: 3,
  },
};
const onReady = () => {
  // evt.target.pauseVideo();
};
class YouTubePlayer extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.onReady = this.onReady.bind(this);
  // }
  render() {
    const { videoId } = this.props;
    return (
      <div className="containerPlayer">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
        />
      </div>
    );
  }
}
YouTubePlayer.propTypes = {
  videoId: PropTypes.string,
};

YouTubePlayer.defaultProps = {
  videoId: 'XKuL5xaKZHM',
};

export default YouTubePlayer;
