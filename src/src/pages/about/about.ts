import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditPage } from '../edit/edit';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  public userDetails : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public app : App) {
                          const data = JSON.parse(localStorage.getItem('userData'));
                          this.userDetails = data.userData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
edit(){
  this.navCtrl.push(EditPage);
}
  }