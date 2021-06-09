import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskTableReducers, TASKS_REDUCER_IDENTIFIER } from './state';
import { TaskTableEffects } from './state';
import { TableModule } from '../table/table.module';
import { TaskTableComponent } from './task-table.component';

@NgModule({
  declarations: [TaskTableComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      TASKS_REDUCER_IDENTIFIER,
      TaskTableReducers.tasksReducer
    ),
    EffectsModule.forFeature([TaskTableEffects.TaskTableEffects]),
    TableModule,
  ],
  exports: [TaskTableComponent],
})
export class TaskTableModule {}
