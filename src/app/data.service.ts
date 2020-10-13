import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataHolder=new BehaviorSubject("");
  data1=this.dataHolder.asObservable();
  data=[];
  deleted=[];
  constructor(private http: HttpClient) { }
  getEmployees(){
    
  return this.http.get('https://jsonblob.com/api/adb63601-0c87-11eb-89ae-216c8e32120e');
  }
  Changed(data)
  {
    this.data=data;
  }
  addEmployee(data)
  {
    this.data.push(data);
  }
  getData()
  {
    return this.data;
  }
  addDeleted(data)
  {
    this.deleted.push(data);
    console.log(this.deleted);
  }
  getDeleted()
  {
    return this.deleted;
  }
}
