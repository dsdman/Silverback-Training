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
  back:any;
  backpre = []
  arm:any;
  armpre = []
  chest:any;
  chestpre = []
  leg:any;
  legpre = []

  constructor(private router: Router) {
    var refs = firebase.database().ref('BackPreset/');
    refs.on('value', (snapshot) => {
      this.back = snapshot.val();
      console.log(snapshot.val())
    })
    var refs = firebase.database().ref('ArmPreset/');
    refs.on('value', (snapshot) => {
      this.arm = snapshot.val();
      console.log(snapshot.val())
    })

    /* TODO DO THIS SHIT AFTER MAKING CHEST AND LEG PRESETS
    var refs = firebase.database().ref('ChestPreset/');
    refs.on('value', (snapshot) => {
      this.chest = snapshot.val();
      console.log(snapshot.val())
    })
    var refs = firebase.database().ref('LegPreset/');
    refs.on('value', (snapshot) => {
      this.leg = snapshot.val();
      console.log(snapshot.val())
    }) */
    
    
  }
   

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
          'c_bench':    c_bench,  //baseline for chest
          'c_deadlift': c_deadlift, //baseline for back
          'c_squat':    c_squat,  //baseline for leg
          'c_pushup':   c_pushup, //baseline for arm/chest
          'c_pullup':    c_pullup,  //baseline for arm/back
          'c_overall':  c_overall,
          't_bench':    t_bench,
          't_deadlift': t_deadlift,
          't_squat':    t_squat,
          't_pushup':   t_pushup,
          't_pullup':   t_pullup,
          't_overall':  t_overall
        });
        this.generatePlan();
        //self.router.navigate(['/login']);
    });
  }

  //writes the plan to firebase
  savePlan(Plan) {
    var userid = firebase.auth().currentUser.uid;
  }

  async generatePlan() {
    /*          LOAD ALL THE PRESETS                */
    //load the back preset
    console.log(this.back)
    var result = Object.keys(this.back).map((key)=> {
      return [Number(key), this.back[key]];
    });
    for(let i = 0; i < result.length; i++){
      console.log(result[i][1])
      this.backpre.push(result[i][1])
    }
    console.log(this.backpre)

     //load the arm preset
     console.log(this.arm)
     var result = Object.keys(this.arm).map((key)=> {
       return [Number(key), this.arm[key]];
     }); 
     for(let i = 0; i < result.length; i++){
       console.log(result[i][1])
       this.armpre.push(result[i][1])
     }
     console.log(this.armpre)

     /*TODO do this shit once chest and leg presets are in database
     //load the chest preset
     console.log(this.chest)
     var result = Object.keys(this.chest).map((key)=> {
       return [Number(key), this.chest[key]];
     }); 
     for(let i = 0; i < result.length; i++){
       console.log(result[i][1])
       this.chestpre.push(result[i][1])
     }
     console.log(this.chestpre)

     //load the leg preset
     console.log(this.leg)
     var result = Object.keys(this.leg).map((key)=> {
       return [Number(key), this.leg[key]];
     }); 
     for(let i = 0; i < result.length; i++){
       console.log(result[i][1])
       this.legpre.push(result[i][1])
     }
     console.log(this.legpre) */

  }

  moveFbRecord(oldRef, newRef) {    
    oldRef.once('value', function(snap)  {
         newRef.set( snap.val(), function(error) {
              if( !error ) {  oldRef.remove(); }
              else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
}
  goBack() {
    this.router.navigate(['/login']);
  }
}
