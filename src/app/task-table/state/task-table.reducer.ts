import { Action, createReducer, on } from '@ngrx/store';
import * as TaskActions from './task-table.actions';
import { TaskType } from '../task.model';

export function moveItemInArray<T = any>(
  array: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  if (fromIndex === toIndex) {
    return array;
  }

  const target = array[fromIndex];
  const delta = toIndex < fromIndex ? -1 : 1;

  for (let i = fromIndex; i !== toIndex; i += delta) {
    array[i] = array[i + delta];
  }

  array[toIndex] = target;
  return array;
}

export const TASKS_REDUCER_IDENTIFIER = 'tasks';
export const INITIAL_STATE: TaskType[] = [];

export const tasksReducer = createReducer(
  INITIAL_STATE,
  on(TaskActions.fetchTasksFinished, (state, action) => action.tasks),
  on(TaskActions.reorderTasks, (state, action) => [
    ...moveItemInArray([...state], action.previousIndex, action.currentIndex),
  ])
);
