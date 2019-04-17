import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
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
  set = {
    c1:false,
    c2:false,
    c3:false,

  }
  checked:boolean;

  constructor(private route: ActivatedRoute, private router: Router, public itemService: ItemserviceService) { 
  }

  ngOnInit() {
     this.route.params.subscribe(
        param => {
          

          this.current_exercise = param;
      })
 
  }
  done(){
    var counter = 0
    let rc = {
      counter:0,
    }
    if(this.set.c1 == true){
      rc.counter += 1
    }
    if(this.set.c2 == true){
      rc.counter += 1
    }
    if(this.set.c3 == true){
      rc.counter+=1
    }
    let navigationExtras: NavigationExtras = {
      state: {
        count: rc
      }
    };
    this.router.navigate(['./tabs/tabs/tab1'], navigationExtras)
  }


  goBack(){
    this.router.navigate(['./tabs/tabs/tab1']);
  }
}
