import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { TableReducers, TABLE_REDUCER_IDENTIFIER } from './state';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [SortPipe, TableComponent, SearchPipe],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      TABLE_REDUCER_IDENTIFIER,
      TableReducers.tableSortReducer
    ),
  ],
  exports: [TableComponent],
})
export class TableModule {}
