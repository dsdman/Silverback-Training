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
  setsDone
  constructor(private router: Router, public itemService: ItemserviceService, private route: ActivatedRoute) {
    //this.exercises = this.itemService.getExercises();
  
    this.exercises = [{"Set": "1", "name":"Bench Press","weight":200,"sets":[{"reps":12, "weight":135}, {"reps":12, "weight":135}, {"reps":12, "weight":135}], "setsDone":"2", "day":"Wednesday"}, 
                      {"Set": "2","name":"Incline Dumbell Press","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":"3"}, 
                      {"Set": "3","name":"Chest Fly","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":"3"}];

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
  getUpdate(){
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.setsDone = this.router.getCurrentNavigation().extras.state.count;
      }
    });
    console.log(this.setsDone)   
  }
  exerciseDetail(item) {
    console.log(item);
    var index = this.exercises.indexOf(item); 
    this.router.navigate(["/exercise-detail"], item.sets);
  }

}
