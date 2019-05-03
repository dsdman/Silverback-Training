import { Component, OnInit } from '@angular/core';
import * as form from '@angular/forms';
import { Router,Routes, RouterModule } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  imgfile="assets/background.jpg";
  new_item_form: form.FormGroup;

  constructor(private router: Router, public formBuilder: form.FormBuilder) { 
  }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
    email: new form.FormControl('', form.Validators.required),
    password: new form.FormControl('', form.Validators.required)
    });
  }

  signup(){
    this.router.navigate(["/signup"]);
  } 
  
  login(item){
    var login = true;
    const email = item.email;
    const password = item.password;
    const self = this;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      login = false;
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else if (errorCode === 'auth/user-not-found'){
        alert("User does not exist");
      } else {
        alert(errorMessage);
      }
      
      })
      .then(function(result){
        let userid = firebase.auth().currentUser.uid;
        let usertypesRef = firebase.database().ref('usertypes/');
        usertypesRef.orderByChild("uid").equalTo(userid).on("value",function(data){
          data.forEach(function(thing){
          })
          if(login == true){
            self.tab1();
          }
        });
    });
    //if (login == true){ self.tab1(self.itemService);}

  }

  tab1(){
   this.router.navigate(["tabs/tabs/tab1"]);
  } 
}

