import { Component } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  new_item_form: FormGroup;
  info:any;
  infoArray = []
  hasclicked = false;
  name = "John Doe";
  age = 30;
  weight=150;
  gender = "Male";
  goal = '';
  t_bench = '';
  t_squat = '';
  t_deadlift = '';
  t_pullup = '';
  t_pushup = '';
  t_overall = '';
  constructor(private router:Router, public formBuilder:FormBuilder) {
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)
    var s = []
    var refs = firebase.database().ref('usertypes/' + userid.toString());
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();  
    })
    var result = Object.keys(this.info).map((key)=> {
      return [Number(key), this.info[key]];
    });
    console.log(result);
    console.log(result[0][1].name)
    this.infoArray = result;
  }

  ngOnInit() {

  	this.new_item_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      goal: new FormControl('', Validators.required),
    });

    this.name = this.infoArray[0][1].name;
    this.age = this.infoArray[0][1].age;
    this.weight = this.infoArray[0][1].weight;
    this.gender = this.infoArray[0][1].gender;
    this.t_bench = this.infoArray[0][1].t_bench;
    this.t_squat = this.infoArray[0][1].t_squat;
    this.t_deadlift = this.infoArray[0][1].t_deadlift;
    this.t_pullup = this.infoArray[0][1].t_pullup;
    this.t_pushup = this.infoArray[0][1].t_pushup;
    this.t_overall = this.infoArray[0][1].t_overall;
    this.goal = "Bench " + this.t_bench + " squat " + this.t_squat + " deadlift " + this.t_deadlift + " pullup " + this.t_pullup + " pushup " + this.t_pushup + " Level " + this.t_overall;

    //console.log(this.infoArray);
    //console.log(this.infoArray[1])
  }

  //this is for the form submission thingy
  editInfo(value){
    this.name = value.name;
    this.age = value.age;
    this.weight = value.weight;
    this.gender = value.gender;
    this.goal = value.goal;
    this.edit();
  }

  

  //this is for the button in the header
  edit() {
    this.hasclicked = !this.hasclicked;
  }
  
}
