import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ItemserviceService } from '../itemservice.service';


@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {
  imgfile = ''
  id: any;
  sets = []
  checked:boolean;
  constructor(private route: ActivatedRoute, private router: Router, public itemService: ItemserviceService) { 
  }

  ngOnInit() {
    this.id = this.itemService.getExtras();
    this.imgfile = this.getImg()
    for(let i = 0; i < this.id.sets.length; i++){
      let newset = {
        reps: this.id.sets[i].reps,
        weight: this.id.sets[i].weight,
        setCounter: i+1,
        isChecked: false
      };
      this.sets.push(newset);
    }
  }
  
  done(){
    var counter = 0
    for(let i = 0; i < this.sets.length; i++){
      if(this.sets[i].isChecked == true){
        counter++;
      }
    }
    this.id.counter = counter
    this.router.navigate(['./tabs/tabs/tab1']);
  }
  getImg(){
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

    if(this.id.name == 'Calf Raise'){
        imgstring = calf_gif
    }
    else if(this.id.name == 'Barbell Curl'){
      imgstring =Barbell_gif
    }
    else if(this.id.name == 'Leg Press'){
      imgstring = legpress_gif
    }
    else if(this.id.name == 'Skullcrusher'){
      imgstring = skull_gif
    }
    else if(this.id.name == 'Squat'){
      imgstring =squat_gif
    }
    else if(this.id.name == 'Triceps Pushdown - Rope Attachment'){
      imgstring =triceptPulldown_gif
    }
    else if(this.id.name == 'Bench Press'){
      imgstring = bench_press_gif
    }
    else if(this.id.name == 'Push-Up'){
      imgstring =pushup_gif
    }
    else if(this.id.name == 'Chest Fly'){
      imgstring =dumbellFly_gif
    }
    else if(this.id.name == 'Deadlift'){
      imgstring =deadlift_gif
    }
    else if(this.id.name == 'pullup'){
      imgstring =pull_gif
    }
    else if(this.id.name == 'pully row'){
      imgstring =pullyRow_gif
    }
    else{
      console.log("ERROR")
    }
    return imgstring
  }
  goBack(){
    this.router.navigate(['./tabs/tabs/tab1']);
  }
}
