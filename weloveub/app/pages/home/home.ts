import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {RestaurantsListPage} from '../restaurants-list/restaurants-list';
import {NightclubsListPage} from '../nightclubs-list/nightclubs-list';
import {ResortsListPage} from '../resorts-list/resorts-list';
import {AddInfoPage} from '../add-info/add-info';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private nav: NavController) {

  }

  // pushPage(buttonColor: string) {
  //   this._navController.push(DetailPage, { color: buttonColor });
  // }

  goRestaurants(){
    this.nav.push(RestaurantsListPage);
  }

  goNightClubs(){
    this.nav.push(NightclubsListPage);
  }

  goResorts(){
    this.nav.push(ResortsListPage);
  }

  addInfo(){
    this.nav.push(AddInfoPage);
  }
}
