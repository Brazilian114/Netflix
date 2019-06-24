import { Component } from '@angular/core';
import { ViewController,IonicPage, NavController, NavParams,App ,ToastController ,PopoverController,ModalController,AlertController} from 'ionic-angular';
import { Http,Headers, RequestOptions } from '@angular/http';
import { LoginProvider } from '../../providers/login/login';
import { PopupPage } from '../popup/popup';
import { HistoryPage } from '../history/history';
//import {TranslateService} from '@ngx-translate/core';
import 'rxjs/add/operator/map'; 
/**
 * Generated class for the QueuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-queue',
  templateUrl: 'queue.html',
})
export class QueuePage {
  posts: any;
  public items : any = [];
  public items2 : any = [];
  public userDetails : any;
  public dataSet : any;
  membership: any
  value = 0;
  userPostData = {"user_id":"","token":"","username":"","tel":"","user_type":"",
  "license":"","created":"","province": "","service_name": "","time": "","status_id": "","booking_id": ""
  }; 
  
  public resposeData : any;
  public pepperoni:boolean = true;

  constructor(private ViewController:ViewController,private Modal:ModalController,private popover:PopoverController,private auth:LoginProvider,public toastCtrl: ToastController,private alert:AlertController,public http   : Http,public navCtrl: NavController, public navParams: NavParams,public app : App) {
                          const data = JSON.parse(localStorage.getItem('userData'));
                          this.userDetails = data.userData; 
                          this.userPostData.user_id = this.userDetails.user_id;
                          this.userPostData.token = this.userDetails.token;
                          this.getService();
                        }


  ionViewWillEnter()
  {
    this.initializeItems();


     /* {
     this.load2();
    
      
   }*/
     
  }
   /*
async Popover(ev:Event){
  const popover = await this.popover.create({
    component : HistoryPage,
    componentProps : {
      custom_id: this.value
    } ,
    ev : ev
  });
popover.present();
}
*/

presentPopover(myEvent) {
  let popover = this.popover.create(PopupPage);
  popover.present({
    ev: myEvent
  });
}

async showLogin() {
  let modal = this.Modal.create(PopupPage);
  //localStorage.setItem('userPostData',JSON.stringify(this.resposeData))
  // this.navCtrl.push(modal);
  modal.present();
  }
  queueUpdate() {
    if (this.userPostData.username,this.userPostData.created,this.userPostData.license,this.userPostData.province,this.userPostData.tel
      ,this.userPostData.service_name,this.userPostData.time,this.userPostData.status_id,this.userPostData.user_type) {
      //this.common.presentLoading();
      this.auth.postData(this.userPostData, "queueUpdate")
        .then((result) => {
          this.resposeData = result;
          if (this.resposeData.queueData) {
           // this.common.closeLoading();
            //this.dataSet.unshift(this.resposeData.queueData);
           /* this.userPostData.username = "";
            this.userPostData.created = "";
            this.userPostData.license = "";
            this.userPostData.province = "";
            this.userPostData.service_name = "";
            this.userPostData.time = "";
            this.userPostData.tel = "";
            this.userPostData.status_id = "";
            this.userPostData.user_type = "";*/
            
            console.log(this.resposeData);
            if(this.resposeData.queueData){
              localStorage.setItem('queueData',JSON.stringify(this.resposeData))
              let modal = this.Modal.create(PopupPage);
              //localStorage.setItem('userPostData',JSON.stringify(this.resposeData))
              // this.navCtrl.push(modal);
              modal.present();
  
            }else{
              let alert = this.alert.create({
                title: 'ไม่พบผู้ใช้งาน',
                subTitle: 'กรุณาตรวจสอบอีเมลล์หรือรหัสผ่าน!',
                buttons: ['OK']
            });
          
            alert.present();
            }
  
  
          } else {
            console.log("No access");
          }
  
        }, (err) => {
          //Connection failed message
        });
    }
  
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


/*
for(var i=0;i < this.selectedItems.length ;i++){
      this.orderData = this.selectedItems[i];
      this.authService.postData(this.orderData, "getOrder");
    }*/
/*
load2()
{
   this.http.get('http://localhost/DB123/retrieve-data5.php')
   .map(res => res.json())
   .subscribe(data => 
   {
      this.items2 = data;         
   });
}*/

initializeItems() {
 
 // this.items2 =this.posts;
}

}