export type TableSort = 'ASC' | 'DESC' | undefined;

export interface TableSortState {
  columnAccessor: string;
  sort: TableSort;
}

export interface TableState {
  sort: TableSortState;
}

export interface TableColumn {
  name: string;
  accessor: string;
  sorting?: TableSort;
  sortType?: 'alphanumeric' | 'datetime' | 'basic';
}
