import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReorderTableEvent } from '../table/table.types';
import { TaskTableActions } from './state';
import {
  TASK_TABLE_COLUMNS,
  TASK_TABLE_COLUMNS_ACCESSORS,
} from './task-table.constants';
import { TaskType } from './task.model';

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
  readonly TABLE_COLUMNS = TASK_TABLE_COLUMNS;
  readonly COLUMN_ACCESSORS = TASK_TABLE_COLUMNS_ACCESSORS;
  tasksAsTableData$: Observable<any[]> = this.store
    .select((state) => state.tasks)
    .pipe(
      map((tasks) =>
        tasks.map((_task: TaskType) => {
          return {
            ..._task,
            [TASK_TABLE_COLUMNS_ACCESSORS.TITLE]: _task.title,
            [TASK_TABLE_COLUMNS_ACCESSORS.DUE_AT_DISTANCE]: _task.dueAtDistance,
            [TASK_TABLE_COLUMNS_ACCESSORS.ASSIGNED_TO]: _task.assignedTo,
          };
        })
      )
    );

  constructor(private store: Store<{ tasks: TaskType[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(TaskTableActions.fetchTasks());
  }

  reorderRows(event: ReorderTableEvent): void {
    this.store.dispatch(
      TaskTableActions.reorderTasks({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
      })
    );
  }
}
