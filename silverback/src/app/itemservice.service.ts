import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { from } from 'rxjs';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {
  exe:any;
  counter:any;
  constructor() { 
  }
  public setExtras(data){
    this.exe = data
  }
  public getExtras(){
    return this.exe;
  }

  public setCounter(data){
    this.counter = data
  }
  public getCounter(){
    return this.counter;
  }

}
