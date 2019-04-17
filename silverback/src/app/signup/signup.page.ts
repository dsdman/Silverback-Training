import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

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
  back:any;
  backpre = []
  arm:any;
  armpre = []
  chest:any;
  chestpre = []
  leg:any;
  legpre = []
  maletable = [["Barbell Curl" ,"Skullcrushers","Triceps Pushdown - Rope Attachment","Deadlift","Pull-Up","Pully Row","Bench Press","Chest Fly","Push-Up","Calf-Raise","Leg Press","Squat"], 
                    [25,20,20,125,1,65,75,7,1,45,115,95], [75,70,80,235,15,140,155,65,45,205,335,190],[155,160,180,390,36,245,370,190,100,495,700,325]];
  femaletable = [["Barbell Curl" ,"Skullcrushers","Triceps Pushdown - Rope Attachment","Deadlift","Pull-Up","Pully Row","Bench Press","Chest Fly","Push-Up","Calf-Raise","Leg Press","Squat"], 
                    [10,10,10,65,1,35,25,5,1,20,60,50], [45,40,45,150,15,90,80,40,45,145,235,130],[100,105,105,280,37,160,170,190,120,350,525,245]];



  constructor(private router: Router) {
    var refs = firebase.database().ref('BackPreset/');
    refs.on('value', (snapshot) => {
      this.back = snapshot.val();
    })
    var refs = firebase.database().ref('ArmPreset/');
    refs.on('value', (snapshot) => {
      this.arm = snapshot.val();
    })

    var refs = firebase.database().ref('ChestPreset/');
    refs.on('value', (snapshot) => {
      this.chest = snapshot.val();
    })
    var refs = firebase.database().ref('LegPreset/');
    refs.on('value', (snapshot) => {
      this.leg = snapshot.val();
    }) 
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
        const usertype = firebase.database().ref('usertypes/'+userid).push();
        console.log(avail)
        usertype.set({
          'uid':        userid,
          'name':       name,
          'weight':     weight,
          'gender':     gender,
          'avail':      avail,
          'c_overall':  c_overall,
        });
        this.generatePlan();
      
        self.router.navigate(['/login']);
    });
  }

  generatePlan() {
    let FinalPlan = []

    //load the back preset
    var result = Object.keys(this.back).map((key)=> {
      return [Number(key), this.back[key]];
    });
    for(let i = 0; i < result.length; i++){
      this.backpre.push(result[i][1])
    }
     //load the arm preset
     var result = Object.keys(this.arm).map((key)=> {
       return [Number(key), this.arm[key]];
     }); 
     for(let i = 0; i < result.length; i++){
       this.armpre.push(result[i][1])
     }
     //load the chest preset
     var result = Object.keys(this.chest).map((key)=> {
       return [Number(key), this.chest[key]];
     }); 
     for(let i = 0; i < result.length; i++){
       this.chestpre.push(result[i][1])
     }
     //load the leg preset
     var result = Object.keys(this.leg).map((key)=> {
       return [Number(key), this.leg[key]];
     }); 
     for(let i = 0; i < result.length; i++){
       this.legpre.push(result[i][1])
     }

     //generates workout plan for days avail, days rest when not avail
     let temp = this.user.avail.length
     if(this.user.avail.length ==7 || this.user.avail.length ==6){
      FinalPlan.push(this.getDayExercise(this.backpre, this.user.avail[0]))
      FinalPlan.push(this.getDayExercise(this.chestpre, this.user.avail[1]))
      FinalPlan.push(this.getMultiDay(this.legpre, this.armpre,this.user.avail[2]))
      FinalPlan.push(this.getDayExercise(this.backpre, this.user.avail[4]))
      FinalPlan.push(this.getDayExercise(this.chestpre, this.user.avail[5]))
     }
     if(this.user.avail.length ==5){
      FinalPlan.push(this.getDayExercise(this.backpre, this.user.avail[0]))
      FinalPlan.push(this.getDayExercise(this.chestpre, this.user.avail[1]))
      FinalPlan.push(this.getDayExercise(this.legpre, this.user.avail[2]))
      FinalPlan.push(this.getDayExercise(this.armpre, this.user.avail[3]))
      FinalPlan.push(this.getDayExercise(this.chestpre, this.user.avail[4]))
     }
     if(this.user.avail.length ==4){
      FinalPlan.push(this.getDayExercise(this.chestpre, this.user.avail[0]))
      FinalPlan.push(this.getDayExercise(this.backpre, this.user.avail[1]))
      FinalPlan.push(this.getDayExercise(this.legpre, this.user.avail[2]))
      FinalPlan.push(this.getDayExercise(this.armpre, this.user.avail[3]))
     }

    if(this.user.avail.length ==3){
      FinalPlan.push(this.getMultiDay(this.backpre, this.chestpre, this.user.avail[0]))
      FinalPlan.push(this.getMultiDay(this.legpre, this.armpre, this.user.avail[1]))
      FinalPlan.push(this.getMultiDay(this.backpre, this.chestpre, this.user.avail[2]))
    }
    if(this.user.avail.length ==2){
      FinalPlan.push(this.getMultiDay(this.backpre, this.chestpre, this.user.avail[0]))
      FinalPlan.push(this.getMultiDay(this.legpre, this.armpre, this.user.avail[1]))
    }
    if(this.user.avail.length ==1){
      FinalPlan.push(this.getMultiDay(this.backpre,this.chestpre,this.user.avail[0]))
      FinalPlan.push(this.getMultiDay(this.armpre,this.legpre,this.user.avail[0]))
    }
    
    //write the workout plan to firebase
    console.log(FinalPlan);
    var userid = firebase.auth().currentUser.uid;
    firebase.database().ref('workout/'+userid).set({
      'FinalPlan': FinalPlan
    });
    
  }

  getDayExercise(preset, day){
    var tgender = this.user.gender
    var tweight = this.user.weight
    var tskill = this.user.c_overall
    var wclass = '';
    //console.log(preset)

    //get weight class and generate plan for each gender using lookup table
    if (tgender == 'Male'){
      //get the weight class
      if (tweight >= 0 && tweight <= 160) {
        wclass = "Class1";
        //console.log(wclass);
      } else if (tweight >= 161 && tweight <= 220) {
        wclass = "Class2";  
        //console.log(wclass);
      } else {
        wclass = "Class3";     
        //console.log(wclass);
      }
      var workout = {
        day: day,
        workout: this.malestrengthtable(wclass, tskill, preset)
      };
      return workout
    } 
    if (tgender == 'Female'){
      //get the weight class
      if (tweight >= 0 && tweight <= 120) {
        wclass = "Class1";
        //console.log(wclass);
      } else if (tweight >= 121 && tweight <= 200) {
        wclass = "Class2";  
        //console.log(wclass);
      } else {
        wclass = "Class3";     
        //console.log(wclass);
      }
      var workout = {
        day: day,
        workout: this.femalestrengthtable(wclass, tskill, preset)
      };
      return workout
  }
}



  getMultiDay(preset1, preset2, day){
      let work1 = this.getDayExercise(preset1, day)
      let work2 = this.getDayExercise(preset2, day)
      let work1Workouts = work1.workout;
      let work2Workouts = work2.workout;
      let workouts = []
      //console.log(work1Workouts);
      //console.log(work2Workouts);
      
      
      for (let i = 0; i < 3; ++i) {
        workouts.push(work1Workouts[i]);
        workouts.push(work2Workouts[i]);
      }
      var workout = {
        day: work1.day,
        workout:workouts
      };
      return workout

  }


  malestrengthtable(wclass,skill,exercise){
    //Exercise -> lookup(skill, Exercise index) ---> class2 = class1 + 15, class3 = class 1+ 30
    //console.log(this.maletable)
    let tempweight = 0;
    var ex = [];

    //this is our x value (skill level)
    var skillNum = 0;
    if (skill == "Beginner") {
      skillNum = 1;
    } else if (skill == "Intermediate") {
      skillNum = 2;
    } else {
      skillNum = 3;
    }

    //this is our y index (Exercise)
    var exerNum = 0;
    for (let i = 0; i < exercise.length; ++i) {
      let name = "";
      let setNum = 0;
      let sets = []
      let lreps = 0;
      let ureps = 0;
      let reps = ''
      //look it up
      for (let j = 0; j < this.maletable[0].length; ++j) {
        if (exercise[i].name == this.maletable[0][j])
          exerNum = j
      } 
      if(wclass == 'Class2' && (exercise[i].name != 'Push-Up' && exercise[i].name != 'pullup')){
        tempweight = Number(this.maletable[skillNum][exerNum]) + 15
      } 
      else if(wclass == 'Class3' && (exercise[i].name != 'Push-Up' && exercise[i].name != 'pullup')){
        tempweight = Number(this.maletable[skillNum][exerNum]) + 30
      } 
      else {
        tempweight = Number(this.maletable[skillNum][exerNum])
      }
      name = exercise[i].name;
      setNum = exercise[i].setNum;
      for (let k = 0; k < setNum; ++k) {
        if (exercise[i].sets.reps > 1){
          lreps = exercise[i].sets.reps -1
        }
        else{
          lreps = exercise[i].sets.reps
        }
        ureps = exercise[i].sets.reps +2
        reps = String(lreps + "-" + ureps)
        var set = {
          reps: reps,
          weight: tempweight
        };
        sets.push(set);
      }
      var exer = {
        name: name,
        setNum: setNum,
        sets: sets
      };
      ex.push(exer);
    }
    return ex
  }


  femalestrengthtable(wclass, skill, exercise) {
    var skillNum = 0;
    if (skill == "Beginner") {
      skillNum = 1;
    } else if (skill == "Intermediate") {
      skillNum = 2;
    } else {
      skillNum = 3;
    }
    var ex = [];
    var exerNum = 0;
    let tempweight = 0;
    //this is our y index (Exercise)
    for (let i = 0; i < exercise.length; ++i) {
      let name = "";
      let setNum = 0;
      let sets = []
      let lreps = 0;
      let ureps = 0;
      let reps = ''
      //look it up
      for (let j = 0; j < this.femaletable[0].length; ++j) {
        if (exercise[i].name == this.femaletable[0][j])
          exerNum = j
      } 
      if(wclass == 'Class2' && (exercise[i].name != 'Push-Up' && exercise[i].name != 'pullup')){
        tempweight = Number(this.femaletable[skillNum][exerNum]) + 5
      } 
      else if(wclass == 'Class3' && (exercise[i].name != 'Push-Up' && exercise[i].name != 'pullup')){
        tempweight = Number(this.femaletable[skillNum][exerNum]) + 15
      } 
      else {
        tempweight = Number(this.femaletable[skillNum][exerNum])
      }
      name = exercise[i].name;
      setNum = exercise[i].setNum;
      for (let k = 0; k < setNum; ++k) {
        if (exercise[i].sets.reps > 1){
          lreps = exercise[i].sets.reps -1
        }
        else{
          lreps = exercise[i].sets.reps
        }
        ureps = exercise[i].sets.reps +2
        reps = String(lreps + "-" + ureps)
        var set = {
          reps: reps,
          weight: tempweight
        };
        sets.push(set);
      }
      var exer = {
        name: name,
        setNum: setNum,
        sets: sets
      };
      ex.push(exer);
    }
    return ex
  }




  goBack() {
    this.router.navigate(['/login']);
  }
}
