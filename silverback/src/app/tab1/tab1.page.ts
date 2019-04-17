import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemserviceService } from '../itemservice.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  exercises:any;
  exercisesArray = []

  constructor(private router: Router, public itemService: ItemserviceService) {
    //this.exercises = this.itemService.getExercises();
    this.exercises = [{"name":"Bench Press","weight":200,"sets":[{"reps":12, "weight":135}, {"reps":12, "weight":135}, {"reps":12, "weight":135}], "setsDone":0, "day":"Wednesday"}, 
                      {"name":"Incline Dumbell Press","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":0}, 
                      {"name":"Chest Fly","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":0}];

    /*
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)
    var refs = firebase.database().ref('workout/' + userid.toString() + '/FinalPlan');
    refs.on('value', (snapshot) => {
      this.exercises = snapshot.val();  
    })
    console.log(this.exercises);
    //var result = Object.keys(this.exercises).map((key)=> {
    //  return [Number(key), this.exercises[key]];
    //});
    //console.log(result);
    //this.exercisesArray = result;
    //console.log("Got exercises from Firebase:");
    //console.log(this.exercises); */
  }

  ngOnInit() {
  }

  exerciseDetail(item) {
    console.log(item);
    var index = this.exercises.indexOf(item); 
    console.log("THIS IS THE SHIT I'm SENDING");
    console.log(index);
    this.router.navigate(["/exercise-detail"], item.sets);
  }

}
