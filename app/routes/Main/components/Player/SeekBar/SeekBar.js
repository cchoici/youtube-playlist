import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from 'utils/transfer';
import styles from './seekBarStyles.scss';

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
      onRangeMouseUp,
      onRangeMouseDown,
      rangeTotal,
      rangeCurrent,
      type,
    } = this.props;
    return (
      <div className={styles.seekBarContainer} style={style}>
        <input
          type="range"
          typestyle={type}
          step="any"
          max={Math.round(rangeTotal)}
          value={rangeCurrent}
          onMouseDown={onRangeMouseDown}
          onMouseUp={onRangeMouseUp}
          onChange={this.onSeekChange}
          className={styles.seekBar}
        />
        {type === 'TIME' && (
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
  onRangeMouseUp: () => {},
  onRangeMouseDown: () => {},
  onRangeSeek: () => {},
  rangeTotal: 0,
  rangeCurrent: 0,
  type: 'TIME',
};

SeekBar.propTypes = {
  style: PropTypes.shape({}),
  onRangeMouseUp: PropTypes.func,
  onRangeMouseDown: PropTypes.func,
  onRangeSeek: PropTypes.func,
  rangeTotal: PropTypes.number,
  rangeCurrent: PropTypes.number,
  type: PropTypes.oneOf(['TIME', 'VOLUME']),
};

export default SeekBar;
