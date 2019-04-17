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
  weight=150;
  gender = "Male";
  level = "Beginner";
  constructor(private router:Router, public formBuilder:FormBuilder) {
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)
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
      weight: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
    });

    this.name = this.infoArray[0][1].name;
    this.weight = this.infoArray[0][1].weight;
    this.gender = this.infoArray[0][1].gender;
    this.level = this.infoArray[0][1].c_overall;

    //console.log(this.infoArray);
    //console.log(this.infoArray[1])
  }

  //this is for the form submission thingy
  editInfo(value){
    this.name = value.name;
    this.weight = value.weight;
    this.gender = value.gender;
    this.level = value.level;
    this.edit();
  }

  

  //this is for the button in the header
  edit() {
    this.hasclicked = !this.hasclicked;
  }
  
}
