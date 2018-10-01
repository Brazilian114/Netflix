import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App ,ToastController } from 'ionic-angular';
import { Http,Headers, RequestOptions } from '@angular/http';
import { LoginProvider } from '../../providers/login/login';
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
  public userDetails : any;

  userPostData = {"user_id":"","token":"","username":"","tel":"",
  "license":"","province": "","booking_service_id": "","datetime": "","status": ""
  };
  
  public resposeData : any;


  constructor(private auth:LoginProvider,public toastCtrl: ToastController,public http   : Http,public navCtrl: NavController, public navParams: NavParams,public app : App) {
                          const data = JSON.parse(localStorage.getItem('userData'));
                          this.userDetails = data.userData; 
                          this.userPostData.user_id = this.userDetails.user_id;
                          this.userPostData.token = this.userDetails.token;
  }


  ionViewWillEnter()
  {
    this.initializeItems();

    this.http.get('http://localhost/DB123/retrieve-data.php').map(res => res.json()).subscribe(data => {
      this.posts = data;
     // console.log(this.posts);

  });

     this.load();
}
feedUpdate() {
  if (this.userPostData.username,this.userPostData.license,this.userPostData.province,this.userPostData.tel
    ,this.userPostData.booking_service_id,this.userPostData.datetime,this.userPostData.status) {
    //this.common.presentLoading();
    this.auth.postData(this.userPostData, "feedUpdate")
      .then((result) => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
         // this.common.closeLoading();
          //this.dataSet.unshift(this.resposeData.feedData);
          this.userPostData.username = "";
          this.userPostData.license = "";
          this.userPostData.province = "";
          this.userPostData.booking_service_id = "";
          this.userPostData.datetime = "";
          this.userPostData.tel = "";
          this.userPostData.status = "";
          const toast = this.toastCtrl.create({
            message: 'Your files were successfully saved',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
        } else {
          console.log("No access");
        }

      }, (err) => {
        //Connection failed message
      });
  }

}
load()
{
   this.http.get('http://localhost/DB123/retrieve-data.php')
   .map(res => res.json())
   .subscribe(data => 
   {
      this.items = data;         
   });
}

initializeItems() {
  this.items =this.posts;
}

}
