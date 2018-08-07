import React from 'react';
import PropTypes from 'prop-types';
import styles from './navBarStyles.scss';

const NavBar = ({
  onPlay,
  onPause,
  onChange,
}) => (
  <div className={styles.containerNavBar}>
    <button type="button" onClick={onPlay}>
        Play
    </button>
    <button type="button" onClick={onPause}>
        Pause
    </button>
    <button type="button" onClick={onChange}>
        Change
    </button>
  </div>
);
NavBar.propTypes = {
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onChange: PropTypes.func,
};

NavBar.defaultProps = {
  onPlay: () => {},
  onPause: () => {},
  onChange: () => {},
};

export default NavBar;
