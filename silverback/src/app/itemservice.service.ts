import { Injectable, ɵConsole } from '@angular/core';
import { Observable} from 'rxjs';
import { from } from 'rxjs';
import * as firebase from 'firebase/app';
import { userInfo } from 'os';
@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {
  userId = firebase.auth().currentUser.uid;
  //THIS IS FOR EVERYTHING NOT GENERATED
  exe:any;
  day:any;
  counter:any;

  //THIS IS FOR GENERATING WORKOUT
  back:any;
  backpre = []
  arm:any;
  armpre = []
  chest:any;
  chestpre = []
  leg:any;
  legpre = []
  femaletable = [["Barbell Curl" ,"Skullcrushers","Triceps Pushdown - Rope Attachment","Deadlift" ,"pullUp","pully row","Bench Press","Chest Fly","Push-Up","Calf Raise","Leg Press","Squat"], 
                [0.1,0.08,0.11,0.61,1,0.34,0.27,0.05,1,0.19,0.66,0.47], [0.39,0.38,0.44,1.37,6,0.77,0.77,0.22,20,1.05,2.21,1.13],[0.5,0.88,0.96,2.44,20,1.38,1.53,0.54,50,2.58,4.66,2.13]];

  maletable = [["Barbell Curl" ,"Skullcrushers","Triceps Pushdown - Rope Attachment","Deadlift","pullUp","pully row","Bench Press","Chest Fly","Push-Up","Calf Raise","Leg Press","Squat"], 
              [0.25,0.24,0.23,1.09, 1, 0.58 ,0.068, 0.1, 0.43,1.13,0.91], [.58,.60,0.63,1.87,15,1.09,1.23,.34,45,1.32,2.85,1.61],[1.09,1.13,1.25,2.86,36,1.74,1.93,1.74,100,2.7,4.98,2.52]];                  

  constructor() { 
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
  public setExtras(data){
    this.exe = data
  }
  public getExtras(){
    return this.exe;
  }
  public setDay(data){
    this.day = data
  }
  public getDay(){
    return this.day;
  }
  public setCounter(data){
    this.counter = data
  }
  public getCounter(){
    return this.counter;
  }


  //THIS IS THE MOTHERLOAD OF CODE THAT REGENERATERS PLAN
  public generatePlan(user) {
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
     //console.log(this.armpre);
     //console.log(this.backpre);
    // console.log(this.legpre);
     //console.log(this.chestpre);
      //generates workout plan for days avail, days rest when not avail
      
      if(user.avail.length ==7 || user.avail.length ==6){
       FinalPlan.push(this.getDayExercise(user ,this.backpre, user.avail[0]))
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[1]))
       FinalPlan.push(this.getMultiDay(user, this.legpre, this.armpre, user.avail[2]))
       FinalPlan.push(this.getDayExercise(user,this.backpre, user.avail[4]))
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[5]))
      }
      if(user.avail.length ==5){
       FinalPlan.push(this.getDayExercise(user,this.backpre, user.avail[0]))
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[1]))
       FinalPlan.push(this.getDayExercise(user,this.legpre, user.avail[2]))
       FinalPlan.push(this.getDayExercise(user,this.armpre, user.avail[3]))
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[4]))
      }
      if(user.avail.length ==4){
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[0]))
       FinalPlan.push(this.getDayExercise(user,this.backpre, user.avail[1]))
       FinalPlan.push(this.getDayExercise(user,this.legpre, user.avail[2]))
       FinalPlan.push(this.getDayExercise(user,this.armpre, user.avail[3]))
      }
 
     if(user.avail.length ==3){
       FinalPlan.push(this.getMultiDay(user,this.backpre, this.chestpre, user.avail[0]))
       FinalPlan.push(this.getMultiDay(user,this.legpre, this.armpre, user.avail[1]))
       FinalPlan.push(this.getMultiDay(user,this.backpre, this.chestpre, user.avail[2]))
     }
     if(user.avail.length ==2){
       FinalPlan.push(this.getMultiDay(user,this.backpre, this.chestpre, user.avail[0]))
       FinalPlan.push(this.getMultiDay(user,this.legpre, this.armpre, user.avail[1]))
     }
     if(user.avail.length ==1){
       FinalPlan.push(this.getMultiDay(user,this.backpre,this.chestpre,user.avail[0]))
       FinalPlan.push(this.getMultiDay(user,this.armpre,this.legpre,user.avail[0]))
     }
     
     //write the workout plan to firebase
     var userid = firebase.auth().currentUser.uid;
     firebase.database().ref('workout/'+userid).set({
       'FinalPlan': FinalPlan
     });
  }

  private refresh(){
    //window.location.reload()
  }



  private getDayExercise( user , preset, day){
    var tgender = user.gender
    var tweight = user.weight
    var tskill = user.level

    if (tgender == 'Male'){
      var workout = {
        day: day,
        //workout: this.malestrengthtable(wclass, tskill, preset)
        workout: this.malestrengthtable(user.weight, tskill, preset)

      };
      return workout
    } 
    if (tgender == 'Female'){
      var workout = {
        day: day,
        workout: this.femalestrengthtable(user.weight, tskill, preset)
      };
      return workout
  }
}
private getMultiDay(user, preset1, preset2, day){
  let work1 = this.getDayExercise(user,preset1, day)
  let work2 = this.getDayExercise(user,preset2, day)
  let work1Workouts = work1.workout;
  let work2Workouts = work2.workout;
  let workouts = []
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

//private malestrengthtable(wclass,skill,exercise){
  private malestrengthtable(weight,skill,exercise){

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
  //console.log(this.maletable)
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
      exerNum = 0
      if (exercise[i].name == this.maletable[0][j]){
        //console.log(this.maletable[0][j])
        exerNum = j
      }
      //console.log(this.maletable[skillNum][3])
      console.log(exercise[i].name)
     
    } 
    //console.log(this.maletable[skillNum][1])
    //console.log(exercise[i].name)
   // console.log(this.maletable[skillNum][exerNum])

   if(exercise[i].name == 'Push-Up' || exercise[i].name == 'pullup'){
    console.log(this.maletable[0][exerNum])
    console.log(this.maletable[skillNum][exerNum])
    tempweight = Number(this.maletable[skillNum][exerNum]);

  } else {
   // console.log(exerNum)
    //console.log(this.maletable[0][exerNum])
    //console.log(this.maletable[skillNum][exerNum])
    tempweight = this.round5(Number(this.maletable[skillNum][exerNum]) * weight);
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
private  round5(x)
{
    return Math.ceil(x/5)*5;
}

private femalestrengthtable(weight, skill, exercise) {
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
    if((exercise[i].name != 'Push-Up' && exercise[i].name != 'pullup')) {
      tempweight = this.round5(Number(this.femaletable[skillNum][exerNum]) * weight)
    } else {
      //console.log(exercise[i].name)
      //console.log(weight)
      //console.log("BEFORE")
      //console.log(tempweight)
      tempweight = Number(this.femaletable[skillNum][exerNum]);
      //console.log("AFTER")
      //console.log(tempweight)
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






    
}
