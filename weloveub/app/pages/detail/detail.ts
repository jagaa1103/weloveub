import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/detail/detail.html'
})
export class DetailPage {
  info: any;
  map: any;
  apiKey = "AIzaSyCNkndzLKPRmiW_GFrYS-mSJ9pXhyWMCfg";

  constructor(private _navController: NavController, private _navParams: NavParams) {
    this.info = _navParams.get('item');
    // this.map = null;
    
    // let script = document.createElement("script");
    // script.id = "googleMaps";

    // if(this.apiKey){
    //     script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
    // } else {
    //     script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';               
    // }
    // this.loadMap(); 
  }


  loadMap(){
    var mapProp = {
	    center: new google.maps.LatLng(37.5645557,126.9849151),
	    zoom:12,
	    panControl: false,
	    zoomControl: true,
	    scaleControl: false,
	    mapTypeControl: false,
	    streetViewControl: false,
	    scrollwheel: false,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
    this.map = new google.maps.Map(document.getElementById("map_field"), mapProp);
  }
  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = "<h4>Information!</h4>";          
    this.addInfoWindow(marker, content);
  }
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.open(this.map, marker);
    });
  
  }
}
