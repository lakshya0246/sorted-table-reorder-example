import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
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
  TableState,
} from './table.types';

@Component({
  selector: 'awesome-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnDestroy, OnChanges {
  tableState$: Observable<TableState> = this.store.select(
    (state) => state.table
  );

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

  constructor(private store: Store<AppState>) {
    this.searchEventsSubscription = this.debouncedSearchEvents$.subscribe(
      (searchString) =>
        this.store.dispatch(TableActions.filterBySearch({ searchString }))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.store.dispatch(
        TableActions.setData({ data: changes.data.currentValue })
      );
    }
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
  toggleSort(
    column: TableColumn,
    previousSort: TableSortState,
    tableState: TableState
  ) {
    if (tableState.sort.customSorting.applied) {
      this.store.dispatch(
        UtilsActions.pushToast({
          title: 'Custom ordering cannot be applied with sorting',
          callbackTitle: 'Clear ordering',
          callback: () =>
            this.store.dispatch(TableActions.clearCustomSorting()),
        })
      );
      return;
    }
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

  clearCustomSorting() {
    this.store.dispatch(TableActions.clearCustomSorting());
  }

  dropRow(event: CdkDragDrop<any[]>, tableState: TableState) {
    const hasSort = tableState.sort.sortDirection !== undefined;
    const hasSearch = tableState.searchString !== '';
    const hasCustomSort = tableState.sort.customSorting.applied;

    if (hasSearch) {
      this.store.dispatch(
        UtilsActions.pushToast({
          title: 'Cannot reorder when rows are filtered by search',
          callbackTitle: 'Clear Search',
          callback: () => this.store.dispatch(TableActions.clearSearch()),
        })
      );
      return;
    }

    if (hasSort && !hasCustomSort) {
      this.store.dispatch(
        TableActions.branchToCustomOrderOnReorder({
          currentIndex: event.currentIndex,
          previousIndex: event.previousIndex,
        })
      );
      return;
    }

    this.store.dispatch(
      TableActions.reorderRows({
        currentIndex: event.currentIndex,
        previousIndex: event.previousIndex,
      })
    );
  }
}
