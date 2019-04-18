import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { from } from 'rxjs';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {
  exe:Observable<any[]>;
  exercises = [];
  constructor() { 
  }
  getItems(){
    
  }

  getDate(){
    var d = new Date();
    var day = d.getDay();
    var dayString = "";
    if (day == 0) {
      dayString = "Sunday";
    } else if (day == 1) {
      dayString = "Monday";
    } else if (day == 2) {
      dayString = "Tuesday";
    } else if (day == 3) {
      dayString = "Wednesday";
    } else if (day == 4) {
      dayString = "Thursday";
    } else if (day == 5) {
      dayString = "Friday";
    } else if (day == 6) {
      dayString = "Saturday";
    }
    return dayString
  }

   loadItems(){
    var exer = [];
    var source
    //console.log("LOADING ITEMS")
    var dayString = this.getDate()
    var userid = "nQ6S99pYYzLhzHf4UFRgXfcFiuu1"
    var refs = firebase.database().ref('workout/' + userid.toString() + '/FinalPlan');
    refs.once('value', (snapshot) => {
      exer = snapshot.val();  
    }).then(() => {      
      for (let i = 0; i < exer.length; ++i) {
        if (exer[i].day == dayString) {
          //console.log(exer[i].workout)
          source = from(exer[i].workout)
        }
      }
      if (exer[0] == undefined){
        console.log("REST DAY")
      }
      console.log(source)
      return source
    });
  }
}
