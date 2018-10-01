import { Component } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { IonicPage, NavController, NavParams,App  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { QueuePage } from '../queue/queue';
import { HistoryPage } from '../history/history';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public userDetails : any;
  posts: any;
  public items : any = [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public app : App,public http   : Http) {
                          const data = JSON.parse(localStorage.getItem('userData'));
                          this.userDetails = data.userData; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
  ionViewWillEnter()
  {
    this.initializeItems();

    this.http.get('http://localhost/DB123/retrieve-data.2.php').map(res => res.json()).subscribe(data => {
      this.posts = data;
     // console.log(this.posts);

  });

     this.load();
    
     
  }
 
  

  // Retrieve the JSON encoded data from the remote server
  // Using Angular's Http class and an Observable - then
  // assign this to the items array for rendering to the HTML template
  load()
  {
     this.http.get('http://localhost/DB123/retrieve-data.2.php')
     .map(res => res.json())
     .subscribe(data => 
     {
        this.items = data;         
     });
  }
  
  
  initializeItems() {
    this.items =this.posts;
  }
  

  // Allow navigation to the AddTechnology page for creating a new entry



  // Allow navigation to the AddTechnology page for amending an existing entry
  // (We supply the actual record to be amended, as this method's parameter, 
  // to the AddTechnology page
  viewEntry(param)
  {
     this.navCtrl.push('ProfilePage', param);
  }
  queuePage(){
    this.navCtrl.push(QueuePage);
            
           
 }
  historyPage(){
  this.navCtrl.push(HistoryPage);
          
         
}

profilePage(param)
  {
     this.navCtrl.push('ProfilePage', param);
  }
}
