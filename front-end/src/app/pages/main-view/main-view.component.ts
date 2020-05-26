import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from './../../models/board.model';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.sass']
})
export class MainViewComponent implements OnInit {

  myBoard: Board;
  myColumns: Column[];
  boardId: string;
  boardTitle: string;
  arrayBox;

  constructor(private appServ: AppService, private route: ActivatedRoute, private router: Router) { }

  // dummyBoard: Board = new Board ('Test Board', [
  //   new Column('Idea', ['Teste 1', 'Teste 2', 'Teste 3'] ),
  //   new Column('ToDo', ['Teste 4', 'Teste 5', 'Teste 6'] ),
  //   new Column('Done', ['Teste 7', 'Teste 8'] )
  // ]);

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id){
          this.boardId = params.id;
          // console.log(this.boardId);

          // Getting board data

          this.appServ.getBoard(this.boardId).subscribe((board: Board) => {
            this.myBoard = board;
            this.boardTitle = this.myBoard.title;

            // Getting columns data

            this.appServ.getColumns(this.myBoard._id).subscribe((columns: Column[]) => {
              this.myColumns = columns;
              // console.log(this.myColumns);

              // And now we gonna collect the tasks for each column

              this.myColumns.forEach((column) => {

                // Retrieving the tasks

                this.appServ.getTasks(column._boardId, column._id).subscribe((tasks: Task[]) => {
                  column.tasks = tasks;
                  console.log(column.tasks);
                });
              });
            });
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
