import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ map, toArray} from 'rxjs/operators';
import { DataService } from './../data.service';
import {from} from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  data$;
  deleted$=[];
  index;
  form;
  adding=false;
  employee:object;
  constructor( fb: FormBuilder, private dataservice: DataService) {
    this.form=fb.group({
      name:['',[
        Validators.required
      ]],
      id:['',[
        Validators.required
      ]],
      skills:['',[
        Validators.required
      ]],
      project:['',[
        Validators.required
      ]],
      hcm:['',[
        Validators.required
      ]]
    })
   }
   addEmployees()
   {
     this.adding=!this.adding;
   }
   get name(){
    return this.form.get('name');
   }
   get id()
   {
     return this.form.get('id');
   }
   get skills()
   {
     return this.form.get('skills');
   }
   get project()
   {
     return this.form.get('project');
   }
   get hcm(){
     return this.form.get('hcm');
   }
   onSubmit(){
    this.employee={
      name:this.name.value,
      id: this.id.value,
      skills:this.skills.value,
      project:this.project.value,
      hcm: this.hcm.value
    }
    this.dataservice.Changed(this.data$);
    this.dataservice.addEmployee(this.employee);
    console.log(this.employee);
    this.data$=this.dataservice.getData();
   }

  ngOnInit(): void {
    from(this.dataservice.getEmployees()).pipe(map(data=> this.data$=data)).subscribe(console.log);
    this.data$=this.dataservice.getData();
  }
  delete(value){
    this.index=this.data$.findIndex(x=>x.id === value);
    this.deleted$.push(this.data$[this.index]);
     this.data$.splice(this.index,1);
     this.dataservice.addDeleted(this.deleted$);
    console.log(this.deleted$);
  }
 
}
