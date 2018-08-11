import React from 'react';
import PropTypes from 'prop-types';
import styles from './seekBarStyles.scss';

const formatTime = seconds => {
  const date = new Date(null);
  date.setSeconds(seconds);
  const arr = [seconds >= 3600 ? 11 : 14, seconds >= 3600 ? 8 : 5];
  return date.toISOString().substr(...arr);
}

class SeekBar extends React.Component {
  constructor(props) {
    super(props);
    this.onSeekChange = this.onSeekChange.bind(this);
  }
  
  shouldComponentUpdate({ duration, currentTime }) {
    return (
      duration !== this.props.duration ||
      currentTime !== this.props.currentTime
    );
  }
  // onSeekMouseUp({ target: { value } }) {
  //   console.log('up:', value);

  // }
  onSeekChange({ target: { value } }) {
    const { onSeek } = this.props;
    onSeek({ currentTime: value });
  }
  render() {
    const {
      onPlay,
      onPause,
      duration,
      currentTime,
    } = this.props;
    return (
      <div className={styles.seekBarContainer}>
        <input
          type="range"
          step="any"
          max={duration.toFixed(2)}
          value={currentTime}
          onMouseDown={onPause}
          onMouseUp={(onPlay)}
          onChange={this.onSeekChange}
          className={styles.seekBar}
          style={{}}
        />
        <span>
          {`${formatTime(Math.round(currentTime))} / ${formatTime(Math.round(duration))}`}
        </span>
      </div>
    );
  }
}

SeekBar.defaultProps = {
  onPlay: () => {},
  onPause: () => {},
  onSeek: () => {},
  duration: 0,
  currentTime: 0,
};

SeekBar.propTypes = {
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onSeek: PropTypes.func,
  duration: PropTypes.number,
  currentTime: PropTypes.number,
};

export default SeekBar;
