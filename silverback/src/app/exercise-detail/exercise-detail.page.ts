import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemserviceService } from '../itemservice.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {
  current_exercise:any;
  name = "";
  weight = 0;
  Reps = 0;
  setNum = 0;

  constructor(private route: ActivatedRoute, private router: Router, public itemService: ItemserviceService) { 
  }

  ngOnInit() {
     this.route.params.subscribe(
        param => {
          console.log("PARAMETER GOT:");
          console.log(param);

          this.current_exercise = param;
      })
      console.log("CURRENT SHIT!");
      console.log(this.current_exercise);
  }

  goBack(){
    this.router.navigate(['./tabs/tabs/tab1']);
  }
}
