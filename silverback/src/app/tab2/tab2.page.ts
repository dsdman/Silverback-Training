import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import * as firebase from 'firebase';
import { WeekDay } from '@angular/common';
import { getTypeNameForDebugging } from '@angular/core/src/change_detection/differs/iterable_differs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  week = []
  weekly = []

  constructor(private router: Router, private route: ActivatedRoute) {
    var userid = firebase.auth().currentUser.uid;
    var day = this.getDay()
    var refs = firebase.database().ref('workout/' + userid.toString() + '/FinalPlan');
    refs.once('value', (snapshot) => {
      this.week = snapshot.val();  
    }).then(() => {
      let counter = 0;
      while (counter < 7) {
        let inworkout = false;
        for (let i = 0; i < this.week.length; ++i) {
          //in the workout plan, use the plan
          if(this.week[i].day == day[counter]) {
            inworkout = true;
            this.weekly.push({
              'day': day[counter],
              'workoutType': this.getType(this.week[i].workout),
              'workout': this.week[i].workout
            });
          } 
          
        }

        if (!inworkout) {
          this.weekly.push({
            'day': day[counter],
            'workoutType': 'Rest day',
            'workout': []
          });
        }
        ++counter;
      }
  })
  //console.log("WEEKLY");
  console.log(this.weekly); 
}

  ngOnInit() {
   
  }
  getType(workout){
    var rstring = ""
    let rarray = []
    let Chest = ["Bench Press", "Chest Fly", "Push-Up"];
    let Back = ["Pull-Up", "Deadlift", "pully row"];
    let Leg = ["Leg Press", "Squat", "Calf Raise"];
    let Arm = ["Barbell Curl", "Skullcrusher", "Triceps Pushdown - Rope Attachment"];
    for(let i = 0; i < workout.length; i++){
      for(let j = 0; j< Chest.length; ++j){
        if(workout[i].name == Chest[j]){
          rarray.push("Chest")
          break
        }
      }
      for(let j = 0; j<Back.length; ++j){
        if(workout[i].name == Back[j]){
          rarray.push("Back")
          break
        }
      }
      for(let j = 0; j<Leg.length; ++j){
        if(workout[i].name == Leg[j]){
          rarray.push("Leg")
          break
        }
      }
      for(let j = 0; j<Arm.length; ++j){
        if(workout[i].name == Arm[j]){
         rarray.push("Arm")
          break
        }
      }
    }
    for(let i = 0; i < rarray.length-1; i++){
      if(rarray[i] != rarray[i+1]){
        rstring = rarray[i] +"/"+ rarray[i+1]
      }
      else{
        rstring = rarray[i]
      }
    }
    console.log(rstring)
    return rstring
  }

  getDay(){
    var d = new Date();
    var day = d.getDay();
    var dayString = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return dayString
  }

}