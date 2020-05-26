import { Board } from './../../models/board.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.sass']
})
export class BoardViewComponent implements OnInit {

  boards: Board[];

  constructor(private appServ: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.appServ.getBoards().subscribe((boards: Board[]) => {
      // console.log(boards);
      this.boards = boards;
    });
  }

}
