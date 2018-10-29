import React from 'react';
import PropTypes from 'prop-types';
import { MdClose, MdPlayCircleFilled, MdPlayCircleOutline, MdFolderOpen } from "react-icons/md";
import { ICON_STYLES } from 'constants/config';
import styles from './listItemStyles.scss';


const getItemStyle = (isDragging, draggableStyle) => {
  const { transform } = draggableStyle;
  const style = {
    userSelect: 'none',
    padding: '2px 0',
    margin: '0 0 1px 0',
    background: isDragging ? '#e8e3e3' : '#fff'
  };
  return transform ? { ...style, ...draggableStyle, left: 0, top: draggableStyle.top - 26 } : style;
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onRemoveBookmark = this.onRemoveBookmark.bind(this);
    this.onSwitchBookmark = this.onSwitchBookmark.bind(this);
  }
  onRemoveBookmark() {
    const { onRemoveBookmark, item: { uuid } } = this.props;
    onRemoveBookmark({ uuid });
  }
  onSwitchBookmark() {
    const { onSwitchBookmark, item: { uuid } } = this.props;
    onSwitchBookmark({ uuid });
  }
  render() {
    const { item, provided, snapshot, isPlay } = this.props;
    console.log('id:', item.id);
    return (
      <div
        className={styles.box}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style
        )}
      >
        <MdFolderOpen style={{ ...ICON_STYLES, width: 25, height: 25 }} />
        <span>
          {item.title}
        </span>
        <div className={styles.navGroup}>
          <button type="button" onClick={this.onRemoveBookmark}>
            <MdClose style={ICON_STYLES} />
          </button>
          <button
            className={styles.btn}
            onClick={this.onSwitchBookmark}
          >
            {
              isPlay
              ? <MdPlayCircleFilled style={{ ...ICON_STYLES, width: 20, height: 20, color: '#b84747' }} />
              : <MdPlayCircleOutline style={{ ...ICON_STYLES, width: 20, height: 20 }} />
            }
          </button>
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({}),
  isPlay: PropTypes.bool,
  provided: PropTypes.shape({}),
  snapshot: PropTypes.shape({}),
  onSwitchBookmark: PropTypes.func,
  onRemoveBookmark: PropTypes.func,
};

ListItem.defaultProps = {
  item: {},
  isPlay: false,
  provided: {},
  snapshot: {},
  onSwitchBookmark: () => {},
  onRemoveBookmark: () => {},
}
export default ListItem;
