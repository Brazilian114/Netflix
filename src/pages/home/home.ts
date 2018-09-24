import { Component, ViewChild } from '@angular/core';
import { RegisterPage } from '../register/register';
import { MainPage } from '../main/main';
import { LoginProvider } from '../../providers/login/login';
import { NavController,AlertController,ToastController,LoadingController} from 'ionic-angular';
import { Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  resposeData : any;
  userData = {"username":"","password":""};

  data: any;
  public items : any = [];
  
  @ViewChild("username") username;
  @ViewChild("password") password;
  //data:string;
 // items:any;

  constructor(public http:Http,private loading : LoadingController,public navCtrl: NavController,
             public auth:LoginProvider,private alert:AlertController, public toastCtrl:ToastController ) {


   
   

  }

  loginn(){
    if(this.userData.username && this.userData.password){
          this.auth.postData(this.userData, "login").then((result) =>{
          this.resposeData = result;
          console.log(this.resposeData);
          if(this.resposeData.userData){
            localStorage.setItem('userData', JSON.stringify(this.resposeData))
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

  click(){
    this.navCtrl.push(RegisterPage);


 }

/*sign(){

  //// check to confirm the username and password fields are filled
 
  if(this.username.value=="" ){

 let alert = this.alert.create({

 title:"ATTENTION",
 subTitle:"Username field is empty",
 buttons: ['OK']
 });

 alert.present();
  } else

 if(this.password.value==""){

 let alert = this.alert.create({

 title:"ATTENTION",
 subTitle:"Password field is empty",
 buttons: ['OK']
 });

 alert.present();
      
}
 else
 {

  var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });


      let data = {
        username: this.username.value,
        password: this.password.value
      };

      

 let loader = this.loading.create({
    content: 'Processing please wait...',
  });

 loader.present().then(() => {


  this.http.post('http://localhost/DB/login.php',data,options)
  .map(res => res.json())
  .subscribe(res => {
  console.log(res)
   loader.dismiss()
  if(res=="Your Login success"){
   
    let alert = this.alert.create({
      title:"CONGRATS",
      subTitle:(res),
      buttons: ['OK']
      });
     
      alert.present();
      this.navCtrl.push(RegisterPage, data);
  }else
  {
   let alert = this.alert.create({
   title:"ERROR",
   subTitle:"Your Login Username or Password is invalid",
   buttons: ['OK']
   });
  
   alert.present();
    } 
  });
  });
   }
  
  }*/
}
