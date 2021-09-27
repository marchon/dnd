import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
  visibility: ${(props) =>
    props.isDraggingFromLeft && props.startColumn === 'right'
      ? 'hidden'
      : 'visible'};
`;

const Clone = styled(Container)`
  ~ div {
    transform: none !important;
  }
`;

const ItemType = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 1.5rem;
  border-right: 1px solid lightgrey;
  color: ${(props) => {
    const color = props.status || props.type;
    switch (color) {
      case 'draft':
        return '#555';
      default:
        return '#fff';
    }
  }};
  background-color: ${(props) => {
    const color = props.status || props.type;
    switch (color) {
      case 'published':
        return '#2ECC40';
      case 'modified':
        return '#FF851B';
      case 'link':
        return '#0074D9';
      case 'syndicated':
        return '#B10DC9';
      case 'draft':
        return '#fff';
      case 'group':
      default:
        return '#AAAAAA';
    }
  }};
  div {
    position: absolute;
    left: 100%;
    bottom: 50%;
    transform: rotate(270deg) translateX(-50%);
    transform-origin: left bottom 0;
    font-size: 0.67rem;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 1.5rem;
  }
`;

const ItemDetails = styled.div`
  flex: 1 1 auto;
  min-width: 0; /* flex child text overflow fix */
  background-color: #fff;
`;

const ItemName = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.5rem 0.5rem 0rem;
`;

const ItemSlug = styled.div`
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0rem 0.5rem 0.5rem;
`;

const MetaData = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #eee;
  font-size: 0.8rem;
  padding: 0.25rem;
`;

const MetaDataItem = styled.div`
  text-align: right;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: #4e4e4e;
`;

function ItemContent({ item }) {
  const itemTypeLabel =
    item.status || (item.type !== 'group' ? item.type : null);

  return (
    <>
      <ItemType type={item.type} status={item.status}>
        <div>{itemTypeLabel}</div>
      </ItemType>
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemSlug>{item.slug}</ItemSlug>
        <MetaData>
          <MetaDataItem>
            <span
              role="img"
              aria-label="person icon"
              style={{ marginRight: '0.25rem' }}
            >
              &#128100;
            </span>
            {item.lastEditedBy}
          </MetaDataItem>
          <MetaDataItem>
            <span
              role="img"
              aria-label="clock icon"
              style={{ marginRight: '0.25rem' }}
            >
              &#x1F550;
            </span>
            {item.lastEditDate}
          </MetaDataItem>
        </MetaData>
      </ItemDetails>
    </>
  );
}

export default function Item(props) {
  const { item, index, startColumn, isDraggingFromLeft } = props;
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <>
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              isDraggingFromLeft={isDraggingFromLeft}
              startColumn={startColumn}
            >
              <ItemContent item={item} />
            </Container>
            {snapshot.isDragging &&
              snapshot.draggingOver !== startColumn &&
              startColumn === 'right' && (
                <Clone>
                  <ItemContent item={item} />
                </Clone>
              )}
          </>
        );
      }}
    </Draggable>
  );
}
