import { Component } from '@angular/core';
import { Platform ,PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { HomePage } from '../pages/home/home';


//import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {

  rootPage:any = HomePage;

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