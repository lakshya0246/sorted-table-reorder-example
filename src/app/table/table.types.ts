export type TableSort = 'ASC' | 'DESC' | undefined;

export interface TableSortState {
  column: TableColumn;
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

export interface ReorderTableEvent {
  currentIndex: number;
  previousIndex: number;
}
