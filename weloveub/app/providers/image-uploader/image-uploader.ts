import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class ImageUploader {
  data: any;
  storageRef: any;
  constructor(private http: Http) {
    this.data = null;
    // Create a root reference
    this.storageRef = firebase.storage().ref();   // true
  }

  uploadImage(imageSource: String, count: Number){
    console.log("sourceToImage");
    // var blob = new Blob([imageBase64], {type: 'image/jpeg'});
    // blob.name = Math.random().toString(36).substr(2, 9) + '.jpg';
    return new Promise(resolve => {
      var blob = this.b64toBlob(imageSource);
      blob.name = Math.random().toString(36).substr(2, 9) + '.jpg';
      
      var uploadTask = this.storageRef.child('images/' + blob.name).put(blob);
      uploadTask.on('state_changed', function(snapshot){
        console.log(snapshot);
      }, function(error) {
        resolve(false);
      }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        resolve(downloadURL);
      });
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

