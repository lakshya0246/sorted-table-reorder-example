import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TaskType } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public fetchTasks(): Observable<TaskType[]> {
    return timer(3000).pipe(
      switchMap((_) =>
        this.http.get<TaskType[]>('https://jsonplaceholder.typicode.com/todos')
      )
    );
  }
}
