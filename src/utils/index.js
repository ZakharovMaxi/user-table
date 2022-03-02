export function removeArrayItemByIndex(array, idx) {
  return [
    ...array.slice(0, idx),
    ...array.slice(idx + 1)
  ];
}

export function addArrayItemByIndex(array, item, idx) {
  return [
    ...array.slice(0, idx),
    item,
    ...array.slice(idx + 1)
  ];
}

export function removeArrayItemById(array, id) {
  const idx = array.findIndex((item) => item.id === id );
  return removeArrayItemByIndex(array, idx);
}

export function toggleSelectedItem(selected, id) {
  return selected.indexOf(id) === -1 ? addSelectedItem(selected, id) : removeSelectedItem(selected, id)
}

export function addSelectedItem(selected, id) {
  return Array.from(new Set([...selected, id]));
}

export function removeSelectedItem(selected, id) {
  return removeArrayItemByIndex(selected, selected.indexOf(id));
}
