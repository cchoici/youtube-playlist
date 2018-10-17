import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorder } from 'utils/transfer';
import ListItem from './ListItem';
import NavBar from './NavBar';
import TitleBar from '../TitleBar';
import styles from './listDragDropStyles.scss';

class ListDragDrop extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { onDragEnd, listVideo: itemsOri } = this.props;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const listVideo = reorder(
      itemsOri,
      result.source.index,
      result.destination.index
    );
    onDragEnd(listVideo);
  }

  render() {
    const {
      visible,
      loopType,
      onLoopChange,
      onTriggerSetting,
      onSwitchVideo,
      onRemoveVideo,
      listVideo: items,
      titleBookmark,
      onEditSend,
    } = this.props;
    if (!visible) return null;
    return (
      <div className={styles.containerWrapper}>
        <NavBar
          loopType={loopType}
          onLoopChange={onLoopChange}
          onTriggerSetting={onTriggerSetting}
        />
        <TitleBar title={titleBookmark} editable onEditSend={onEditSend} />
        <div className={styles.container}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div ref={provided.innerRef} className={styles.listDragDrop}   >
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided2, snapshot2) => (
                        <ListItem
                          item={item}
                          key={`${item.id}_item`}
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

ListDragDrop.propTypes = {
  visible: PropTypes.bool,
  titleBookmark: PropTypes.string,
  loopType: PropTypes.oneOf(['SINGLE', 'ALL']),
  onLoopChange: PropTypes.func,
  onTriggerSetting: PropTypes.func,
  listVideo: PropTypes.arrayOf(PropTypes.object),
  onDragEnd: PropTypes.func,
  onSwitchVideo: PropTypes.func,
  onRemoveVideo: PropTypes.func,
  onEditSend: PropTypes.func,
};

ListDragDrop.defaultProps = {
  visible: true,
  titleBookmark: '',
  loopType: 'SINGLE',
  onLoopChange: () => {},
  onTriggerSetting: () => {},
  listVideo: [],
  onDragEnd: () => {},
  onSwitchVideo: () => {},
  onRemoveVideo: () => {},
  onEditSend: () => {},
};
export default ListDragDrop;
