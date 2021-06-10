import { createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { UtilsActions } from '.';
import { UtilsState } from './utils.model';

export const UTILS_REDUCER_IDENTIFIER = 'utils';

export const INITIAL_STATE: UtilsState = {
  toasts: [],
};

export const utilsReducer = createReducer(
  INITIAL_STATE,
  on(UtilsActions.pushToast, (state, action) => {
    const toastId = uuidv4();
    return {
      ...state,
      toasts: [
        ...state.toasts,
        {
          ...action,
          id: toastId,
        },
      ],
    };
  }),
  on(UtilsActions.clearToast, (state, action) => ({
    ...state,
    toasts: state.toasts.filter((toast) => toast.id !== action.id),
  }))
);
