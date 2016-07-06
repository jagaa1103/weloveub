import { Component } from '@angular/core';
import { NavController, Loading } from 'ionic-angular';
import { DataService } from '../../providers/data-service/data-service'; 
import { DetailPage } from '../detail/detail';
@Component({
  templateUrl: 'build/pages/coffeeshop-list/coffeeshop-list.html',
  providers: [DataService]
})

export class CoffeeshopListPage {
  
 items = [];
  segment = "байршил";
  loading: Loading = null;
  
  constructor(private _nav: NavController, private dataService: DataService) {
    if(!this.loading){
      this.loading = Loading.create({
        content: "Та түр хүлээнэ үү...",
        dismissOnPageChange: true
      });
      this._nav.present(this.loading);
    }
    this.dataService.getData("coffeeshop").subscribe(res => {
      this.showList(res);

      if(res.length > 0 && this.loading !== null){
        setTimeout(() => {
          if(this.loading !== null){
            this.loading.dismiss();
            this.loading = null;
          }
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
