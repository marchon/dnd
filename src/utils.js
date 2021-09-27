export function reorder(start, destination, source, draggableId) {
  const newItemIds = [...start.itemIds];
  newItemIds.splice(source.index, 1);
  newItemIds.splice(destination.index, 0, draggableId);

  const column = {
    ...start,
    itemIds: newItemIds,
  };

  return (prevState) => ({
    ...prevState,
    columns: {
      ...prevState.columns,
      [column.id]: column,
    },
  });
}

export function copy(finish, copiedItem) {
  return (prevState) => ({
    ...prevState,
    items: {
      ...prevState.items,
      [copiedItem.id]: copiedItem,
    },
    columns: {
      ...prevState.columns,
      [finish.id]: {
        ...finish,
        itemIds: [...finish.itemIds, copiedItem.id],
      },
    },
  });
}
