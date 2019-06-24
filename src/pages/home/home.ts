import { Component,ViewChild} from '@angular/core';
import { NavController,ToastController,AlertController,ViewController,LoadingController} from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { MainPage } from '../main/main';

import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';


//import{ AngularFireDatabase} from 'angularfire2/database';

//import 'rxjs/add/operator/map'; 
import { Http } from '@angular/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 


  
  resposeData : any;
  userData = {"username":"","password":""};

  public items : any = [];
  

 constructor(private loading : LoadingController,private viewCtrl: ViewController, public http:Http ,public navCtrl: NavController,private toastCtrl:ToastController,
  private alert:AlertController,private auth:LoginProvider )  {
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  
  }

 
  
  loginn(position: string){
    if(this.userData.username && this.userData.password){
          this.auth.postData(this.userData, "login").then((result) =>{
          this.resposeData = result;
          console.log(this.resposeData);
          
          if(this.resposeData.userData){
            localStorage.setItem('userData',JSON.stringify(this.resposeData))
            this.navCtrl.push(MainPage);

            const loader = this.loading.create({
              content: "Please wait...",
              duration: 1000
            });
            loader.present();
          

          }else{

            
            
            const toast = this.toastCtrl.create({
              message: 'อีเมล์ หรือ รหัสผ่าน ไม่ถูกต้อง',
              duration: 1900,
              position: position,
              cssClass: "color"
            });
            toast.present();

          }
        
          }, (err) =>{
            
      });
    }      
        }


  click(){
     this.navCtrl.push(RegisterPage);


  }
  main(){
    this.navCtrl.setRoot(MainPage);


 }

}






























 

 




