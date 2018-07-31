import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './styles.css';

const getItems = count => (
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }))
);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => {
  const { transform } = draggableStyle;
  const style = {
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'rgb(181, 169, 169)' : 'rgb(197, 186, 186)',
  };
  return transform ? { ...style, ...draggableStyle } : style;
};

const getListStyle = isDraggingOver => ({
  backgroundColor: isDraggingOver ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
  padding: grid,
  width: 260,
});

class DragDropList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { items: itemsOri } = this.state;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      itemsOri,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items,
    });
  }

  render() {
    const { items } = this.state;
    return (
      <div className={styles.container}>
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
                      <div
                        className={styles.box}
                        ref={provided2.innerRef}
                        {...provided2.draggableProps}
                        {...provided2.dragHandleProps}
                        style={getItemStyle(
                          snapshot2.isDragging,
                          provided2.draggableProps.style,
                        )}
                      >
                        {item.content}
                      </div>
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

export default DragDropList;
