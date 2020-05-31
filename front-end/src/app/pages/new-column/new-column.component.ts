import { Column } from './../../models/column.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-column',
  templateUrl: './new-column.component.html',
  styleUrls: ['./new-column.component.sass']
})
export class NewColumnComponent implements OnInit {

  boardId: string;

  constructor(private appServ: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.boardId = params.boardId;
      }
    );
  }

  createColumn(title: string){
    this.appServ.createColumn(this.boardId, title).subscribe((newColumn: Column) => {
      console.log(newColumn);
      this.router.navigate([`/boards`, this.boardId]);
    });
  }

}
