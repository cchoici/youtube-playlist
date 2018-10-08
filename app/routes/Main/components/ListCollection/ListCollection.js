import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MdClose, MdAddBox, MdIndeterminateCheckBox } from 'react-icons/md';
import { reorder } from 'utils/transfer';
import { ICON_STYLES } from 'constants/config';
import TitleBar from '../TitleBar';
import ListItem from './ListItem';
import styles from './listCollectionStyles.scss';

export default class ListCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditBookmark: false,
    }
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onEditBookmark = this.onEditBookmark.bind(this);
    this.onEditSave = this.onEditSave.bind(this);
  }
  onEditBookmark() {
    const { isEditBookmark } = this.state;
    this.setState({ isEditBookmark: !isEditBookmark });
  }
  onEditSave(bookmarkTitle) {
    console.log('ListCollection:', bookmarkTitle);
    const { onEditSave } = this.props;
    this.setState({ isEditBookmark: false });
    onEditSave(bookmarkTitle);
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
      bookmarkTitle,
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
              ? <MdIndeterminateCheckBox style={ICON_STYLES} />
              : <MdAddBox style={ICON_STYLES} />
            }
          </button>
          <div className={styles.space} />
          <button type="button" onClick={() => {}}>
            <MdClose style={ICON_STYLES} />
          </button>
        </div>
        {
          isEditBookmark
          ? <TitleBar title={bookmarkTitle} onEditSave={this.onEditSave} editable />
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
                          key={`${item.uuid}_col`}
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
  bookmarkTitle: '',
  listBookmark: [],
  onDragEnd: () => {},
  onEditSave:() => {},
  onSwitchBookmark:() => {},
};

ListCollection.propTypes = {
  visible: PropTypes.bool,
  bookmarkTitle: PropTypes.string,
  listBookmark: PropTypes.arrayOf(PropTypes.object),
  onDragEnd: PropTypes.func,
  onEditSave: PropTypes.func,
  onSwitchBookmark: PropTypes.func,
};