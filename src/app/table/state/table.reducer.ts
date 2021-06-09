import { createReducer, on } from '@ngrx/store';
import { TableActions } from '.';
import { TableState } from '../table.types';

export const TABLE_REDUCER_IDENTIFIER = 'table';
export const INITIAL_STATE: TableState = {
  searchString: '',
  sort: {
    columnAccessor: '',
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
