import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';



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
    HomePage
    
    
    
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
    HomePage
    
    
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