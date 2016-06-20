import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the NightclubsListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/nightclubs-list/nightclubs-list.html',
})
export class NightclubsListPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor() {
  }
}
