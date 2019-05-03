import { Injectable, ɵConsole } from '@angular/core';

import * as firebase from 'firebase/app';
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
  femaletable = [["Barbell Curl" ,"Skullcrusher","Triceps Pushdown - Rope Attachment","Deadlift" ,"pullup","pully row","Bench Press","Chest Fly","Push-Up","Calf Raise","Leg Press","Squat"], 
                [0.1,0.08,0.11,0.61,1,0.34,0.27,0.05,1,0.19,0.66,0.47], [0.39,0.38,0.44,1.37,6,0.77,0.77,0.22,20,1.05,2.21,1.13],[0.5,0.88,0.96,2.44,20,1.38,1.53,0.54,50,2.58,4.66,2.13]];

  maletable = [["Barbell Curl" ,"Skullcrusher","Triceps Pushdown - Rope Attachment","Deadlift","pullup","pully row","Bench Press","Chest Fly","Push-Up","Calf Raise","Leg Press","Squat"], 
              [0.25,0.24,0.23,1.09, 1, 0.58 ,0.068, 0.1, 1,0.43,1.13,0.91], [.58,.60,0.63,1.87,15,1.09,1.23,.34,45,1.32,2.85,1.61],[1.09,1.13,1.25,2.86,36,1.74,1.93,0.74,100,2.7,4.98,2.52]];                  

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
    this.backpre = []
    this.armpre = []
    this.legpre = []
    this.chestpre = []
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
     if (FinalPlan != []){
       FinalPlan = []
     }
      //generates workout plan for days avail, days rest when not avail 
      if(user.avail.length ==7 || user.avail.length ==6){
       FinalPlan.push(this.getDayExercise(user ,this.backpre, user.avail[0]))
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[1]))
       FinalPlan.push(this.getMultiDay(user, this.legpre, this.armpre, user.avail[2]))
       FinalPlan.push(this.getDayExercise(user,this.backpre, user.avail[4]))
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[5]))
      }
      else if(user.avail.length ==5){
       FinalPlan.push(this.getDayExercise(user,this.backpre, user.avail[0]))
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[1]))
       FinalPlan.push(this.getDayExercise(user,this.legpre, user.avail[2]))
       FinalPlan.push(this.getDayExercise(user,this.armpre, user.avail[3]))
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[4]))
      }
      else if(user.avail.length ==4){
       FinalPlan.push(this.getDayExercise(user,this.chestpre, user.avail[0]))
       FinalPlan.push(this.getDayExercise(user,this.backpre, user.avail[1]))
       FinalPlan.push(this.getDayExercise(user,this.legpre, user.avail[2]))
       FinalPlan.push(this.getDayExercise(user,this.armpre, user.avail[3]))
      }
 
     else if(user.avail.length ==3){
       FinalPlan.push(this.getMultiDay(user,this.backpre, this.chestpre, user.avail[0]))
       FinalPlan.push(this.getMultiDay(user,this.legpre, this.armpre, user.avail[1]))
       FinalPlan.push(this.getMultiDay(user,this.backpre, this.chestpre, user.avail[2]))
     }
     else if(user.avail.length ==2){
       FinalPlan.push(this.getMultiDay(user,this.backpre, this.chestpre, user.avail[0]))
       FinalPlan.push(this.getMultiDay(user,this.legpre, this.armpre, user.avail[1]))
     }
     else if(user.avail.length ==1){
       FinalPlan.push(this.getMultiDay(user,this.backpre,this.chestpre,user.avail[0]))
       FinalPlan.push(this.getMultiDay(user,this.armpre,this.legpre,user.avail[0]))
     }
     else{
       console.log("ERROR NO AVAIL DAYS")
     }
     
     //write the workout plan to firebase
     //console.log(FinalPlan)
     var userid = firebase.auth().currentUser.uid;

     //console.log(FinalPlan)
     firebase.database().ref('workout/'+userid).set({
       'FinalPlan': FinalPlan
     });
    FinalPlan = []
  }

  private getDayExercise( user , preset, day){
    var tgender = user.gender
    var tskill = user.level
    let tempworkout = this.malestrengthtable(user.weight, tskill, preset)
    if(tempworkout)
    if (tgender == 'Male'){
      let workout = {
        day: day,
        workout: tempworkout
      };
      return workout
    } 
    if (tgender == 'Female'){
      let workout = {
        day: day,
        workout: this.femalestrengthtable(user.weight, tskill, preset)
      };
      return workout
  }
}


private getMultiDay(user, preset1, preset2, day){
  let work1 = this.getDayExercise(user,preset1, day)
  //console.log(work1)
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

private malestrengthtable(weight, skill, exercise){
  var skillNum = 0;
  if (skill == "Beginner") {
    skillNum = 1;
  } else if (skill == "Intermediate") {
    skillNum = 2;
  } else {
    skillNum = 3;
  }
  var index = 0
  let ex = []
  //console.log(exercise)
  while(index < exercise.length){
      let tempweight = 0;
      let pullPushWeight = '';
      let name = "";
      let setNum = 0;
      let sets = []
      let lreps = 0;
      let ureps = 0;
      let reps = ''
      if(ex.length > exercise.length){
        ex = []
      }
    var exerName = exercise[index].name
    //loop through the exercise names
    console.log(this.maletable[1][0])
    for(let i = 0; i < this.maletable[0].length; i++){
      
      if(exerName == this.maletable[0][i]){
        //tempweight = this.round5(Number(this.maletable[skillNum][i]) * weight);
        tempweight = this.round5(Number(this.maletable[skillNum][i]) * weight);
        pullPushWeight = String(this.maletable[skillNum][i]);
        //gets exercise metadata
        name = exercise[index].name;
        setNum = exercise[index].setNum;
        for (let k = 0; k < setNum; ++k) {
          if (exercise[index].sets.reps > 1){
            lreps = exercise[index].sets.reps -1
          }
          else{
            lreps = exercise[index].sets.reps
          }
          ureps = exercise[index].sets.reps +2
          reps = String(lreps + "-" + ureps)
          //creates exercise object
          if (name == "pullup" || name == "Push-Up") {
            var set = {
              reps: pullPushWeight,
              weight: 0
            }  
          } else {
            var set = {
              reps: reps,
              weight: tempweight
            };
          }
          
          sets.push(set);
        }
      }
    }
    
    var exer = {
      name: name,
      setNum: setNum,
      sets: sets
    };
    //console.log(exer)
    ex.push(exer);
    index++
  }
 // console.log(ex)
  return ex;
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
  var index = 0
  let ex = []
  //console.log(exercise)
  while(index < exercise.length){
      let tempweight = 0;
      let pullPushWeight = '';
      let name = "";
      let setNum = 0;
      let sets = []
      let lreps = 0;
      let ureps = 0;
      let reps = ''
      if(ex.length > exercise.length){
        ex = []
      }
    var exerName = exercise[index].name
    //loop through the exercise names
    for(let i = 0; i < this.femaletable[0].length; i++){
      if(exerName == this.femaletable[0][i]){
        //tempweight = this.round5(Number(this.maletable[skillNum][i]) * weight);
        tempweight = this.round5(Number(this.femaletable[skillNum][i]) * weight);
        pullPushWeight = String(this.femaletable[skillNum][i]);
        //gets exercise metadata
        name = exercise[index].name;
        setNum = exercise[index].setNum;
        for (let k = 0; k < setNum; ++k) {
          if (exercise[index].sets.reps > 1){
            lreps = exercise[index].sets.reps -1
          }
          else{
            lreps = exercise[index].sets.reps
          }
          ureps = exercise[index].sets.reps +2
          reps = String(lreps + "-" + ureps)
          //creates exercise object
          if (name == "pullup" || name == "Push-Up") {
            var set = {
              reps: pullPushWeight,
              weight: 0
            }  
          } else {
            var set = {
              reps: reps,
              weight: tempweight
            };
          }
          
          sets.push(set);
        }
      }
    }
    
    var exer = {
      name: name,
      setNum: setNum,
      sets: sets
    };
    //console.log(exer)
    ex.push(exer);
    index++
  }
 // console.log(ex)
  return ex;
}






    
}
