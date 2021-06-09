import { Action, createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { TaskType } from './task.model';

export const TASKS_REDUCER_IDENTIFIER = 'tasks';
export const INITIAL_STATE: TaskType[] = [];

export const tasksReducer = createReducer(
  INITIAL_STATE,
  on(TaskActions.fetchTasksFinished, (state, action) => action.tasks)
);
