import { Component } from '@angular/core';
import { Platform ,PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RegisterPage } from '../pages/register/register';
import { MainPage } from '../pages/main/main';
import { QueuePage } from '../pages/queue/queue';
import { HistoryPage } from '../pages/history/history';
import { ProfilePage } from '../pages/profile/profile';
import { PopupPage } from '../pages/popup/popup';
import { Popup2Page } from '../pages/popup2/popup2';
import { HomePage } from '../pages/home/home';
import { ManualPage } from '../pages/manual/manual';
import { CanclePage } from '../pages/cancle/cancle';
import { ContentPage } from '../pages/content/content';

//import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {

  rootPage:any = MainPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    //this.translate.setDefaultLang('th');
    //his.translate.use('th');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}