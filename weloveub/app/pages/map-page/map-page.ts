import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
 
@Component({
  templateUrl: 'build/pages/map-page/map-page.html'
})
export class MapPage {
  map: any;
  mapInitialised: boolean = false;
  apiKey: any;

  constructor(private nav: NavController) {
    this.apiKey = "AIzaSyCNkndzLKPRmiW_GFrYS-mSJ9pXhyWMCfg";
    // this.loadGoogleMaps();
  }
  
}

