import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { 
  }

  ngOnInit() {
  }

  signup() {
    this.router.navigate(["/signup"]);
  }

  login() {
    this.router.navigate(["/login"]);
  }

  tab1() {
    this.router.navigate(["tabs/tabs/tab1"]);
  }

  tab2() {
    this.router.navigate(["tabs/tabs/tab2"]);
  }

  tab3() {
    this.router.navigate(["tabs/tabs/tab3"]);
  }

  exerciseDetail() {
  this.router.navigate(["/exercise-detail"]);
  }

}
