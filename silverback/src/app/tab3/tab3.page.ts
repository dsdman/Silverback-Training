import { Component } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { ItemserviceService } from '../itemservice.service';
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
  avail = 'Monday';
  userid = firebase.auth().currentUser.uid;
  constructor(private router:Router, public itemService: ItemserviceService, public formBuilder:FormBuilder) {
    var refs = firebase.database().ref('usertypes/' + this.userid.toString());
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();  
      //console.log(this.info)
    })
    var result = Object.keys(this.info).map((key)=> {
      return [Number(key), this.info[key]];
    });
   // console.log(result);
    for(let i =0; i < result.length; i++){
      //console.log(result[i])
      
    }
    this.infoArray = result;
    //console.log(result)
  }

  ngOnInit() {
  	this.new_item_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      avail: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
    //console.log(this.infoArray[3][1])
    this.name = this.infoArray[3][1];
    this.weight = this.infoArray[4][1];
    this.gender = this.infoArray[2][1];
    this.level = this.infoArray[1][1];
    this.avail = this.infoArray[0][1];
    
    //console.log(this.infoArray);
    //console.log(this.infoArray[1])
  }

  //this is for the form submission thingy
  editInfo(value){
    this.name = value.name;
    this.weight = value.weight;
    this.level = value.level;
    this.avail = value.avail;
    this.gender = value.gender;

    
    //set the stuff in firebase
    //console.log(this.userid.toString())
    //console.log(value)
    var ref = firebase.database().ref('usertypes/' + this.userid.toString())  
    ref.set(value)
  
    this.itemService.generatePlan(value);
    //window.location.reload()

    this.edit();
  }
  //this is for the button in the header
  edit() {
    this.hasclicked = !this.hasclicked;
  }
  
}
