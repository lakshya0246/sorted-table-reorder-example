import { createReducer, on } from '@ngrx/store';
import { TableActions } from '.';
import { TableColumn, TableState } from '../table.types';

export const TABLE_REDUCER_IDENTIFIER = 'table';
const INIT_TABLE_COLUMN: TableColumn = {
  name: '',
  accessor: '',
  sortType: 'alphanumeric',
};

export const INITIAL_STATE: TableState = {
  searchString: '',
  sort: {
    column: INIT_TABLE_COLUMN,
    sortDirection: undefined,
  },
};

export const tableReducer = createReducer(
  INITIAL_STATE,
  // Search
  on(TableActions.filterBySearch, (state, action) => ({
    ...state,
    searchString: action.searchString,
  })),
  on(TableActions.clearSearch, (state, action) => ({
    ...state,
    searchString: '',
  })),

  // Sort
  on(TableActions.sortColumn, (state, action) => ({ ...state, sort: action })),
  on(TableActions.clearSorting, (state, action) => ({
    ...state,
    sort: INITIAL_STATE.sort,
  }))
);
