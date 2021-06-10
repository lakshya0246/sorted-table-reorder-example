import { TABLE_REDUCER_IDENTIFIER } from './table/state';
import { TableState } from './table/table.types';
import { TASKS_REDUCER_IDENTIFIER } from './task-table/state';
import { TaskType } from './task-table/task.model';
import { UTILS_REDUCER_IDENTIFIER } from './utils-state';
import { Toast, UtilsState } from './utils-state/utils.model';

export interface AppState {
  [TABLE_REDUCER_IDENTIFIER]: TableState;
  [TASKS_REDUCER_IDENTIFIER]: TaskType[];
  [UTILS_REDUCER_IDENTIFIER]: UtilsState;
}
