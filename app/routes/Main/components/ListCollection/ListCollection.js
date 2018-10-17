import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MdClose, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { reorder } from 'utils/transfer';
import { ICON_STYLES } from 'constants/config';
import TitleBar from '../TitleBar';
import ListItem from './ListItem';
import styles from './listCollectionStyles.scss';

const ICON_CUSTOME_STYLES = {
  width: 20,
  height: 20,
  color: '#666',
  verticalAlign: 'middle',
};

export default class ListCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditBookmark: false,
    }
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onEditBookmark = this.onEditBookmark.bind(this);
    this.onEditSend = this.onEditSend.bind(this);
  }
  onEditBookmark() {
    const { isEditBookmark } = this.state;
    this.setState({ isEditBookmark: !isEditBookmark });
  }
  onEditSend(titleBookmark) {
    console.log('ListCollection:', titleBookmark);
    const { onEditSend } = this.props;
    this.setState({ isEditBookmark: false });
    onEditSend(titleBookmark);
  }
  onDragEnd(result) {
    const { onDragEnd, listBookmark: itemsOri } = this.props;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const listBookmark = reorder(
      itemsOri,
      result.source.index,
      result.destination.index
    );
    onDragEnd(listBookmark);
  }
  render() {
    const {
      visible,
      listBookmark: items,
      onSwitchBookmark,
    } = this.props;
    const { isEditBookmark } = this.state;
    if (!visible) return null;
    return (
      <div className='sidebarContainer'>
        <div className={styles.sidebarHeader}>
          <button type="button" onClick={this.onEditBookmark}>
            { 
              isEditBookmark
              ? <MdKeyboardArrowUp style={ICON_CUSTOME_STYLES} />
              : <MdKeyboardArrowDown style={ICON_CUSTOME_STYLES} />
            }
          </button>
          <div className={styles.space} />
          <button type="button" onClick={() => {}}>
            <MdClose style={ICON_STYLES} />
          </button>
        </div>
        {
          isEditBookmark
          ? <TitleBar onEditSend={this.onEditSend} editable type='add' />
          : null
        }
        <div className={styles.container}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppableCollect">
              {(provided) => (
                <div ref={provided.innerRef} className={styles.listDragDrop}>
                  {items.map((item, index) => (
                    <Draggable key={`${item.uuid}`} draggableId={`${item.uuid}`} index={index}>
                      {(provided2, snapshot2) => (
                        <ListItem
                          item={item}
                          key={`${item.uuid}_${item.title}`}
                          provided={provided2}
                          snapshot={snapshot2}
                          onSwitchBookmark={onSwitchBookmark}
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
  listBookmark: [],
  onDragEnd: () => {},
  onEditSend:() => {},
  onSwitchBookmark:() => {},
};

ListCollection.propTypes = {
  visible: PropTypes.bool,
  listBookmark: PropTypes.arrayOf(PropTypes.object),
  onDragEnd: PropTypes.func,
  onEditSend: PropTypes.func,
  onSwitchBookmark: PropTypes.func,
};