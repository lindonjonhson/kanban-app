import { NewColumnComponent } from './pages/new-column/new-column.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewBoardComponent } from './pages/new-board/new-board.component';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'boards', pathMatch: 'full' },
  { path: 'boards', component: BoardViewComponent },
  { path: 'boards/:id', component: MainViewComponent },
  { path: 'new-board', component: NewBoardComponent },
  { path: 'new-column', component: NewColumnComponent },
  { path: 'new-task', component: NewTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
