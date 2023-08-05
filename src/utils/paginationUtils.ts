export function getTotalPageCount(totalCount: number, size: number): number {
  let result = Math.floor(totalCount / size);

  if (totalCount % size > 0) {
    result++;
  }

  return result;
}
