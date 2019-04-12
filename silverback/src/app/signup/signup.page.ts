import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user = {
    email: '',
    password: '',
    
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signup() {
    const email = this.user.email;
    const password = this.user.password;
    const type = this.user.type;
    const self = this;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error.message);
    if (errorCode.length > 0) {
      console.log('Failed');
    } else {
      console.log('Signed-UP');
    }
    })
    .then(function(user) {
        const userid = firebase.auth().currentUser.uid;
        const usertype = firebase.database().ref('usertypes/').push();
        usertype.set({
          'uid': userid,
          'type': type
        });
        self.router.navigate(['']);
    });
  }
  goBack() {
    this.router.navigate(['']);
  }
}
