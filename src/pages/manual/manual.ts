import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContentPage } from '../content/content';
import { Http,Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the ManualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manual',
  templateUrl: 'manual.html',
})
export class ManualPage {
  
  public items : any = [];
  posts: any;

  constructor(public http   : Http,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewWillEnter()
  {
    this.initializeItems();


     this.load();
    
     
  }

   


  async content(param){
    this.navCtrl.push('ContentPage',param);
    console.log(param);
    localStorage.setItem('record',JSON.stringify(param))
   
  }
  load()
{
   this.http.get('https://braziliandev.000webhostapp.com/DB123/retrieve-data7.php')
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
