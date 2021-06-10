import { createAction, props } from '@ngrx/store';
import { Toast } from './utils.model';

export const pushToast = createAction(
  '[Toast] Push Toast',
  props<Omit<Toast, 'id'>>()
);

export const clearToast = createAction(
  '[Toast] Remove Toast',
  props<{ id: string }>()
);
