import { Component , OnInit} from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams ,PopoverController,ViewController,ToastController} from 'ionic-angular';
import { MainPage } from '../main/main';
import { Http,Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { HttpHeaders } from '@angular/common/http';


/**
 * Generated class for the PopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup3',
  templateUrl: 'popup3.html',
})
export class Popup3Page {

  
    userPostData = {"user_id":"","token":"","created":"",
    "license":"","province":"","tel": "","booking_id": "","lastCreated":""};
    public dataSet : any;
    public resposeData : any;
    public lastCreated : any;
  
  public userDetails : any;
  public userDetails2 : any;
  posts: any;
 
 
  public manual : any;
  
   
  public items : any = [];
    passedId = null;
  constructor(public loginCtrl   :LoginProvider,public alertCtrl   :AlertController,public toastCtrl   :ToastController,public http:Http,public fb :FormBuilder,public navCtrl: NavController, public NP: NavParams,private popover:PopoverController,private ViewController:ViewController) {
                    const data = JSON.parse(localStorage.getItem('queueData'));
                                 this.userDetails = data.queueData; 
                    const data2 = JSON.parse(localStorage.getItem('userData'));
                                 this.userDetails2 = data2.userData; 
                                 this.userPostData.user_id = this.userDetails2.user_id;
                                 this.userPostData.token = this.userDetails2.token;
                                 this.userPostData.lastCreated="";
                                 this.getQueue();

                                 const data3 = JSON.parse(localStorage.getItem('record'));
                                this.manual = data3.record;
                                
                                
                     }

  ionViewDidLoad() {
     
  this.load();
  
}

load()
{
   this.http.get('https://braziliandev.000webhostapp.com/DB123/retrieve-data.2.php')
   .map(res => res.json())
   .subscribe(data => 
   {
      this.items = data;         
   });
}




initializeItems() {
  this.items =this.posts;
}


getQueue() {
        
  this.loginCtrl.postData(this.userPostData, "queue").then(
  result => {
     this.resposeData = result;
     if (this.resposeData.queueData) 
      {
        
        this.dataSet = this.resposeData.queueData;
        
        
      } 
      else 
      {
       console.log("No data");
     }
            },

      err => {
         
      });
            }



  dismiss() {
    this.ViewController.dismiss();
  }
  
}
