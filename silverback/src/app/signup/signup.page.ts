import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemserviceService } from '../itemservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  imgfile="assets/Logo.jpg";
  user = {
    email: '',
    password: '',
    name: '',
    weight: 0,
    gender: '',
    avail: '',
    c_overall: '', 
  };
  constructor(private router: Router, public itemService: ItemserviceService) {
  }
   
  ngOnInit() {
  }

  signup() {
    const email = this.user.email;
    const password = this.user.password;
    const name = this.user.name;
    const weight = this.user.weight;
    const gender = this.user.gender;
    const avail = this.user.avail;
    const c_overall = this.user.c_overall;
    let user2 = {
      'name':this.user.name,
      'weight': this.user.weight,
      'gender': this.user.gender,
      'level': this.user.c_overall,
      'avail': this.user.avail
    }
    
    const self = this;
    //console.log(avail)
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error.message);
    if (errorCode.length > 0) {
      console.log('Failed');
      alert(errorMessage)
    } else {
      console.log('Signed-UP');
    }
    })
    .then((user) => {
        const userid = firebase.auth().currentUser.uid;
        //const usertype = firebase.database().ref('usertypes/'+userid).push();
        const usertype = firebase.database().ref('usertypes/'+userid);
        usertype.set({
          'name':       name,
          'weight':     weight,
          'gender':     gender,
          'avail':      avail,
          'c_overall':  c_overall,
        });
        //this.generatePlan();

        this.itemService.generatePlan(user2)
        self.router.navigate(['/login']);
    });
  }
  goBack() {
    this.router.navigate(['/login']);
  }
}
