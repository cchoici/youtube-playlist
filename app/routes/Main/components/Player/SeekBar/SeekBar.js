import React from 'react';
import PropTypes from 'prop-types';
import styles from './seekBarStyles.scss';

class SeekBar extends React.Component {
  render() {
    const { duration, currentTime } = this.props;
    return (
      <div className={styles.seekBarContainer}>
        <input
          type="range"
          step="any"
          max={duration.toFixed(2)}
          value={currentTime}
          onMouseDonw={this.onMouseDonw}
          onMouseUp={this.onMouseUp}
          onChange={this.onChange}
          className={styles.seekBar}
          style={{}}
        />
        <span>
          {`${currentTime.toFixed(0)} / ${duration.toFixed(0)}`}
        </span>
      </div>
    );
  }
}

SeekBar.defaultProps = {
  duration: 0,
  currentTime: 0,
};

SeekBar.propTypes = {
  duration: PropTypes.number,
  currentTime: PropTypes.number,
};

export default SeekBar;
