import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TaskTableDataService } from '../task-table-data.service';
import { TaskTableActions } from '.';

@Injectable({
  providedIn: 'root',
})
export class TaskTableEffects {
  constructor(private actions$: Actions, private data: TaskTableDataService) {}
  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskTableActions.fetchTasks),
      mergeMap(() =>
        this.data.fetchTasks().pipe(
          map((tasks) => TaskTableActions.fetchTasksFinished({ tasks })),
          catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
        )
      )
    )
  );
}
