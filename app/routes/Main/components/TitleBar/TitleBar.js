import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit } from 'react-icons/md';
import { ICON_STYLES } from 'constants/config';
import styles from './titleBarStyles.scss';

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
    this.onEdit = this.onEdit.bind(this);
    this.onEditSave = this.onEditSave.bind(this);
  }
  onEdit(title) {
    console.log('title:', title);
    this.setState({ title });
  }
  onEditSave() {
    const { onEditSave } = this.props;
    const { title } = this.state;
    onEditSave(title);
  }
  render() {
    const { editable } = this.props;
    const { title } = this.state;
    const edit = editable
      ? (
        <button type="button" onClick={this.onEditSave}>
          <MdEdit style={ICON_STYLES} />
        </button>
      ) : null;
    return (
      <div className={styles.containerTitleBar}>
        <input
          className={styles.space}
          onChange={(v) => { this.onEdit(v.currentTarget.value); }}
          value={title}
          readOnly={editable ? false : 'readonly'}
        />
        {edit}
      </div>
    );
  }
}

TitleBar.defaultProps = {
  title: '',
  editable: false,
  onEditSave: () => {},
};

TitleBar.propTypes = {
  title: PropTypes.string,
  editable: PropTypes.bool,
  onEditSave: PropTypes.func,
};