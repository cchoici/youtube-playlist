import React from 'react';
import PropTypes from 'prop-types';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { ICON_STYLES } from '../../../../../constants/config';
import SeekBar from '../SeekBar';
import styles from './navBarStyles.scss';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: true,
    }
    this.onPlayOrPause = this.onPlayOrPause.bind(this);
  }
  onPlayOrPause() {
    const { onPlay, onPause } = this.props;
    const { isPlay } = this.state;
    this.setState({ isPlay: !isPlay });
    (isPlay ? onPause : onPlay)();

  }
  render () {
    const { isPlay } = this.state;
    return (
      <div className={styles.containerNavBar}>
        <button type="button" onClick={this.onPlayOrPause}>
          {isPlay 
            ? <MdPause style={ICON_STYLES} />
            : <MdPlayArrow style={ICON_STYLES} />
          }
        </button>
        <SeekBar {...this.props} />
      </div>
    );
  }
}

NavBar.propTypes = {
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

NavBar.defaultProps = {
  onPlay: () => {},
  onPause: () => {},
};

export default NavBar;
