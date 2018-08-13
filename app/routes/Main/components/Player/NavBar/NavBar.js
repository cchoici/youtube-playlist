import React from 'react';
import PropTypes from 'prop-types';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { ICON_STYLES } from '../../../../../constants/config';
import SeekBar from '../SeekBar';
import styles from './navBarStyles.scss';

const rangeTypes = {
  onRangeMouseDown: PropTypes.func,
  onRangeMouseUp: PropTypes.func,
  onRangeSeek: PropTypes.func,
  rangeTotal: PropTypes.number,
  rangeCurrent: PropTypes.number,
};
const rangeDefault = {
  onRangeMouseDown: () => {},
  onRangeMouseUp: () => {},
  onRangeSeek: () => {},
  rangeTotal: 0,
  rangeCurrent: 0,
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: true,
    }
    this.onPlayOrPause = this.onPlayOrPause.bind(this);
  }
  onPlayOrPause() {
    const {
      onPlay,
      onPause,
    } = this.props;
    const { isPlay } = this.state;
    this.setState({ isPlay: !isPlay });
    (isPlay ? onPause : onPlay)();

  }
  render () {
    const {
      paramsTime,
      paramsVolume,
    } = this.props;
    const { isPlay } = this.state;
    return (
      <div className={styles.containerNavBar}>
        <button type="button" onClick={this.onPlayOrPause}>
          {isPlay 
            ? <MdPause style={ICON_STYLES} />
            : <MdPlayArrow style={ICON_STYLES} />
          }
        </button>
        <SeekBar isShowTime {...paramsTime} />
        <SeekBar {...paramsVolume} />
      </div>
    );
  }
}

NavBar.propTypes = {
  paramsTime: PropTypes.shape(rangeTypes),
  paramsVolume: PropTypes.shape(rangeTypes),
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

NavBar.defaultProps = {
  paramsTime: rangeDefault,
  paramsVolume: {...rangeDefault},
  onPlay: () => {},
  onPause: () => {},
};

export default NavBar;
