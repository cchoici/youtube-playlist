import React from 'react';
import PropTypes from 'prop-types';
import { MdSend, MdAdd } from 'react-icons/md';
import { ICON_STYLES } from 'constants/config';
import styles from './titleBarStyles.scss';

const ICON_CUSTOME_STYLES = {
  width: 20,
  height: 20,
  color: '#666',
  verticalAlign: 'middle',
};

export default class TitleBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
    this.onEdit = this.onEdit.bind(this);
    this.onEditSend = this.onEditSend.bind(this);
  }
  componentWillReceiveProps({ title }) {
    if (title !== this.props.title) {
      this.setState({ title })
    }
  }
  onEdit(title) {
    this.setState({ title });
  }
  onEditSend() {
    const { onEditSend } = this.props;
    const { title } = this.state;
    onEditSend(title);
  }
  render() {
    const { editable, type } = this.props;
    const { title } = this.state;
    const edit = editable
      ? (
        <button type="button" onClick={this.onEditSend}>
          {
            type === 'send'
            ? <MdSend style={ICON_STYLES} />
            : <MdAdd style={ICON_CUSTOME_STYLES} />
          }
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
  type: 'send',
  onEditSend: () => {},
};

TitleBar.propTypes = {
  title: PropTypes.string,
  editable: PropTypes.bool,
  type: 'send',
  onEditSend: PropTypes.func,
};