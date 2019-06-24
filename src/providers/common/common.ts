import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { LoadedModule } from 'ionic-angular/util/module-loader';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  public loader : any;

  constructor(public http: Http,public loadingctrl : LoadingController) {
    console.log('Hello CommonProvider Provider');
  }
presentLoading(){
  this.loader = this.loadingctrl.create({content:"please wait ..."})
  this.loader.present();
}

closeLoading(){
  this.loader.dismiss();
}
}
