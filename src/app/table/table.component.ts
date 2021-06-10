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
import { UtilsActions } from '../utils-state';
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
export class TableComponent implements OnDestroy {
  sortState$: Observable<TableSortState> = this.store
    .select((state) => state.table.sort)
    .pipe(
      tap(
        (sortState) => (this.hasSorting = sortState.sortDirection !== undefined)
      )
    );
  searchString$: Observable<string> = this.store
    .select((state) => state.table.searchString)
    .pipe(tap((searchString) => (this.hasSearch = searchString !== '')));

  private hasSearch: boolean = false;
  private hasSorting: boolean = false;
  private searchEventsSubject = new Subject<string>();
  private debouncedSearchEvents$ = this.searchEventsSubject
    .asObservable()
    .pipe(debounceTime(200));
  private searchEventsSubscription: Subscription;

  @Input() title: string = '';
  @Input() data: any[] | null = [];
  /**
   * Object properties/Column accessors to look for while searching
   */
  @Input() columns: TableColumn[] = [];
  @Input() searchByFields: string[] = [];
  @Output() reorderRows = new EventEmitter<ReorderTableEvent>();

  constructor(private store: Store<AppState>) {
    this.searchEventsSubscription = this.debouncedSearchEvents$.subscribe(
      (searchString) =>
        this.store.dispatch(TableActions.filterBySearch({ searchString }))
    );
  }

  ngOnDestroy(): void {
    this.searchEventsSubscription.unsubscribe();
  }

  search(searchString: string) {
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

  /**
   * Cycles through sort states
   */
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

  clearSorting() {
    this.store.dispatch(TableActions.clearSorting());
  }

  dropRow(event: CdkDragDrop<any[]>) {
    if (this.hasSorting) {
      this.store.dispatch(
        UtilsActions.pushToast({
          title: 'Cannot reorder when rows are sorted',
          callbackTitle: 'Clear Sorting',
          callback: () => this.store.dispatch(TableActions.clearSorting()),
        })
      );
      return;
    } else if (this.hasSearch) {
      this.store.dispatch(
        UtilsActions.pushToast({
          title: 'Cannot reorder when rows are filtered by search',
          callbackTitle: 'Clear Search',
          callback: () => this.store.dispatch(TableActions.clearSearch()),
        })
      );
      return;
    }
    this.reorderRows.emit({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    });
  }
}
