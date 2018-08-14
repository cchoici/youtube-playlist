import React from 'react';
import PropTypes from 'prop-types';
import { MdRepeat, MdRepeatOne } from 'react-icons/md';
import styles from './navBarStyles.scss';

const ICON_STYLES = {
  width: 20,
  height: 20,
  color: '#666',
  verticalAlign: 'middle',
};


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeRepeat: false,
    }
    this.onPlay = this.onPlay.bind(this);
  }
  onPlay() {
    const { onPlay } = this.props;
    const { typeRepeat } = this.state;
    this.setState({ typeRepeat: !typeRepeat });
    onPlay();
  }
  render () {
    const { typeRepeat } = this.state;
    return (
      <div className={styles.containerNavBar}>
        <div className={styles.space} />
        <button type="button" onClick={this.onPlay}>
          {typeRepeat 
            ? <MdRepeat style={ICON_STYLES} />
            : <MdRepeatOne style={ICON_STYLES} />
          }
        </button>
      </div>
    );
  }
}

NavBar.propTypes = {
  onPlay: PropTypes.func,
};

NavBar.defaultProps = {
  onPlay: () => {},
};

export default NavBar;
