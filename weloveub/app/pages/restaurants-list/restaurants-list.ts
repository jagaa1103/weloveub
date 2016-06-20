import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the RestaurantsListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/restaurants-list/restaurants-list.html',
})
export class RestaurantsListPage {
  // static get parameters() {
  //   return [[NavController]];
  // }

  constructor() {
    console.log("RestaurantsListPage init");
  }
}
