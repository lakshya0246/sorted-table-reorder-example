import { createReducer, on } from '@ngrx/store';
import { TaskType } from '../task.model';
import * as TaskActions from './task-table.actions';

export const TASKS_REDUCER_IDENTIFIER = 'tasks';
export const INITIAL_STATE: TaskType[] = [];

export const tasksReducer = createReducer(
  INITIAL_STATE,
  on(TaskActions.fetchTasksFinished, (state, action) => action.tasks)
);
