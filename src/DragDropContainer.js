import React from 'react';
// import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
// import initialData from './initialData';
import Column from './Column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

function DragDropContainer(props) {
  const {
    onDragStart,
    onDragUpdate,
    onDragEnd,
    columnOrder,
    columns,
    items,
    isDraggingFromLeft,
  } = props;
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Container>
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          const columnItems = column.itemIds.map((itemId) => items[itemId]);

          return (
            <Column
              key={column.id}
              column={column}
              items={columnItems}
              isDraggingFromLeft={isDraggingFromLeft}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
}

export default DragDropContainer;
