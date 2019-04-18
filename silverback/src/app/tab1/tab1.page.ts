import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemserviceService } from '../itemservice.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { defaultStyleSanitizer } from '@angular/core/src/sanitization/sanitization';
import { ExerciseDetailPage } from '../exercise-detail/exercise-detail.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  exercises:any;
  exe:Observable<any[]>;
  restday:boolean = false
  exercisesArray = []
  constructor(private router: Router, public itemService: ItemserviceService, private route: ActivatedRoute) {
    //var userid = firebase.auth().currentUser.uid;
    //console.log(userid)
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

    var userid = "nQ6S99pYYzLhzHf4UFRgXfcFiuu1"
    var refs = firebase.database().ref('workout/' + userid.toString() + '/FinalPlan');
    refs.once('value', (snapshot) => {
      this.exercises = snapshot.val();  
    }).then(() => {
      for (let i = 0; i < this.exercises.length; ++i) {
        if (this.exercises[i].day == dayString) {
          //console.log(this.exercises[i].workout);
          this.exercisesArray = this.exercises[i].workout;
        }
      }
      if (this.exercisesArray[0] == undefined){
        console.log("REST DAY")
        this.restday = true
      }
    });
    //this.itemService.loadItems()
    
 
  }

  ngOnInit() {


  }
  
  exerciseDetail(item) {
    console.log(item);

   this.router.navigate(["/exercise-detail"], item);
  }

}
