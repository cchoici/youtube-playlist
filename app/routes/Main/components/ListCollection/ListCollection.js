import React from 'react';
// import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import styles from './listCollectionStyles.scss';
import { ICON_STYLES } from '../../../../constants/config';

export default class ListCollection extends React.Component {
  render() {
    return (
      <div className='sidebarContainer'>
        <div className={styles.sidebarHeader}>
          <div className={styles.space} />
          <button type="button" onClick={() => {}}>
            <MdClose style={ICON_STYLES} />
          </button>
        </div>
      </div>
    );
  }
}

ListCollection.defaultProps = {

};

ListCollection.propTypes = {

};