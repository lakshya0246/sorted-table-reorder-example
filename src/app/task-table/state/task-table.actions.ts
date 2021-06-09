import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { createAction, props } from '@ngrx/store';
import { TaskType } from '../task.model';

export const fetchTasks = createAction('[Tasks] Fetch');

export const fetchTasksFinished = createAction(
  '[Tasks] Fetch Finished Success',
  props<{ tasks: TaskType[] }>()
);

export const reorderTasks = createAction(
  '[Tasks] Reorder Tasks Local',
  props<{ currentIndex: number; previousIndex: number }>()
);

export const fetchTasksFailed = createAction('[Tasks] Fetch Failed');
