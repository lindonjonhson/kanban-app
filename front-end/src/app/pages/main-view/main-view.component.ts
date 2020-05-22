import { AppService } from './../../services/app.service';
import { Board } from './../../models/board.model';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Column } from 'src/app/models/column.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.sass']
})
export class MainViewComponent implements OnInit {

  board: Board;
  boardId: string;
  boardTitle: string;

  constructor(private appServ: AppService, private route: ActivatedRoute, private router: Router) { }

  dummyBoard: Board = new Board ('Test Board', [
    new Column('Idea', ['Teste 1', 'Teste 2', 'Teste 3'] ),
    new Column('ToDo', ['Teste 4', 'Teste 5', 'Teste 6'] ),
    new Column('Done', ['Teste 7', 'Teste 8'] )
  ]);

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id){
          this.boardId = params.id;
          console.log(this.boardId);
          this.appServ.getBoard(this.boardId).subscribe((board: Board) => {
            this.board = board;
            this.boardTitle = board.title;
          });
        }
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
