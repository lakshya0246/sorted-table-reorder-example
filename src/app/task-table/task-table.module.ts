import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tasksReducer, TASKS_REDUCER_IDENTIFIER } from './task.reducer';
import { TaskEffects } from './task-effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(TASKS_REDUCER_IDENTIFIER, tasksReducer),
    EffectsModule.forFeature([TaskEffects]),
  ],
})
export class TaskTableModule {}
