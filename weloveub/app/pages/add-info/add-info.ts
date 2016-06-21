import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation, Camera} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/add-info/add-info.html',
})
export class AddInfoPage {
  static get parameters() {
    return [[NavController]];
  }

  ohours = [];
  ehours = [];

  type: String = "restaurant";
  title = "";
  phone = "";
  opentime = 0;
  closetime = 0;  
  location = {
    latitude: 0,
    longitude: 0
  };
  photos = [];
    


  constructor() {
    for(var i=0; i<24; i++){
      this.ohours.push(i);
    }
    for(var i=0; i<24; i++){
      this.ehours.push(i);
    }
  }

  saveInfo(){
    console.log("::::::::: Save Info :::::::::");
    console.log(this.type);
    console.log(this.title);
    console.log(this.phone);
    console.log(this.opentime);
    console.log(this.closetime);
    console.log(this.location);
    console.log(this.photos);
  }

  addLocation(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.location.latitude = resp.coords.latitude;
      this.location.longitude = resp.coords.longitude;
    })
  }
  addPhoto(){
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
    let base64Image = "data:image/jpeg;base64," + imageData;
    console.log(base64Image);
    if(this.photos.length < 11){
      this.photos.push(imageData);
    }else{
      alert("Та 10-аас дээш зураг оруулах боломжгүй.");
    }
      
    }, (err) => {
    });
  }
}

export class Info {
  title: String;
  phone: number;
  time: String;
  location: Location;
  photos: Photo[];
  others: String;
}

export class Photo{
  source: String;
}
