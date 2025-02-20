export function paginateArray<T>(
  data: T[],
  page: number,
  pageSize: number = 10
): T[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
}
