import { createAction, props } from '@ngrx/store';
import { ReorderTableEvent, TableSortState } from '../table.types';

export const sortColumn = createAction(
  '[Table] Sort Column',
  props<Omit<TableSortState, 'customSorting'>>()
);

export const setData = createAction(
  '[Table] Set Table Data',
  props<{ data: any[] }>()
);

export const clearSorting = createAction('[Table] Clear Sorting');

export const branchToCustomOrderOnReorder = createAction(
  '[Table] Branch to Custom Ordering on Reorder',
  props<ReorderTableEvent>()
);

export const reorderRows = createAction(
  '[Table] Reorder Rows',
  props<ReorderTableEvent>()
);

export const clearCustomSorting = createAction('[Table] Clear Custom Sorting');

export const filterBySearch = createAction(
  '[Table] Filter by Search',
  props<{ searchString: string }>()
);

export const clearSearch = createAction('[Table] Clear Search');
