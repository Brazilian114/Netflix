import { Component } from '@angular/core';
import { IonicPage,App, NavController, NavParams , LoadingController, AlertController, ToastController} from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Http,Headers, RequestOptions } from '@angular/http';
import { ContentPage } from '../content/content';
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';

import 'rxjs/add/operator/map'; 


/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  public userDetails : any;
  userPostData = {"username":"","email":"","name":"","gender":"","birthday":"","tel":""};
  public dataSet : any;
  public resposeData : any;
  
  
  
    constructor(public loginCtrl:LoginProvider,public navCtrl: NavController, public navParams: NavParams,public app : App) {
                            const data = JSON.parse(localStorage.getItem('userData'));
                            this.userDetails = data.userData;
    }



  

  edit() {
    if (this.userPostData.username,this.userPostData.email,this.userPostData.name
      ,this.userPostData.gender,this.userPostData.birthday,this.userPostData.tel) {
      //this.common.presentLoading();
      this.loginCtrl.postData(this.userPostData, "feedEdit")
        .then((result) => {
          this.resposeData = result;
          if (this.resposeData.feedData) {
           // this.common.closeLoading();
            //this.dataSet.unshift(this.resposeData.feedData);
            this.userPostData.username = "";
            this.userPostData.email = "";
            this.userPostData.name = "";
            this.userPostData.gender = "";
            this.userPostData.birthday = "";
            this.userPostData.tel = "";
          } else {
            console.log("No access");
          }

        }, (err) => {
          //Connection failed message
        });
    }

  }

  // Retrieve the JSON encoded data from the remote server
  // Using Angular's Http class and an Observable - then
  // assign this to the items array for rendering to the HTML template
 
}


  
  
    
    

