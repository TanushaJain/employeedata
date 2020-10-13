import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './../data.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css']
})
export class DeletedComponent implements OnInit {
deleted$;
index;
employee$=[];
  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.deleted$=this.dataservice.deleted;
    console.log(this.deleted$);
  }
  restore(value)
  {
    this.index=this.deleted$.findIndex(x=>x.id === value);
    this.employee$.push(this.deleted$[this.index]);
    this.deleted$.splice(this.index,1);
    this.dataservice.addEmployee(this.employee$);
  }
}
