import { Injectable, Inject } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import {AngularFire, FirebaseDatabase, FirebaseRef, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {ImageUploader} from '../image-uploader/image-uploader';

declare var firebase: any;

@Injectable()
export class DataService {
  datas = [];
  items: FirebaseListObservable<any[]>;
  ref: any;
  storageRef: any;
  db: FirebaseDatabase;
  imageUploader: ImageUploader;
  greeting: FirebaseObjectObservable<any>;

  constructor(af: AngularFire) {
    this.ref = firebase.storage().ref;
    this.db = af.database;
    this.storageRef = firebase.storage().ref();   // true
  }

  checkDBConnection(){
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        console.log("connected");
      } else {
        console.log("not connected");
      }
    });
  }
  getAllData(){
    return this.db.list('items');
  }

  saveItem(item: Info){
    // this.saveObject(item);
    console.log("DataService >> saveItem" );
    return new Promise(resolve => {
        this.db.list('/items').push(item);
        resolve(true);
    });
  }

  count = 0;
  photoUrls = [];
  urls = [];
  imageDatas = [];
  uploadPhotos(datas: any){
      this.count = 0;
      this.photoUrls = [];
      this.imageDatas = datas;
    
      this.getPhotoUrl().subscribe(res => {
        console.log(res);
      });
  }

  getPhotoUrl(){
      return Observable.create(res => {
        this.imageDatas.forEach((imageData) => {
          this.uploadImage(imageData).then(url => {
            res.next(url);
            if(res.length == this.imageDatas.length){
              res.complete();
            }
          });  
        });
      });
  }

  uploadImage(imageSource: String){
    console.log("sourceToImage");
    // var blob = new Blob([imageBase64], {type: 'image/jpeg'});
    // blob.name = Math.random().toString(36).substr(2, 9) + '.jpg';
    return new Promise(resolve => {
      var blob = this.b64toBlob(imageSource);
      blob.name = Math.random().toString(36).substr(2, 9) + '.jpg';
      console.log(blob);
      var uploadTask = this.storageRef.child('images/' + blob.name).put(blob);
      uploadTask.on('state_changed', function(snapshot){
        // console.log(snapshot);
      }, function(error) {
        console.log(error);
        resolve(error);
      }, function() {
        resolve(uploadTask.snapshot.downloadURL);
      });
    });
  }

  b64toBlob(b64Data, sliceSize) {
    var sliceSize:any = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
      
    var blob = new Blob(byteArrays, {type: 'image/jpeg'});
    return blob;
  }
}

export class Info {
  type: String;
  title: String;
  phone: number;
  time: String;
  location: Location;
  photos: any[];
  others: String;
}
export class Location{
  latitude: String;
  longitude: String;
}

export class Photo{
  image: String;
}



