import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemserviceService } from '../itemservice.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  exercises = [];

  constructor(private router: Router, public itemService: ItemserviceService) {
  }

  ngOnInit() {
    this.exercises = this.itemService.getExercises();
    console.log("Got exercises from itemService:");
    console.log(this.exercises);
  }

  exerciseDetail(item) {
    console.log(item);
    var index = this.exercises.indexOf(item); 
    console.log("THIS IS THE SHIT I'm SENDING");
    console.log(index);
    this.router.navigate(["/exercise-detail"], item.sets);
  }

}
