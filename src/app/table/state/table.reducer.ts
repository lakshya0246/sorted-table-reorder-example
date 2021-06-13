import { createReducer, on } from '@ngrx/store';
import { TableActions } from '.';
import { SortPipe } from '../pipes/sort.pipe';
import { moveItemInArray } from '../table.helpers';
import {
  ReorderTableEvent,
  TableColumn,
  TableSortState,
  TableState,
} from '../table.types';

export const TABLE_REDUCER_IDENTIFIER = 'table';
const INIT_TABLE_COLUMN: TableColumn = {
  name: '',
  accessor: '',
  sortType: 'alphanumeric',
};

export const INITIAL_STATE: TableState = {
  data: [],
  searchString: '',
  sort: {
    column: INIT_TABLE_COLUMN,
    sortDirection: undefined,
    customSorting: { applied: false, masterList: [] },
  },
};

export const tableReducer = createReducer(
  INITIAL_STATE,
  on(TableActions.setData, (state, action) => ({
    ...state,
    data: action.data,
  })),

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
  on(TableActions.sortColumn, (state, action) => ({
    ...state,
    sort: { ...state.sort, ...action },
  })),
  on(TableActions.clearSorting, (state, action) => ({
    ...state,
    sort: INITIAL_STATE.sort,
  })),

  // Ordering
  on(TableActions.reorderRows, (state, action) => ({
    ...state,
    data: moveItemInArray(
      [...state.data],
      action.previousIndex,
      action.currentIndex
    ),
  })),
  on(TableActions.branchToCustomOrderOnReorder, (state, action) => ({
    ...state,
    data: getBranchedList(state.data, action, state.sort),
    sort: {
      ...INITIAL_STATE.sort,
      customSorting: {
        applied: true,
        masterList: state.data,
      },
    },
  })),
  on(TableActions.clearCustomSorting, (state, action) => ({
    ...state,
    data: state.sort.customSorting.masterList,
    sort: INITIAL_STATE.sort,
  }))
);

const sortPipe = new SortPipe();
function getBranchedList(
  data: any[],
  reorderEvent: ReorderTableEvent,
  sortConfig: TableSortState
): any[] {
  const sorted = sortPipe.transform(data, sortConfig) as any[];

  return moveItemInArray(
    [...sorted],
    reorderEvent.previousIndex,
    reorderEvent.currentIndex
  );
}
