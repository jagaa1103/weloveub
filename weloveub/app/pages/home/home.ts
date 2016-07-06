import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {RestaurantsListPage} from '../restaurants-list/restaurants-list';
import {CoffeeshopListPage} from '../coffeeshop-list/coffeeshop-list';
import {ResortsListPage} from '../resorts-list/resorts-list';
import {AddInfoPage} from '../add-info/add-info';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private nav: NavController) {

  }

  goRestaurants(){
    this.nav.push(RestaurantsListPage);
  }

  goCoffeeshops(){
    this.nav.push(CoffeeshopListPage);
  }

  goResorts(){
    this.nav.push(ResortsListPage);
  }

  addInfo(){
    this.nav.push(AddInfoPage);
  }
}
