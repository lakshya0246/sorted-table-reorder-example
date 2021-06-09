import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskEffects } from './task-table/task-effects';
import { EffectsModule } from '@ngrx/effects';
import { SortPipe } from './table/sort.pipe';
import { TaskTableComponent } from './task-table/task-table.component';
import { TaskTableModule } from './task-table/task-table.module';

@NgModule({
  declarations: [AppComponent, TableComponent, SortPipe, TaskTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    TaskTableModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
