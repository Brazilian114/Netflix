import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { QueuePage } from '../queue/queue';
import { HistoryPage } from '../history/history';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public app : App) {
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
}
