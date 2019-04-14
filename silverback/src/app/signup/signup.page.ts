import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  imgfile="assets/l1.jpg";
  user = {
    email: '',
    password: '',
    name: '',
    age: 18,
    height: 6.0,
    weight: 180,
    gender: '',
    avail: '',
    c_bench: 45,
    c_squat: 45,
    c_deadlift: 45,
    c_pushup: 5,
    c_pullup: 0,
    c_overall: '',
    t_bench: 45,
    t_squat: 45,
    t_deadlift: 45,
    t_pushup: 5,
    t_pullup: 0,
    t_overall: '',
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signup() {
    const email = this.user.email;
    const password = this.user.password;
    const name = this.user.name;
    const age = this.user.age;
    const height = this.user.height;
    const weight = this.user.weight;
    const gender = this.user.gender;
    const avail = this.user.avail;
    const c_bench = this.user.c_bench;
    const c_deadlift = this.user.c_deadlift;
    const c_squat = this.user.c_squat;
    const c_pushup = this.user.c_pushup;
    const c_pullup = this.user.c_pullup;
    const c_overall = this.user.c_overall;
    const t_bench = this.user.t_bench;
    const t_deadlift = this.user.t_deadlift;
    const t_squat = this.user.t_squat;
    const t_pushup = this.user.t_pushup;
    const t_pullup = this.user.t_pullup;
    const t_overall = this.user.t_overall;
    const self = this;
    console.log(avail)
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
    .then(function(user) {
        const userid = firebase.auth().currentUser.uid;
        const usertype = firebase.database().ref('usertypes/'+userid).push();
        console.log(avail)
        usertype.set({
          'uid':        userid,
          'name':       name,
          'age':        age,
          'height':     height,
          'weight':     weight,
          'gender':     gender,
          'avail':      avail,
          'c_bench':    c_bench,
          'c_deadlift': c_deadlift,
          'c_squat':    c_squat,
          'c_pushup':   c_pushup,
          'c_pullup':    c_pullup,
          'c_overall':  c_overall,
          't_bench':    t_bench,
          't_deadlift': t_deadlift,
          't_squat':    t_squat,
          't_pushup':   t_pushup,
          't_pullup':   t_pullup,
          't_overall':  t_overall
        });
        self.router.navigate(['/login']);
    });
  }
  goBack() {
    this.router.navigate(['/login']);
  }
}
