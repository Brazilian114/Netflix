import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, AlertController, ToastController,App} from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Http,Headers, RequestOptions } from '@angular/http';
//import{ AngularFireDatabase} from 'angularfire2/database';
//import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map'; 
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
//import {TranslateService} from '@ngx-translate/core';
/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  posts: any;
  public items : any = [];
  public items2 : any = [];
  public dataSet : any = [];
  public userDetails : any;

  userPostData = {"user_id":"","token":"","username":"","tel":"","email":"",
  "license":"","province":"","car_type":""};
  public resposeData : any;

    constructor( 
                 public alertCtrl   :AlertController,
                 public http        :Http,
                 public loadingCtrl :LoadingController,
                 public navCtrl     :NavController, 
                 public NP          :NavParams,
                 public loginCtrl   :LoginProvider,
                 public fb          :FormBuilder,
                 public toastCtrl   :ToastController,
                 private alert:AlertController,
                 public auth : LoginProvider)
                  {
  
                    const data = JSON.parse(localStorage.getItem('userData'));
                    this.userDetails = data.userData; 
                    this.userPostData.user_id = this.userDetails.user_id;
                    this.userPostData.token = this.userDetails.token;

                    
    }
  
    ionViewWillEnter()
    {
   
      this.load();
       {
   
      this.load2();
      
    }
    }
  
    load()
    {
       this.http.get('https://braziliandev.000webhostapp.com/DB123/retrieve-data4.php')
       .map(res => res.json())
       .subscribe(data => 
       {
          this.items = data;         
       });
    }

    load2()
    {
       this.http.get('https://braziliandev.000webhostapp.com/DB123/retrieve-data8.php')
       .map(res => res.json())
       .subscribe(data => 
       {
          this.items2 = data;         
       });
    }
  

    initializeItems() {
      this.items =this.posts;
      this.items2 =this.posts;
    }
    
  
 homePage(){
    this.navCtrl.push(HomePage);
                  
  }

  profileUpdate(position:string) {
    this.auth.postData(this.userPostData, "profileUpdate").then((res) => {
      this.resposeData = res;
      
      
      const toast = this.toastCtrl.create({
        message: 'แก้ไขข้อมูลสำเร็จ',
        duration: 1900,
        position: position,
        cssClass: "color"
      });
      toast.present();
      localStorage.setItem('userData',JSON.stringify(this.resposeData))
      console.log("signup success");
       })
  }

  getService() {
        
    this.auth.postData(this.userPostData, "service").then(
    result => {
       this.resposeData = result;
       if (this.resposeData.serviceData) {
          
          this.dataSet = this.resposeData.serviceData;
          
          
        } else {
         console.log("No data");
       }
  },
  err => {
     
  }
  );
  }
  }
  
  
 
 

