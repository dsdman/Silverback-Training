import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemserviceService } from '../itemservice.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { defaultStyleSanitizer } from '@angular/core/src/sanitization/sanitization';
import { ExerciseDetailPage } from '../exercise-detail/exercise-detail.page';
import { async } from 'q';


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
  counter:any;
  restdaygif = 'assets/restDay.gif'
  constructor(private router: Router, public itemService: ItemserviceService, private route: ActivatedRoute) {
    //var userid = firebase.auth().currentUser.uid;
    //console.log(userid)
    let dayString = this.getDay()
    var userid = this.itemService.userId
    var refs = firebase.database().ref('workout/' + userid.toString() + '/FinalPlan');
    refs.on('value', (snapshot) => {
      this.updateData( snapshot.val());
    });
  }

  updateData(data) {
    this.exercisesArray = [];
    let dayString = this.getDay()
    //console.log(data)
    this.exercises = data;
    for (let i = 0; i < this.exercises.length; ++i) {
      if (this.exercises[i].day == dayString) {
        //console.log(this.exercises[i].workout);
        //console.log(this.exercises[i].workout)
        for (let j = 0; j < this.exercises[i].workout.length; j++){
          let newExercise = {
            name: this.exercises[i].workout[j].name,
            setNum: this.exercises[i].workout[j].setNum,
            sets: this.exercises[i].workout[j].sets,
            counter: 0
          };
          //console.log(newExercise)
          this.exercisesArray.push(newExercise);
        }
      }
    }
    console.log("ExerciseArry")
    console.log(this.exercises)
    if (this.exercisesArray[0] == undefined){
      console.log("REST DAY")
      this.restday = true
    } else {
      console.log("RUNNING_NOTREST")
      this.restday = false
    }
  }

  ngOnInit() {
    this.exe = this.itemService.getCounter();
    //console.log(this.exe)
  }




  exerciseDetail(id) {
  this.itemService.setExtras(id)
  this.router.navigate(['/exercise-detail']);
  }
  getDay(){
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
}
