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
import { debounceTime } from 'rxjs/operators';
import { AppState } from '../app.model';
import { TableActions } from './state';
import {
  ReorderTableEvent,
  TableColumn,
  TableSort,
  TableSortState,
} from './table.types';

@Component({
  selector: 'awesome-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  sortState$: Observable<TableSortState> = this.store.select(
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
  @Input() title: string = '';
  @Input() data: any[] | null = [];
  @Input() searchByFields: string[] = [];
  @Output() reorderRows = new EventEmitter<ReorderTableEvent>();

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

  drop(event: CdkDragDrop<any[]>, sortState: TableSortState) {
    if (sortState.sortDirection === undefined) {
      this.reorderRows.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
      });
    } else {
      console.log('cannot ');
    }
  }

  clearSorting() {
    this.store.dispatch(TableActions.clearSorting());
  }
}
