import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the ImageUploader provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImageUploader {
  data: any;
  storageRef: any;
  constructor(private http: Http) {
    this.data = null;
    // Create a root reference
    this.storageRef = firebase.storage().ref();   // true
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

