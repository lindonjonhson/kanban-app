import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.sass']
})
export class NewTaskComponent implements OnInit {

  boardId: string;
  columnId: string;

  constructor(private appServ: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.boardId = params.boardId;
        this.columnId = params.columnId;
      }
    );
  }

}
