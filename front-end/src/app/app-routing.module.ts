import { NewBoardComponent } from './pages/new-board/new-board.component';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'boards', pathMatch: 'full' },
  { path: 'boards', component: BoardViewComponent },
  { path: 'boards/:id', component: MainViewComponent },
  { path: 'new-board', component: NewBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
