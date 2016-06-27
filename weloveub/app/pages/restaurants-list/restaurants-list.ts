import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, Loading } from 'ionic-angular';
import {Observable} from 'rxjs';

import {DataService} from '../../providers/data-service/data-service';
import {LoadingService} from '../../providers/loading-service/loading-service';
import {DetailPage} from '../detail/detail';
/*
  Generated class for the RestaurantsListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/restaurants-list/restaurants-list.html',
  providers: [DataService, LoadingService]
})
export class RestaurantsListPage {
  // static get parameters() {
  //   return [[NavController]];
  // }
  items = [];
  segment = "байршил";
  loading: Loading = null;

  constructor(private dataService: DataService, private loadingService: LoadingService, private view: ViewController, private _navController: NavController, private _navParams: NavParams) {
    console.log("RestaurantsListPage init");
    this.loading = Loading.create({
      content: "Та түр хүлээнэ үү..."
    });
    this._navController.present(this.loading);
    this.dataService.getAllData().subscribe(data => this.showList(data));
  }

  showList(items){
    this.items = items;
    if(this.loading !== null){
      this.loading.dismiss();
      this.loading = null; 
    }
    
    console.log(this.items);
  }

  showDetail(item){
    this._navController.push(DetailPage, {
      item: item
    });
  }
}
