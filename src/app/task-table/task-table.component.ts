import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskTableActions } from './state';

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
  tasks$: Observable<TaskType[]> = this.store.select((state) => state.tasks);
  constructor(private store: Store<{ tasks: TaskType[] }>) {}

  ngOnInit(): void {
    this.store.dispatch(TaskTableActions.fetchTasks());
  }
}
