import { Component } from '@angular/core';

import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { Http} from '@angular/http';
import { IonicPage, NavController, NavParams,ViewController,} from 'ionic-angular';
/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})
export class ContentPage {
  
  posts: any;
  public form                   : FormGroup;
  public technologyimg          : any;
  public technologycaption             : any;
  public technologyhead         : any;
  public technologycontent              : any;
  public technologyfooter             : any;
  public manualDetails : any;

  public recordID               : any      = null;
  
  public items : any = [];
  passedId = null;
  public manual : any;

  constructor(public navParams: NavParams,public http:Http,public fb :FormBuilder,public navCtrl: NavController, public NP: NavParams,private ViewController:ViewController) {
    const data = JSON.parse(localStorage.getItem('record'));
                          this.manual = data.record;
    this.form = fb.group({
      "manual_img"                  : ["", Validators.required],
      "manual_caption"               : ["", Validators.required],
      "manual_head"                : ["", Validators.required],
      "manual_content"               : ["", Validators.required],
      "manual_footer"               : ["", Validators.required]
      
    });}
  
  
  

    ionViewDidLoad() {

      //console.log(this.NP.get('record'));
      this.initializeItems();
      
      this.http.get('https://braziliandev.000webhostapp.com/DB123/retrieve-data7.php').map(res => res.json()).subscribe(data => {
        this.posts = data;
       // console.log(this.posts);
  
    });
    this.load();
     this.resetFields();
  
     if(this.NP.get("record"))
     {
        
        this.selectEntry(this.NP.get("record"));
        
     }
     else
     {
      
     }
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

  selectEntry(item : any) : void
  {
    this.technologyimg    = item.manual_img;
    this.technologycaption      = item.manual_caption;
    this.technologyhead         = item.manual_head;
    this.technologycontent      = item.manual_content;
    this.technologyfooter     = item.manual_footer;

   
    this.recordID               = item.id;
  }
  
   initializeItems() {
    this.items =this.posts;
  }
  
  
  resetFields() : void
  {
   
    this.technologyimg      = "";
    this.technologycaption     = "";
    this.technologyhead      = "";
    this.technologycontent    = "";
    this.technologyfooter     = "";
  
  
  }


 
}
