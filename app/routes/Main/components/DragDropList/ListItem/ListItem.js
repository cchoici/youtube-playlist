import React from 'react';
import PropTypes from 'prop-types';
import { MdPlayCircleFilled, MdPlayCircleOutline } from "react-icons/md";
import { ICON_STYLES } from 'constants/config';
import { formatTime } from 'utils/transfer';
import styles from './listItemStyles.scss';


const getItemStyle = (isDragging, draggableStyle) => {
  const { transform } = draggableStyle;
  const style = {
    userSelect: 'none',
    padding: '2px 0',
    margin: '0 0 1px 0',
    background: isDragging ? '#e8e3e3' : '#f4f1f1'
  };
  return transform ? { ...style, ...draggableStyle } : style;
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onRemoveVideo = this.onRemoveVideo.bind(this);
    this.onSwitchVideo = this.onSwitchVideo.bind(this);
  }
  onRemoveVideo() {
    const { onRemoveVideo, item: { videoId } } = this.props;
    onRemoveVideo({ videoId });
  }
  onSwitchVideo() {
    const { onSwitchVideo, item: { videoId } } = this.props;
    onSwitchVideo({ videoId });
  }
  render() {
    const { item, provided, snapshot } = this.props;
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
        <span>
          <div className={styles.imgContainer}>
            <img alt='' src={`https://img.youtube.com/vi/${item.videoId}/1.jpg`} />
            <span className={styles.bar}>
              {formatTime(Math.round(item.duration || 0))}
            </span>
          </div>
          {item.title}
        </span>
        <div className={styles.navGroup}>
          <button
            className={styles.btn}
            onClick={this.onRemoveVideo}
          >
            X
          </button>
          <button
            className={styles.btn}
            onClick={this.onSwitchVideo}
          >
            {
              item.isPlay
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
  provided: PropTypes.shape({}),
  snapshot: PropTypes.shape({}),
  onSwitchVideo: PropTypes.func,
  onRemoveVideo: PropTypes.func,
};

ListItem.defaultProps = {
  item: {},
  provided: {},
  snapshot: {},
  onSwitchVideo: () => {},
  onRemoveVideo: () => {},
}
export default ListItem;
