import { createAction, props } from '@ngrx/store';
import { TableSortState } from '../table.types';

export const sortColumn = createAction(
  '[Table] Sort Column',
  props<TableSortState>()
);

export const clearSorting = createAction('[Table] Clear Sorting');
