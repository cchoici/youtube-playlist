import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListItem from './ListItem';
import styles from './dragDropListStyles.scss';

// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     videoId: '',
//     content: `item ${k}`
//   }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = isDraggingOver => ({
  backgroundColor: isDraggingOver ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
  padding: '0 10px',
  width: 275,
});

class DragDropList extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { onDragEnd, videoList: itemsOri } = this.props;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const videoList = reorder(
      itemsOri,
      result.source.index,
      result.destination.index
    );
    onDragEnd(videoList);
  }

  render() {
    const { onSwitchVideo, onRemoveVideo, videoList: items } = this.props;
    // if (items.length === 0) {
    //   return null;
    // }
    return (
      <div className={styles.containerDragDropList}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided2, snapshot2) => (
                      <ListItem
                        item={item}
                        provided={provided2}
                        snapshot={snapshot2}
                        onRemoveVideo={onRemoveVideo}
                        onSwitchVideo={onSwitchVideo}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

DragDropList.propTypes = {
  videoList: PropTypes.arrayOf(PropTypes.object),
  onDragEnd: PropTypes.func,
  onSwitchVideo: PropTypes.func,
  onRemoveVideo: PropTypes.func,
};

DragDropList.defaultProps ={
  videoList: [],
  onDragEnd: () => {},
  onSwitchVideo: () => {},
  onRemoveVideo: () => {},
};
export default DragDropList;
