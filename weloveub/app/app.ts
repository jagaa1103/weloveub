import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {MapPage} from './pages/map-page/map-page';
// import * as firebase from 'firebase';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;
  // rootPage: any = MapPage;

  constructor(platform: Platform) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [  FIREBASE_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyD26EUZKrG0PPJ2Lo5QE09p9-kuNSmRC70",
    authDomain: "project-1766785746105374213.firebaseapp.com",
    databaseURL: "https://project-1766785746105374213.firebaseio.com",
    storageBucket: "project-1766785746105374213.appspot.com"
  })]);