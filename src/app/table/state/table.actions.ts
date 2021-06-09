import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { createAction, props } from '@ngrx/store';
import { TableSortState } from '../table.types';

export const sortColumn = createAction(
  '[Table] Sort Column',
  props<TableSortState>()
);

export const clearSorting = createAction('[Table] Clear Sorting');

export const filterBySearch = createAction(
  '[Table] Filter by Search',
  props<{ searchString: string }>()
);

export const clearSearch = createAction('[Table] Clear Search');
