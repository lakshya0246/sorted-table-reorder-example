import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchTasks } from '../task.actions';
import { TaskType } from '../task.model';
import { DataService } from './data.service';
import { TableSort } from './table.types';

@Component({
  selector: 'awesome-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  tasks$: Observable<TaskType[]> = this.store.select((state) => state.tasks);
  sort: TableSort = undefined;
  constructor(
    private data: DataService,
    private store: Store<{ tasks: TaskType[] }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fetchTasks());
  }
}
