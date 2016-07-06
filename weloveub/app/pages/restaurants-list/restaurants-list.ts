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

  constructor(private dataService: DataService, private loadingService: LoadingService, private view: ViewController, private _nav: NavController, private _navParams: NavParams) {
    console.log("RestaurantsListPage init");
    if(!this.loading){
      this.loading = Loading.create({
        content: "Та түр хүлээнэ үү...",
        dismissOnPageChange: true
      });
      this._nav.present(this.loading);
    }
    this.dataService.getData("restaurant").subscribe(res => {
      this.showList(res);

      if(res.length > 0 && this.loading !== null){
        setTimeout(() => {
          this.loading.dismiss();
          this.loading = null;
        }, 100);
      }
    });
  }

  showList(items){
    this.items = items;
    console.log(this.items);
  }

  showDetail(item){
    this._nav.push(DetailPage, {
      item: item
    });
  }
}
