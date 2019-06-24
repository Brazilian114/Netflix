import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../home/home';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'; 
//import {TranslateService} from '@ngx-translate/core';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage  implements OnInit {


  signupform: FormGroup;
  resposeData : any;
  userData = {"username": "","password": "","tel": "","email": "", "license": "", "province_name": "", "type_name": ""};
  
  posts: any;
  public items : any = [];
  public items2 : any = [];

  constructor(
              public  navCtrl  : NavController,
              public  NP       : NavParams,
              //public  fdb      : AngularFireDatabase,              
              public  alert    : AlertController,
              public  http     : Http,
              public  fb       : FormBuilder,
              public toastCtrl  :ToastController,
              public  auth     :LoginProvider) {

         
    }

    ngOnInit() {
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.signupform = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z,ก-ฮ,  ิ,  ี, ุ, ู,โ, ื, ะ, ใ, ้ , ็, า, ๊,  ์ ,ไ, ึ, ่ , ๋ , ั , แ , ำ , เ ]*'), Validators.minLength(4), Validators.maxLength(30)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),    
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        province: new FormControl('', [Validators.required]),
        car_type: new FormControl('', [Validators.required]),
        tel: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12),Validators.pattern('([0-9]{1,3}).([0-9]{1,3})*')]),
        license: new FormControl('', [Validators.required, Validators.maxLength(7)]),
      });
    }

    ionViewWillEnter()
    {
      this.initializeItems();
       this.load();
       {
         this.load2();
    
      
       }
      
      
    }
    initializeItems() {
      this.items =this.posts;
      this.items2 =this.posts;
    }
  load()
{
  this.http.get('https://braziliandev.000webhostapp.com/DB123/retrieve-data4.php')
   //this.http.get('http://localhost/DB123/retrieve-data4.php')
   .map(res => res.json())
   .subscribe(data => 
   {
      this.items = data;         
   });
}

load2()
{
  this.http.get('https://braziliandev.000webhostapp.com/DB123/retrieve-data8.php')
   //this.http.get('http://localhost/DB123/retrieve-data8.php')
   .map(res => res.json())
   .subscribe(data => 
   {
      this.items2 = data;         
   });
}

  home(){
    this.navCtrl.push(HomePage);
  }

  

  signup(position: string){

    this.auth.postData(this.userData, "signup").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    if(this.resposeData.userData){
      
            const toast = this.toastCtrl.create({
          message: 'ลงทะเบียนเรียบร้อย',
          duration: 1900,
          position: position
        });
        toast.present();
        this.navCtrl.push(HomePage);
      
    localStorage.setItem('userData',JSON.stringify(this.resposeData))
    console.log("signup success");
  
  }else{
        
  
  }

    }, (err) =>{
      
    });
    
  }

  
}