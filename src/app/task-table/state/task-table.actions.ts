import { createAction, props } from '@ngrx/store';
import { TaskType } from '../task.model';

export const fetchTasks = createAction('[Tasks] Fetch');

export const fetchTasksFinished = createAction(
  '[Tasks] Fetch Finished Success',
  props<{ tasks: TaskType[] }>()
);

export const fetchTasksFailed = createAction('[Tasks] Fetch Failed');
