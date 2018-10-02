import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , App ,AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';

/**
 * Generated class for the ProfilePage page.
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
  
  public userDetails : any;

  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public app : App) {
                          const data = JSON.parse(localStorage.getItem('userData'));
                          this.userDetails = data.userData;
                        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  about(){
    this.navCtrl.push(AboutPage);
    }

    showConfirm() {
      let confirm = this.alertCtrl.create({
        title: 'ออกจากระบบ',
        message: 'คุณต้องการออกจากระบบหรือไม่?',
        buttons: [
          {
            text: 'ยกเลิก',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'ตกลง',
            handler: () => {
            this.navCtrl.setRoot(HomePage);
            let nav = this.app.getRootNav();
            nav.setRoot(HomePage);

            }
          }
        ]
      });
      confirm.present();
    }
  }

