import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {
  name = "Bench";
  weight = 135;
  Reps = "8-12";
  setNum = 3;
  constructor(private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(['./tabs/tabs/tab1']);
  }
}
