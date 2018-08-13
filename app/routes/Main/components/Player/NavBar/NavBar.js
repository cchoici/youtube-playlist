import React from 'react';
import PropTypes from 'prop-types';
import { MdPause, MdPlayArrow, MdVolumeUp, MdVolumeOff } from 'react-icons/md';
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
      isMute: false,
    }
    this.onPlayOrPause = this.onPlayOrPause.bind(this);
    this.onMute = this.onMute.bind(this);
  }
  onPlayOrPause() {
    const { onPlay, onPause } = this.props;
    const { isPlay } = this.state;
    this.setState({ isPlay: !isPlay });
    (isPlay ? onPause : onPlay)();

  }
  onMute() {
    const { onMute } = this.props;
    const { isMute } = this.state;
    this.setState({ isMute: !isMute });
    onMute({ isMute });
  }
  render () {
    const { paramsTime, paramsVolume } = this.props;
    const { isPlay, isMute } = this.state;
    return (
      <div className={styles.containerNavBar}>
        <button type="button" onClick={this.onPlayOrPause}>
          {isPlay 
            ? <MdPause style={ICON_STYLES} />
            : <MdPlayArrow style={ICON_STYLES} />
          }
        </button>
        <SeekBar {...paramsTime} />
        <button type="button" onClick={this.onMute}>
          {isMute 
            ? <MdVolumeUp style={ICON_STYLES} />
            : <MdVolumeOff style={ICON_STYLES} />
          }
        </button>
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
  onMute: PropTypes.func,
};

NavBar.defaultProps = {
  paramsTime: rangeDefault,
  paramsVolume: {...rangeDefault},
  onPlay: () => {},
  onPause: () => {},
  onMute: () => {},
};

export default NavBar;
