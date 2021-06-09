import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TaskType } from './task.model';

function getRandomDuration(): string {
  const random = Math.floor(Math.random() * 10);
  if (random === 0) {
    return 'Today';
  } else if (random === 1) {
    return 'Tomorrow';
  }
  return `in ${random} days`;
}
@Injectable({
  providedIn: 'root',
})
export class TaskTableDataService {
  constructor(private http: HttpClient) {}

  public fetchTasks(): Observable<TaskType[]> {
    return timer(3000).pipe(
      switchMap((_) =>
        this.http
          .get<TaskType[]>('https://jsonplaceholder.typicode.com/todos')
          .pipe(
            // Generate placeholder data
            map((baseTasks) =>
              baseTasks.map((baseTask) => ({
                ...baseTask,
                assignedTo: baseTask.title.split(' ')[1],
                dueIn: getRandomDuration(),
              }))
            )
          )
      )
    );
  }
}
