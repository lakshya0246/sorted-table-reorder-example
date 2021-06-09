export type TableSort = 'ASC' | 'DESC' | undefined;

export interface TableSortState {
  columnAccessor: string;
  sort: TableSort;
}

export interface TableState {
  sort: TableSortState;
}
