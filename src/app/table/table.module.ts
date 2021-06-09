import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ClearableInputDirective } from './directives/clearable-input.directive';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { TableReducers, TABLE_REDUCER_IDENTIFIER } from './state';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [SortPipe, TableComponent, SearchPipe, ClearableInputDirective],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(
      TABLE_REDUCER_IDENTIFIER,
      TableReducers.tableReducer
    ),
  ],
  exports: [TableComponent],
})
export class TableModule {}
