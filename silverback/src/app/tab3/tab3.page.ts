import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  new_item_form: FormGroup;
  hasclicked = false;
  name = "John Doe";
  age = 30;
  weight=150;
  gender = "Male";
  goal = "Bench 200";
  constructor(private router:Router, public formBuilder:FormBuilder) {
  }

  ngOnInit() {
  	this.new_item_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      goal: new FormControl('', Validators.required),
    });
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
