import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import initialData from './initialData';
import DragDropContainer from './DragDropContainer';
// import styled from 'styled-components';
import uuid from 'uuid/v4';
import { reorder, copy } from './utils';
import '@atlaskit/css-reset';
import './styles.css';

// https://egghead.io/lessons/react-move-items-between-columns-with-react-beautiful-dnd-using-ondragend

function App() {
  // { items, columns, columnOrder }
  const [data, setData] = useState(initialData);
  const [isDraggingFromLeft, setIsDraggingFromLeft] = useState(false);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  useEffect(() => {
    console.log('isDraggingFromLeft', isDraggingFromLeft);
    console.log('data', data);
  }, [isDraggingFromLeft, data]);

  const onDragStart = (start) => {
    console.log('onDragStart', start);
    if (start.source.droppableId === 'left') {
      setIsDraggingFromLeft(true);
    }
  };

  const onDragUpdate = (update) => {
    // console.log('onDragUpdate', update);
  };

  const onDragEnd = (result) => {
    setIsDraggingFromLeft(false);
    console.log('onDragEnd', result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      setData(reorder(start, destination, source, draggableId));
      return;
    }

    if (finish.id === 'remove') {
      console.log('remove', finish);
    }

    if (start.id === 'right' && finish.id === 'left') {
      const copiedItem = {
        ...data.items[draggableId],
        id: uuid(),
      };

      setData(copy(finish, copiedItem));
    }

    if (start.id === 'left' && finish.id === 'right') {
      console.log('left to right', result);

      setData((prevState) => ({
        ...prevState,
        columns: {
          ...prevState.columns,
          left: {
            ...prevState.columns.left,
            itemIds: prevState.columns.left.itemIds.filter(
              (id) => id !== draggableId
            ),
          },
        },
      }));
    }
  };

  return (
    <div>
      <DragDropContainer
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
        columnOrder={data.columnOrder}
        columns={data.columns}
        items={data.items}
        isDraggingFromLeft={isDraggingFromLeft}
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
