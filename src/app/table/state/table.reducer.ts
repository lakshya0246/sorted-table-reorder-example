import { createReducer, on } from '@ngrx/store';
import { TableActions } from '.';
import { TableState } from '../table.types';

export const TABLE_REDUCER_IDENTIFIER = 'table';
export const INITIAL_STATE: TableState = {
  sort: {
    columnAccessor: '',
    sortDirection: undefined,
  },
};

export const tableSortReducer = createReducer(
  INITIAL_STATE,
  on(TableActions.sortColumn, (state, action) => ({ ...state, sort: action })),
  on(TableActions.clearSorting, (state, action) => ({
    ...state,
    sort: INITIAL_STATE.sort,
  }))
);
