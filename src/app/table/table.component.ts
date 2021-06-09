import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../app.model';
import { TableActions, TABLE_REDUCER_IDENTIFIER } from './state';
import {
  TableColumn,
  TableSort,
  TableSortState,
  TableState,
} from './table.types';

@Component({
  selector: 'awesome-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  sort$: Observable<any> = this.store.select((state) => state.table.sort.sort);
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] | null = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  sortColumn(sort: TableSort) {
    this.store.dispatch(
      TableActions.sortColumn({ sort, columnAccessor: 'hey' })
    );
  }
  clearSorting() {
    this.store.dispatch(TableActions.clearSorting());
  }
}
