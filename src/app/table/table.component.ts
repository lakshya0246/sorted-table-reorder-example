import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Task } from './table.types';

@Component({
  selector: 'awesome-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tasks$: Observable<Task[]>;


  constructor(private data: DataService) {
    this.tasks$ = this.data.fetchTasks();
  }

  ngOnInit(): void { }

}
