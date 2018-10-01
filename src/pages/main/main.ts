import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { QueuePage } from '../queue/queue';
import { HistoryPage } from '../history/history';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public userDetails : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public app : App) {
                          const data = JSON.parse(localStorage.getItem('userData'));
                          this.userDetails = data.userData; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
  queuePage(){
    this.navCtrl.push(QueuePage);
            
           
 }
  historyPage(){
  this.navCtrl.push(HistoryPage);
          
         
}
  profilePage(){
  this.navCtrl.push(ProfilePage);
          
         
}
}
