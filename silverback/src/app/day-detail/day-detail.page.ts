import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.page.html',
  styleUrls: ['./day-detail.page.scss'],
})
export class DayDetailPage implements OnInit {
  exercise:any;
  constructor() {
  this.exercise = [{"name":"Bench Press","weight":200,"sets":[{"reps":12, "weight":135}, {"reps":12, "weight":135}, {"reps":12, "weight":135}], "setsDone":0, "day":"Monday"}, 
  {"name":"Incline Dumbell Press","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":0}, 
  {"name":"Chest Fly","weight":100,"sets":[{"reps":3, "weight":40}, {"reps":3, "weight":40}, {"reps":5, "weight":30}], "setsDone":0}]; }

  ngOnInit() {
  }

}
