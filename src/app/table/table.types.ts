export type TableSort = 'ASC' | 'DESC' | undefined;

export interface TableSortState {
  columnAccessor: string;
  sortDirection: TableSort;
}

export interface TableState {
  sort: TableSortState;
  searchString: string;
}

export interface TableColumn {
  name: string;
  accessor: string;
  sortType: 'alphanumeric' | 'datetime';
}
