import React from 'react';
// import PropTypes from 'prop-types';
import { MdEdit } from 'react-icons/md';
import styles from './titleBarStyles.scss';
import { ICON_STYLES } from '../../../../../constants/config';

export default class TitleBar extends React.Component {
  render() {
    return (
      <div className={styles.containerTitleBar}>
        <input className={styles.space} />
        <button type="button" onClick={() => {}}>
          <MdEdit style={ICON_STYLES} />
        </button>   
      </div>
    );
  }
}

TitleBar.defaultProps = {

};

TitleBar.propTypes = {

};