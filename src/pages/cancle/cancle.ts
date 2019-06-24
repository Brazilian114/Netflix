import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams , ModalController,LoadingController, AlertController, ToastController  } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { Http,Headers, RequestOptions } from '@angular/http';
import { Popup2Page } from '../popup2/popup2';

//import 'rxjs/add/operator/map'; 


/**
 * Generated class for the CanclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancle',
  templateUrl: 'cancle.html',
})
export class CanclePage {

  public userDetails : any;
    userPostData = {"user_id":"","token":"","created":"",
    "license":"","province":"","tel": "","booking_id": "","lastCreated":""};
    public dataSet : any;
    public dataSet2 : any;
    public resposeData : any;
    public lastCreated : any;  
    posts: any;

    public items : any = [];
      constructor( //public angularfire :AngularFireDatabase,
                  
                   public alertCtrl   :AlertController,
                   public http        :Http,
                   public loadingCtrl :LoadingController,
                   public navCtrl     :NavController, 
                   public NP          :NavParams,
                   public loginCtrl   :LoginProvider,
                   public fb          :FormBuilder,
                   public toastCtrl   :ToastController,
                   private Modal:ModalController
                   //public common      :CommonProvider,
                   )
                    {
                     
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
     

   load()
      {
         this.http.get('https://braziliandev.000webhostapp.com/DB123/retrieve-data3.php')
         .map(res => res.json())
         .subscribe(data => 
         {
            this.items = data;         
         });
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

 