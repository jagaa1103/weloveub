import { Injectable, Inject } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import {AngularFire, FirebaseDatabase, FirebaseRef, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

declare var firebase: any;

@Injectable()
export class DataService {
  datas = [];
  items: FirebaseListObservable<any[]>;
  ref: any;
  storageRef: any;
  db: FirebaseDatabase;
  greeting: FirebaseObjectObservable<any>;
  photoUrls = [];
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
    return new Promise(resolve => {
        this.db.list('/items').push(item);
        resolve(true);
    });
  }

  saveObject(item: Info){
    window.history.back();
  }

  uploadPhotos(imageDatas: Array<String>){
    return new Promise(resolve => {
      imageDatas.forEach(function(imageData){
        this.uploadImage(imageData).then((url) => {
          this.photoUrls.push();
        });
      });
      resolve(this.photoUrls);
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
    // Observe state change events such as progress, pause, and resume
    // See below for more detail
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        resolve(downloadURL);
      });
      console.log('upload done!!!');
    })
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

