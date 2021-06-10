export type TableSort = 'ASC' | 'DESC' | undefined;

export interface TableSortState {
  column: TableColumn;
  sortDirection: TableSort;
}

export interface TableState {
  sort: TableSortState;
  searchString: string;
}

export interface TableColumnBase {
  name: string;
  accessor: string;
}
export interface TableColumnAlphanumeric extends TableColumnBase {
  sortType: 'alphanumeric';
}
export interface TableColumnDatetime extends TableColumnBase {
  sortType: 'datetime';
  /**
   * Property key to use for sorting datetime column as opposed to `accessor` which is used for display values
   */
  sortValueKey: string;
}

export type TableColumn = TableColumnDatetime | TableColumnAlphanumeric;

export interface ReorderTableEvent {
  currentIndex: number;
  previousIndex: number;
}
