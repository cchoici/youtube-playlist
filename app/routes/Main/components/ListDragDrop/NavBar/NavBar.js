import React from 'react';
import PropTypes from 'prop-types';
import { MdRepeat, MdRepeatOne, MdViewHeadline } from 'react-icons/md';
import styles from './navBarStyles.scss';
// import { ICON_STYLES } from '../../../../../constants/config';

const ICON_CUSTOME_STYLES = {
  width: 20,
  height: 20,
  color: '#222',
  verticalAlign: 'middle',
};


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onLoopChange = this.onLoopChange.bind(this);
  }
  onLoopChange() {
    const { onLoopChange, loopType } = this.props;
    onLoopChange(loopType);
  }
  render () {
    const { loopType, onTriggerSetting } = this.props;
    return (
      <div className={styles.containerNavBar}>
        <div className={styles.space} />
        <button type="button" onClick={this.onLoopChange}>
          {loopType === 'ALL' 
            ? <MdRepeat style={ICON_CUSTOME_STYLES} />
            : <MdRepeatOne style={ICON_CUSTOME_STYLES} />
          }
        </button>
        <button type="button" onClick={onTriggerSetting} className="btnSetting">
          <MdViewHeadline style={{...ICON_CUSTOME_STYLES, color: '#666' }} />
        </button>   
      </div>
    );
  }
}

NavBar.propTypes = {
  loopType: PropTypes.oneOf(['SINGLE', 'ALL']).isRequired,
  onLoopChange: PropTypes.func,
  onTriggerSetting: PropTypes.func,
};

NavBar.defaultProps = {
  onLoopChange: () => {},
  onTriggerSetting: () => {},
};

export default NavBar;
