import { Component,ViewChild} from '@angular/core';
import { NavController,ToastController,AlertController,ViewController,LoadingController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { MainPage } from '../main/main';

import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';


//import{ AngularFireDatabase} from 'angularfire2/database';

import 'rxjs/add/operator/map'; 
import { Http } from '@angular/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  resposeData : any;
  userData = {"username":"","password":""};



 constructor(private loading : LoadingController,private viewCtrl: ViewController, public http:Http ,public navCtrl: NavController,private toastCtrl:ToastController,
  private alert:AlertController,private auth:LoginProvider )  {

                   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  
  }
  loginn(){
    if(this.userData.username && this.userData.password){
          this.auth.postData(this.userData, "login").then((result) =>{
          this.resposeData = result;
          console.log(this.resposeData);
          if(this.resposeData.userData){
            localStorage.setItem('userData',JSON.stringify(this.resposeData))
            this.navCtrl.push(MainPage);

          }else{
            let alert = this.alert.create({
              title: 'ไม่พบผู้ใช้งาน',
              subTitle: 'กรุณาตรวจสอบอีเมลล์หรือรหัสผ่าน!',
              buttons: ['OK']
          });
        
          alert.present();
          }


          
          }, (err) =>{
            
      });
    }      
        }

  /*/login(dat){
    let username = this.data.username;
    let password = this.data.password;
    let data = JSON.stringify({username, password});
    let link = "http://localhost/DB/login.php";

    this.http.post(link,data)
        .subscribe(data=>{
            let loader = this.loading.create({
                content: "Checking ! Please wait...",
                duration: 1000
            });
            loader.present();
          this.navCtrl.push("MainPage",dat);
        },error => {
            let alert = this.alert.create({
                title: 'Warning',
                subTitle: 'Wrong Username or Password! Please Try Again !',
                buttons: ['OK']
            });
            alert.present();
        });
  }*/

 

 


  click(){
     this.navCtrl.push(RegisterPage);


  }
  main(){
    this.navCtrl.push(MainPage);


 }
/*public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("Success", "Account created.");
          } else {
            this.showPopup("Error", "Problem creating account.");
          }
        },
        error => {
          this.showPopup("Error", error);
        });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }*/
 
  /*login(){
    this.auth.auth.signInWithEmailAndPassword(this.user.value,this.password.value)
    .then(data=>{
      console.log("user login Successfully,", data);
      let toast = this.toastCtrl.create({
        message: 'Login Successfully',
        duration: 2000,   
      });
  
      toast.present(toast);
      this.navCtrl.push(MainPage);
    })
    .catch(error =>{
      console.log("Error....",error);

      let alert = this.alertCtrl.create({
        title: 'Opp!',
        subTitle: 'ไม่พบข้อมูลกรุณาตรวจสอบชื่อหรือพาสเวิร์ด',
        buttons: ['OK']
      });
      alert.present();
    })
 
 console.log(this.user.value);
 
  }

*/































 }

 




