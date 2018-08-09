import React from 'react';
import PropTypes from 'prop-types';
import styles from './navBarStyles.scss';

const NavBar = ({
  onPlay,
  onPause,
}) => (
  <div className={styles.containerNavBar}>
    <button type="button" onClick={onPlay}>
        Play
    </button>
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
