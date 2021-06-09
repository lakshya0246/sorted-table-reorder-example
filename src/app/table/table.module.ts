import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from './pipes/sort.pipe';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [SortPipe, TableComponent],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
