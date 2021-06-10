import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDays } from 'date-fns';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TaskType } from './task.model';

function getRandomDuration(): { dueAtDistance: string; dueAt: Date } {
  const random = Math.floor(Math.random() * 10);
  if (random === 0) {
    return { dueAtDistance: 'Today', dueAt: new Date() };
  } else if (random === 1) {
    return { dueAtDistance: 'Today', dueAt: addDays(new Date(), 1) };
  }
  return {
    dueAtDistance: `in ${random} days`,
    dueAt: addDays(new Date(), random),
  };
}
@Injectable({
  providedIn: 'root',
})
export class TaskTableDataService {
  constructor(private http: HttpClient) {}

  public fetchTasks(): Observable<TaskType[]> {
    return timer(200).pipe(
      switchMap((_) =>
        this.http
          .get<TaskType[]>('https://jsonplaceholder.typicode.com/todos')
          .pipe(
            // Generate placeholder data
            map((baseTasks) =>
              baseTasks.map((baseTask) => ({
                ...baseTask,
                assignedTo: baseTask.title.split(' ')[1],
                ...getRandomDuration(),
              }))
            )
          )
      )
    );
  }
}
