import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {
  //define some data containers such as arrays to store items
  exercises:Array<any> = [{"name":"Bench Press","weight":200,"sets":3, "setsDone":0, "day":"Monday"}, {"name":"Incline Dumbell Press","weight":100,"sets":3, "setsDone":0}, {"name":"Chest Fly","weight":100,"sets":3, "setsDone":0}];

  exerciseList:Array<any> = [];

  constructor() { 
  }

  //provide functions to get items, and save items
  getExercises() {
      return this.exercises;
  }

}
