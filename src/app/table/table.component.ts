import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskTableDataService } from '../task-table/task-table-data.service';
import { TableSort } from './table.types';

@Component({
  selector: 'awesome-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  sort: TableSort = undefined;
  @Input() data: any[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
