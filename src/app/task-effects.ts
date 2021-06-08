import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataService } from './table/data.service';
import * as TaskActions from './task.actions';

@Injectable({
  providedIn: 'root',
})
export class TaskEffects {
  constructor(private actions$: Actions, private data: DataService) {}
  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.fetchTasks),
      mergeMap(() =>
        this.data.fetchTasks().pipe(
          map((tasks) => TaskActions.fetchTasksFinished({ tasks })),
          catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
        )
      )
    )
  );
}
