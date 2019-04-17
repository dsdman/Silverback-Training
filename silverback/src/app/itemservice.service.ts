import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {
  //this is user info
  userInfo:Array<any> = []
  //This is for the current day
  exercises:Array<any> = [{"name":"Bench Press","weight":200,"sets":[{"reps":12, "weight":135}, {"reps":12, "weight":135}, {"reps":12, "weight":135}], "setsDone":0, "day":"Monday"}, 
                          {"name":"Incline Dumbell Press","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":0}, 
                          {"name":"Chest Fly","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":0}];
  //This is for the whole week for day detail and tab2
  exerciseList:Array<any> = [];

  constructor() { 
    console.log(this.exercises[0].sets.length);
    //get user information
    //this.userInfo = this.getUserInfo();
    console.log("TESTING USER INFO");
    console.log(this.userInfo);
  }

  //provide functions to get items, and save items
  getExercises() {
      return this.exercises;
  }

  //gets user info from firebase
  getUserInfo() {
    /*
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)
    var infoArray = []
    var refs = firebase.database().ref('usertypes/' + userid.toString());
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();  
    })
    var result = Object.keys(this.info).map((key)=> {
      return [Number(key), this.info[key]];
    });
    console.log(result);
    console.log(result[0][1].name)
    infoArray = result;
    return infoArray; */
  }
  //generates a workout plan
  generatePlan() {
    //TODO generte 7 exercises and store them in the exerlistList array
  }

}
