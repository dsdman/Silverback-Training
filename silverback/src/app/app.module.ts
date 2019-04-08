import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as firebase from 'firebase';
//Initialize Firebase
var config = {
  apiKey: "AIzaSyCve5acLRX8UfIuU4GtMyFNxiKgGkDGWqM",
  authDomain: "silverback-2d041.firebaseapp.com",
  databaseURL: "https://silverback-2d041.firebaseio.com",
  projectId: "silverback-2d041",
  storageBucket: "silverback-2d041.appspot.com",
  messagingSenderId: "1054455433263"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
