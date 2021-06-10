import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { AppState } from '../app.model';
import { TableActions } from './state';
import {
  ReorderTableEvent,
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
export class TableComponent implements OnInit, OnDestroy {
  sortState$: Observable<TableSortState> = this.store
    .select((state) => state.table.sort)
    .pipe(
      tap(
        (sortState) => (this.hasSorting = sortState.sortDirection !== undefined)
      )
    );
  private searchEventsSubject = new Subject<string>();
  debouncedSearchEvents$ = this.searchEventsSubject
    .asObservable()
    .pipe(debounceTime(200));
  private searchEventsSubscription: Subscription;
  searchString$: Observable<string> = this.store
    .select((state) => state.table.searchString)
    .pipe(tap((searchString) => (this.hasSearch = searchString !== '')));

  @Input() columns: TableColumn[] = [];
  @Input() title: string = '';
  @Input() data: any[] | null = [];
  @Input() searchByFields: string[] = [];
  @Output() reorderRows = new EventEmitter<ReorderTableEvent>();
  hasSearch: boolean = false;
  hasSorting: boolean = false;

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

  sortColumn(sort: TableSort, column: TableColumn) {
    this.store.dispatch(
      TableActions.sortColumn({ sortDirection: sort, column })
    );
  }

  toggleSort(column: TableColumn, previousSort: TableSortState) {
    if (previousSort.column.accessor === column.accessor) {
      if (previousSort.sortDirection === 'DESC') {
        this.clearSorting();
      } else {
        this.sortColumn('DESC', column);
      }
      return;
    }
    this.sortColumn('ASC', column);
  }

  drop(event: CdkDragDrop<any[]>, tableState: TableState) {
    if (this.hasSearch || this.hasSorting) {
      console.log('cannot ');
      return;
    }
    this.reorderRows.emit({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    });
  }

  clearSorting() {
    this.store.dispatch(TableActions.clearSorting());
  }
}
