export type TableSort = 'ASC' | 'DESC' | undefined;

export interface TableSortState {
  column: TableColumn;
  sortDirection: TableSort;
  customSorting: {
    applied: boolean;
    /**
     * State of date before applying custom sort, reverts back to this when custom sort cleared
     */
    masterList: any[];
  };
}

export interface TableState {
  sort: TableSortState;
  searchString: string;
  data: any[];
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
