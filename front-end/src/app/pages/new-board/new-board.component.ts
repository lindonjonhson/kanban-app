import { Board } from './../../models/board.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.sass']
})
export class NewBoardComponent implements OnInit {

  constructor(private appServ: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  createBoard(title: string){
    this.appServ.createBoard(title).subscribe((newBoard: Board) => {
      console.log(newBoard);
      this.router.navigate([`../`, ], { relativeTo: this.route});
    });
  }

}
