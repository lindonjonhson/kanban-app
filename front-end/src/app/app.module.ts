import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewBoardComponent } from './pages/new-board/new-board.component';
import { NewColumnComponent } from './pages/new-column/new-column.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    BoardViewComponent,
    NewTaskComponent,
    NewBoardComponent,
    NewColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
