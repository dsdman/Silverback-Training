import { Component, OnInit } from '@angular/core';
import { ItemserviceService } from '../itemservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.page.html',
  styleUrls: ['./day-detail.page.scss'],
})
export class DayDetailPage implements OnInit {
  day:any;
  workout:any;
  newWorkouts = [];
  restday:boolean;
  restdaygif = 'assets/restDay.gif'
  constructor(private router: Router, private route: ActivatedRoute,  public itemService: ItemserviceService) {
    this.day = this.itemService.getDay()
    this.restday = false
    this.workout = this.day.workout
    console.log(this.workout)
    
    if(this.workout.length == 0){
      this.restday = true
      console.log(this.restday)
    }
    for (let i = 0; i < this.workout.length; ++i) {
      console.log(this.workout[i]);
      
      let newWorkout = {
        'name': this.workout[i].name,
        'gif': this.getImg(this.workout[i].name),
        'setNum': this.workout[i].setNum
      };
      this.newWorkouts.push(newWorkout);
    }
  }
  
  ngOnInit() {
    
  }

  getImg(name){
    var imgstring = ''
    let Barbell_gif = "assets/barbell curl.gif";
    let calf_gif = "assets/calfRaises.gif";
    let deadlift_gif = "assets/deadlift.gif";
    let dumbellFly_gif = "assets/dumbellFly.gif";
    let legpress_gif = "assets/legPress.gif";
    let pull_gif = "assets/pullup.gif";
    let pullyRow_gif = "assets/pullyRow.gif";
    let pushup_gif = "assets/pushup.gif";
    let skull_gif = "assets/skull.gif";
    let squat_gif = "assets/squat1.gif";
    let triceptPulldown_gif = "assets/tripulldown.gif";
    let bench_press_gif = "assets/straight-bench-press.gif";
    
    if(name == 'Calf Raise'){
        imgstring = calf_gif
    }
    else if(name == 'Barbell Curl'){
      imgstring =Barbell_gif
    }
    else if(name == 'Leg Press'){
      imgstring = legpress_gif
    }
    else if(name == 'Skullcrusher'){
      imgstring = skull_gif
    }
    else if(name == 'Squat'){
      imgstring =squat_gif
    }
    else if(name == 'Triceps Pushdown - Rope Attachment'){
      imgstring =triceptPulldown_gif
    }
    else if(name == 'Bench Press'){
      imgstring = bench_press_gif
    }
    else if(name == 'Push-Up'){
      imgstring =pushup_gif
    }
    else if(name == 'Chest Fly'){
      imgstring =dumbellFly_gif
    }
    else if(name == 'Deadlift'){
      imgstring =deadlift_gif
    }
    else if(name == 'pullup'){
      imgstring =pull_gif
    }
    else if(name == 'pully row'){
      imgstring =pullyRow_gif
    }
    else{
      console.log("ERROR")
    }
    return imgstring
  }

  goBack(){
    this.router.navigate(['./tabs/tabs/tab2']);
  }

}
