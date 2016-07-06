import { Component } from '@angular/core';
import { NavController, Loading } from 'ionic-angular';
import {DataService, Info, Photo, Location} from '../../providers/data-service/data-service';
import {Geolocation, Camera} from 'ionic-native';

import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/add-info/add-info.html',
  providers: [DataService]
})
export class AddInfoPage {

  ohours = [];
  ehours = [];
  photos = [];
  photoFiles = [];
  loading: Loading = null;
  item:Info;

  constructor(private _dataService: DataService, private _nav: NavController) {
    this.photos = [];
    this.item = new Info()
    this.item.type = "restaurant";
    this.prepareHours();
  }

  saveInfo(){
     if(!this.loading){
      this.loading = Loading.create({
        content: "Та түр хүлээнэ үү...",
        dismissOnPageChange: true
      });
      this._nav.present(this.loading);
    }
    console.log("::::::::: Save Info :::::::::");
    this.savePhotos();
  }

  savePhotos(){
    console.log("********** savePhotos ********");
    this._dataService.getPhotoUrl(this.photos).then((urls) => {
      this.item.photos = urls;
      console.log(this.item);
      this.saveToFirebase(this.item);
    });
  }
  saveToFirebase(info: Info){
    console.log("//////// savePhotos /////////");
    this._dataService.saveItem(info).then((data) => {
      if(data){
        setTimeout(()=>{
          if(this.loading !== null){
            this.loading.dismiss();
          }
        }, 100);
        this._nav.push(HomePage);
      }
    });
  }

  addLocation(){
    Geolocation.getCurrentPosition().then((resp) => {
      if(resp && resp.coords){
        this.item.location = resp.coords;
      }else{
        alert("Таны байршлыг тогтоох боломжгүй байна");
      }
    });
  }

  addPhoto(){
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    Camera.getPicture(options).then((imageData) => {
      if(this.photos.length < 11){
        this.photos.push(imageData);
      }else{
        alert("Та 10-аас дээш зураг оруулах боломжгүй.");
      }  
    }, (err) => {
    });
  }

  prepareHours(){
    for(var i=0; i<24; i++){
      this.ohours.push(i);
    }
    for(var i=0; i<24; i++){
      this.ehours.push(i);
    }
  }
}


