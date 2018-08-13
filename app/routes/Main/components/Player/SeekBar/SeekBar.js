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
  
  shouldComponentUpdate({ rangeTotal, rangeCurrent }) {
    return (
      rangeTotal !== this.props.rangeTotal ||
      rangeCurrent !== this.props.rangeCurrent
    );
  }
  onSeekChange({ target: { value } }) {
    const { onRangeSeek } = this.props;
    onRangeSeek({ rangeCurrent: value });
  }
  render() {
    const {
      style,
      onRnageMouseUp,
      onRangeMouseDown,
      rangeTotal,
      rangeCurrent,
      isShowTime,
    } = this.props;
    return (
      <div className={styles.seekBarContainer} style={style}>
        <input
          type="range"
          step="any"
          max={Math.round(rangeTotal)}
          value={rangeCurrent}
          onMouseDown={onRangeMouseDown}
          onMouseUp={onRnageMouseUp}
          onChange={this.onSeekChange}
          className={styles.seekBar}
        />
        {isShowTime && (
          <span>
            {`${formatTime(Math.round(rangeCurrent))} / ${formatTime(Math.round(rangeTotal))}`}
          </span>
        )}
      </div>
    );
  }
}

SeekBar.defaultProps = {
  style: {},
  onRnageMouseUp: () => {},
  onRangeMouseDown: () => {},
  onRangeSeek: () => {},
  rangeTotal: 0,
  rangeCurrent: 0,
  isShowTime: false,
};

SeekBar.propTypes = {
  style: PropTypes.shape({}),
  onRnageMouseUp: PropTypes.func,
  onRangeMouseDown: PropTypes.func,
  onRangeSeek: PropTypes.func,
  rangeTotal: PropTypes.number,
  rangeCurrent: PropTypes.number,
  isShowTime: PropTypes.bool,
};

export default SeekBar;
