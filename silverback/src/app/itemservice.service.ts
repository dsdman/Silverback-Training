import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {
  //This is for the current day
  exercises:Array<any> = [{"name":"Bench Press","weight":200,"sets":[{"reps":12, "weight":135}, {"reps":12, "weight":135}, {"reps":12, "weight":135}], "setsDone":0, "day":"Monday"}, 
                          {"name":"Incline Dumbell Press","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":0}, 
                          {"name":"Chest Fly","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":0}];
  //This is for the whole week for day detail and tab2
  exerciseList:Array<any> = [];

  constructor() { 
    console.log(this.exercises[0].sets.length);
  }

  //provide functions to get items, and save items
  getExercises() {
      return this.exercises;
  }

  //generates a workout plan
  generatePlan() {
    //TODO generte 7 exercises and store them in the exerlistList array
  }

}
