import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const opts = {
  height: '370',
  width: '620',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    rel: 0,
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
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
      />
    );
  }
}
YouTubePlayer.propTypes = {
  videoId: PropTypes.string,
};

YouTubePlayer.defaultProps = {
  videoId: 'dhjomo8W6Lc',
};

export default YouTubePlayer;
