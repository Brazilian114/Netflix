import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { QueuePage } from '../pages/queue/queue';
import { MainPage } from '../pages/main/main';
//import { ProfilePage } from '../pages/profile/profile';
import { HistoryPage } from '../pages/history/history';
import { RegisterPage } from '../pages/register/register';
import { CanclePage } from '../pages/cancle/cancle';
import { PopupPage } from '../pages/popup/popup';
import { ManualPage } from '../pages/manual/manual';
//import { ContentPage } from '../pages/content/content';
//import { Popup2Page } from '../pages/popup2/popup2';
import { MomentModule } from 'angular2-moment';
import { Http } from '@angular/http';
import { LoginProvider } from '../providers/login/login';
import { ServiceProvider } from '../providers/service/service';
import { CommonProvider } from '../providers/common/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    
    MyApp,
    HomePage,
    MainPage,
    RegisterPage,
    QueuePage,
    HistoryPage,
    CanclePage,
    PopupPage,
    //Popup2Page
    //ProfilePage,
    ManualPage,
    //ContentPage
    
    
    
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule,
    MomentModule,
    
  
    
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    RegisterPage,
    QueuePage,
    HistoryPage,
    CanclePage,
    PopupPage,
    //Popup2Page
    //ProfilePage,
    ManualPage,
    //ContentPage
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,LoginProvider,
    ServiceProvider,
    CommonProvider,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
     
  ]
})
export class AppModule {}