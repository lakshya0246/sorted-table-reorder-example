import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppState } from '../app.model';
import { TableActions } from './state';
import { TableColumn, TableSort, TableSortState } from './table.types';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'awesome-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  sortConfig$: Observable<TableSortState> = this.store.select(
    (state) => state.table.sort
  );
  private searchEventsSubject = new Subject<string>();
  debouncedSearchEvents$ = this.searchEventsSubject
    .asObservable()
    .pipe(debounceTime(200));
  private searchEventsSubscription: Subscription;
  searchString$: Observable<string> = this.store.select(
    (state) => state.table.searchString
  );
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] | null = [];
  @Input() searchByFields: string[] = [];
  @Output() reorderRows = new EventEmitter<CdkDragDrop<any[]>>();

  constructor(private store: Store<AppState>) {
    this.searchEventsSubscription = this.debouncedSearchEvents$.subscribe(
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

  clearSearch() {
    this.store.dispatch(TableActions.clearSearch());
  }

  sortColumn(sort: TableSort, columnAccessor: string) {
    this.store.dispatch(
      TableActions.sortColumn({ sortDirection: sort, columnAccessor })
    );
  }

  drop(event: CdkDragDrop<any[]>) {
    this.reorderRows.emit(event);
  }

  clearSorting() {
    this.store.dispatch(TableActions.clearSorting());
  }
}
