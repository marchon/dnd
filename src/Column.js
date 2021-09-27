import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

const Container = styled.div`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 2px;
  flex-flow: column nowrap;
  flex: 1 0 auto;
  max-width: calc(50% - 1rem);
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h3`
  padding: 8px;
`;

const SearchInput = styled.input`
  flex: 1 0 auto;
  margin-right: 8px;
  padding: 0.25rem;
`;

const ItemList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => {
    if (
      props.isDraggingFromLeft &&
      props.isDraggingOver &&
      props.droppableId === 'right'
    ) {
      return 'red';
    }
    return props.isDraggingOver ? '#7FDBFF' : 'white';
  }};
  flex-grow: 1;
  min-height: 100px;
`;

export default function Column(props) {
  const { column, items, isDraggingFromLeft } = props;
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  return (
    <Container>
      <Header>
        <Title>{column.title}</Title>
        {column.id === 'right' ? (
          <SearchInput
            type="text"
            onChange={onSearchChange}
            defaultValue={searchValue}
            placeholder="Search / Filter"
          />
        ) : null}
      </Header>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <ItemList
            // style={{
            //   maxWidth: '100%',
            // }}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromLeft={isDraggingFromLeft}
            droppableId={column.id}
          >
            {items.map((item, index) => {
              const name = item.name.toLowerCase();
              return name.includes(searchValue) ? (
                <Item
                  key={item.id}
                  item={item}
                  index={index}
                  startColumn={column.id}
                  isDraggingFromLeft={isDraggingFromLeft}
                />
              ) : null;
            })}
            {provided.placeholder}
          </ItemList>
        )}
      </Droppable>
    </Container>
  );
}
