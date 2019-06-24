import { Component } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { IonicPage,ModalController, NavController, NavParams,App ,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { QueuePage } from '../queue/queue';
import { HistoryPage } from '../history/history';
import { LoginProvider } from '../../providers/login/login';
import { ProfilePage } from '../profile/profile';
import { ManualPage } from '../manual/manual';
//import { HttpClientModule, HttpClient } from '@angular/common/http';

import {CanclePage} from '../cancle/cancle'
//import {TranslateService} from '@ngx-translate/core';
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

  userPostData = {"user_id":"","token":"","created":"",
    "license":"","province":"","tel": "","booking_id": "","lastCreated":""};
    public dataSet : any;
    public resposeData : any;
    public lastCreated : any;
  public userDetails : any;
  posts: any;
  public items : any = [];

  constructor(public Modal   :ModalController,public loginCtrl   :LoginProvider,public alertCtrl:AlertController ,public navCtrl: NavController, public navParams: NavParams,public app : App,public http   : Http) {
    const data = JSON.parse(localStorage.getItem('userData'));
                          this.userDetails = data.userData;
                          this.userPostData.user_id = this.userDetails.user_id;
                          this.userPostData.token = this.userDetails.token;
                          this.userPostData.lastCreated="";
                          this.getQueue();
                         
                          
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.load();
    this.initializeItems();
  }
 
 
  initializeItems() {
    this.items =this.posts;
  }

  // Retrieve the JSON encoded data from the remote server
  // Using Angular's Http class and an Observable - then
  // assign this to the items array for rendering to the HTML template
 
  
  load()
  {
     this.http.get('https://braziliandev.000webhostapp.com/DB123/retrieve-data6.php')
     .map(res => res.json())
     .subscribe(data => 
     {
        this.items = data;         
     });
  }
  
  
  getQueue() {
        
    this.loginCtrl.postData(this.userPostData, "queue").then(
    result => {
       this.resposeData = result;
       if (this.resposeData.queueData) {
          
          this.dataSet = this.resposeData.queueData;
          
          
        } else {
         console.log("No data");
       }
  },
  err => {
     
  }
  );
  }

  viewEntry(param)
  {
     this.navCtrl.push('ProfilePage', param);
  }

  queuePage(){
    this.navCtrl.push(QueuePage);
            
           
 }
  historyPage(){
  this.navCtrl.push(HistoryPage);
}

canclePage(){
  this.navCtrl.push(CanclePage);       
}

manualPage(){
  this.navCtrl.push(ManualPage);       
}


profilePage(param)
  {
     this.navCtrl.push('ProfilePage', param);
  }

  
  home() {
    let confirm = this.alertCtrl.create({
      title: 'ออกจากระบบ',
      message: 'คุณต้องการออกจากระบบหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
          this.navCtrl.setRoot(HomePage);
          let nav = this.app.getRootNav();
          nav.setRoot(HomePage);

          }
        }
      ]
    });
    confirm.present();
  }



  converTime(time) {
    let a = new Date(time * 1000);
    return a;
  }

  async content(param){
    let modal = this.Modal.create("Popup2Page",param);
    console.log(param);
    localStorage.setItem('record',JSON.stringify(param))
    //localStorage.setItem('userPostData',JSON.stringify(this.resposeData))
    // this.navCtrl.push(modal);
    modal.present();
  }
}
