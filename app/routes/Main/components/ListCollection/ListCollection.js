import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MdClose, MdAddBox } from 'react-icons/md';
import { reorder } from 'utils/transfer';
import { ICON_STYLES } from 'constants/config';
import ListItem from './ListItem';
import styles from './listCollectionStyles.scss';

export default class ListCollection extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd(result) {
    const { onDragEnd, bookmarkList: itemsOri } = this.props;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const bookmarkList = reorder(
      itemsOri,
      result.source.index,
      result.destination.index
    );
    onDragEnd(bookmarkList);
  }
  render() {
    const {
      visible,
      bookmarkList: items,
    } = this.props;
    if (!visible) return null;
    return (
      <div className='sidebarContainer'>
        <div className={styles.sidebarHeader}>
          <div className={styles.space} />
          <button type="button" onClick={() => {}}>
            <MdAddBox style={ICON_STYLES} />
          </button>
          <button type="button" onClick={() => {}}>
            <MdClose style={ICON_STYLES} />
          </button>
        </div>
        <div className={styles.container}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppableCollect">
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

ListCollection.defaultProps = {
  visible: true,
  bookmarkList: [],
  onDragEnd: () => {},
};

ListCollection.propTypes = {
  visible: PropTypes.bool,
  bookmarkList: PropTypes.arrayOf(PropTypes.object),
  onDragEnd: PropTypes.func,
};