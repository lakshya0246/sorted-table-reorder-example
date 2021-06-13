export function moveItemInArray<T = any>(
  array: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  if (fromIndex === toIndex) {
    return array;
  }

  const target = array[fromIndex];
  const delta = toIndex < fromIndex ? -1 : 1;

  for (let i = fromIndex; i !== toIndex; i += delta) {
    array[i] = array[i + delta];
  }

  array[toIndex] = target;
  return array;
}
