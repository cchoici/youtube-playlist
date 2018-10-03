import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit } from 'react-icons/md';
import { ICON_STYLES } from 'constants/config';
import styles from './titleBarStyles.scss';

export default class TitleBar extends React.Component {
  render() {
    const { title } = this.props;
    console.log('title:', title);
    return (
      <div className={styles.containerTitleBar}>
        <input className={styles.space} value={title} />
        <button type="button" onClick={() => {}}>
          <MdEdit style={ICON_STYLES} />
        </button>   
      </div>
    );
  }
}

TitleBar.defaultProps = {
  title: '',
};

TitleBar.propTypes = {
  title: PropTypes.string,
};