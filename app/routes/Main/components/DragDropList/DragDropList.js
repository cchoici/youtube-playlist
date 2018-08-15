import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListItem from './ListItem';
import NavBar from './NavBar';
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
    const {
      loopType,
      onLoopChange,
      onSwitchVideo,
      onRemoveVideo,
      videoList: items,
    } = this.props;
    return (
      <div>
        <NavBar loopType={loopType} onLoopChange={onLoopChange} />
        <div className={styles.containerDragDropList}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className={styles.dragDropList}
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
        
      </div>
    );
  }
}

DragDropList.propTypes = {
  loopType: PropTypes.oneOf(['SINGLE', 'ALL']),
  onLoopChange: PropTypes.func,
  videoList: PropTypes.arrayOf(PropTypes.object),
  onDragEnd: PropTypes.func,
  onSwitchVideo: PropTypes.func,
  onRemoveVideo: PropTypes.func,
};

DragDropList.defaultProps ={
  loopType: 'SINGLE',
  onLoopChange: () => {},
  videoList: [],
  onDragEnd: () => {},
  onSwitchVideo: () => {},
  onRemoveVideo: () => {},
};
export default DragDropList;
