import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { MapPage } from '../pages/map/map';
import { RegisPage } from '../pages/regis/regis';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { EditPage } from '../pages/edit/edit';
import{ AgmCoreModule } from '@agm/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfilePage } from '../pages/profile/profile';
import { SettingPage } from '../pages/setting/setting';
import { DetailPage } from '../pages/detail/detail';
import { SearchPage } from '../pages/search/search';
import { ParallaxDirective} from '../directives/parallax/parallax';
import { IonicStorageModule } from '@ionic/storage';
//import{ AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule} from 'angularfire2/database';
import { HttpModule } from '@angular/http';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginProvider } from '../providers/login/login';
import { ServiceProvider } from '../providers/service/service';
import { CommonProvider } from '../providers/common/common';




/*var config = {
  apiKey: "AIzaSyC1fUh2MfJYLuj8mXq9CGNIhqxesKQPdgQ",
  authDomain: "test-e31c2.firebaseapp.com",
  databaseURL: "https://test-e31c2.firebaseio.com",
  projectId: "test-e31c2",
  storageBucket: "test-e31c2.appspot.com",
  messagingSenderId: "694663320680"
};
*/
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisPage, 
    ProfilePage,
    SettingPage,
    DetailPage,
    SearchPage,
    ParallaxDirective,
    ListPage,
    MainPage,
    AboutPage,
    EditPage,
    MapPage
    
    



  ],
  imports: [
    AgmCoreModule.forRoot({
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    //AngularFireDatabaseModule,
    //AngularFireModule.initializeApp(config),
    HttpModule,
    IonicStorageModule.forRoot()
    //AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisPage, 
    ProfilePage,
    SettingPage,
    DetailPage,
    SearchPage,
    ListPage,
    MainPage,
    AboutPage,
    EditPage,
    MapPage
    

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    ServiceProvider,
    CommonProvider,
    
  ]
})
export class AppModule {}
