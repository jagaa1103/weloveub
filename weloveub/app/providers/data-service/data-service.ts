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
    return this.db.list('items/');
  }
  getData(type){
    return this.db.list('items/'+type);
  }

  saveItem(item: Info){
    // this.saveObject(item);
    console.log("DataService >> saveItem" );
    return new Promise(resolve => {
        this.db.list('/items/' + item.type).push(item);
        resolve(true);
    });
  }

  getPhotoUrl(images: any){
      return new Promise(resolve => {
        var imageSources = images;
        var urls = [];
        imageSources.forEach((image) => {
            this.uploadImage(image).subscribe(url => {
              urls.push(url);
              if(urls.length == imageSources.length){
                  resolve(urls);
              }
            });  
        });
      });
  }
  uploadImage(imageSource: String){
    console.log("sourceToImage");
    return Observable.create(res => {
      var blob = this.b64toBlob(imageSource);
      blob.name = Math.random().toString(36).substr(2, 9) + '.jpg';
      var uploadTask = this.storageRef.child('images/' + blob.name).put(blob);
      uploadTask.on('state_changed', function(snapshot){
      }, function(error) {
        console.log(error);
        res(error);
      }, function() {
        res.next(uploadTask.snapshot.downloadURL);
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
  location: Coordinates;
  photos: any;
  others: String;
}
export class Location{
  latitude: any;
  longitude: any;
}

export class Photo{
  image: String;
}



