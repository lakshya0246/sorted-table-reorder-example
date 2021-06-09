import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  private searchEventsSubject = new Subject<string>();
  searchEvents$ = this.searchEventsSubject
    .asObservable()
    .pipe(debounceTime(200));
  private searchEventsSubscription: Subscription;
  searchString: string = '';
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] | null = [];
  @Input() searchByFields: string[] = [];

  constructor(private store: Store<AppState>) {
    this.searchEventsSubscription = this.searchEvents$.subscribe(
      (searchString) =>
        this.store.dispatch(TableActions.filterBySearch({ searchString }))
    );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.searchEventsSubscription.unsubscribe();
  }

  search(searchString: any) {
    this.searchEventsSubject.next(searchString);
  }

  sortColumn(sort: TableSort, columnAccessor: string) {
    this.store.dispatch(
      TableActions.sortColumn({ sortDirection: sort, columnAccessor })
    );
  }

  clearSorting() {
    this.store.dispatch(TableActions.clearSorting());
  }
}
