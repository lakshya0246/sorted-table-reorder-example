import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.model';
import { TableActions } from './state';
import { TableColumn, TableSort } from './table.types';

@Component({
  selector: 'awesome-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  sortConfig$: Observable<any> = this.store.select((state) => state.table.sort);
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] | null = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  sortColumn(sort: TableSort, columnAccessor: string) {
    this.store.dispatch(
      TableActions.sortColumn({ sortDirection: sort, columnAccessor })
    );
  }
  clearSorting() {
    this.store.dispatch(TableActions.clearSorting());
  }
}
