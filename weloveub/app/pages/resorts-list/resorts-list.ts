import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ResortsListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/resorts-list/resorts-list.html',
})
export class ResortsListPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor() {
    
  }
}
