import { Injectable } from '@angular/core';
import { NavController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadingService {
  loading: any;
  constructor() {
    this.loading = null;
  }

  showLoading(nav:NavController){
    this.loading = Loading.create({
      content: "Та түр хүлээнэ үү..."
    });
    nav.present(this.loading);
  }
  stopLoading(){
    // if(this.loading){
    //   this.loading.dismiss();
    //   this.loading = null;
    // }
    this.loading.dismiss();
  }
}

