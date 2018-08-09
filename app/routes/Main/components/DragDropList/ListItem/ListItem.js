import React from 'react';
import PropTypes from 'prop-types';
import styles from './listItemStyles.scss';

const getItemStyle = (isDragging, draggableStyle) => {
  const { transform } = draggableStyle;
  const style = {
    userSelect: 'none',
    padding: '2px 0',
    margin: '0 0 1px 0',
    background: isDragging ? 'rgb(181, 169, 169)' : 'rgb(197, 186, 186)'
  };
  return transform ? { ...style, ...draggableStyle } : style;
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onSwitchVideo = this.onSwitchVideo.bind(this);
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
          <img alt='' src={`https://img.youtube.com/vi/${item.videoId}/1.jpg`} />
          {item.title}
        </span>
        <button
          className={styles.btn}
          onClick={this.onSwitchVideo}
        >
          PlAY
        </button>
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({}),
  provided: PropTypes.shape({}),
  snapshot: PropTypes.shape({}),
  onSwitchVideo: PropTypes.func,
};

ListItem.defaultProps = {
  item: {},
  provided: {},
  snapshot: {},
  onSwitchVideo: () => {},
}
export default ListItem;
