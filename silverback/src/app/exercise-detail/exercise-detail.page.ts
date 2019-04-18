import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ItemserviceService } from '../itemservice.service';


@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
})
export class ExerciseDetailPage implements OnInit {
  id: any;
  sets = []
  //sub:any;
  checked:boolean;
  stuff;
  constructor(private route: ActivatedRoute, private router: Router, public itemService: ItemserviceService) { 
      //console.log(this.cexe);
  }
 

  ngOnInit() {
    this.id = this.itemService.getExtras();
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
    //console.log(this.sets)
    for(let i = 0; i < this.sets.length; i++){
      if(this.sets[i].isChecked == true){
        counter++;
      }
    }
    this.itemService.setCounter(counter)
    this.router.navigate(['./tabs/tabs/tab1']);
    
  }


  goBack(){
    this.router.navigate(['./tabs/tabs/tab1']);
  }
}
