import React from 'react';
import PropTypes from 'prop-types';
import SeekBar from '../SeekBar';
import styles from './navBarStyles.scss';

const NavBar = ({
  onPlay,
  onPause,
  ...props,
}) => (
  <div className={styles.containerNavBar}>
    <button type="button" onClick={onPlay}>
        Play
    </button>
    <SeekBar {...props} />
    <button type="button" onClick={onPause}>
        Pause
    </button>
  </div>
);
NavBar.propTypes = {
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

NavBar.defaultProps = {
  onPlay: () => {},
  onPause: () => {},
};

export default NavBar;
