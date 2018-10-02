import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams , LoadingController, AlertController, ToastController  } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginProvider } from '../../providers/login/login';
import { CommonProvider } from '../../providers/common/common';
import { ContentPage } from '../content/content';
import { Storage } from '@ionic/storage';
import { MainPage } from '../main/main';


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})

export class ListPage {

    public userDetails : any;
    userPostData = {"user_id":"","token":"","startt":"",
    "brand":"","dated":"","endd": "","feed_id": "","lastCreated":""};
    public dataSet : any;
    public resposeData : any;
    public lastCreated : any;
    public noRecords: boolean;

  
    public form                   : FormGroup;
    public technologystartt            : any;
    public technologyend              : any;
    public technologydate             : any;
    public technologytime             : any;
    public technologysit              : any;
    public technologybrand            : any;
    public technologycolor            : any;
    public technologylicense          : any;
    public technologytel              : any;
    
    // Flag to be used for checking whether we are adding/editing an entry
    public isEdited               : boolean = false;
    // Flag to hide the form upon successful completion of remote operation
    public hideForm               : boolean = false;
    // Property to help ste the page title
    public pageTitle              : string;
    // Property to store the recordID for when an existing entry is being edited
    public recordID               : any      = null;
    private baseURI               : string  = "http://localhost/DB/";
     
    public items : any = [];
      constructor( //public angularfire :AngularFireDatabase,
                   public alertCtrl   :AlertController,
                   public http        :Http,
                   public loadingCtrl :LoadingController,
                   public navCtrl     :NavController, 
                   public NP          :NavParams,
                   public loginCtrl   :LoginProvider,
                   public fb          :FormBuilder,
                   public toastCtrl   :ToastController,
                   public common      :CommonProvider,
                   public storage     :Storage )
                    {
                     
                          const data = JSON.parse(localStorage.getItem('userData'));
                          this.userDetails = data.userData;
                          this.userPostData.user_id = this.userDetails.user_id;
                          this.userPostData.token = this.userDetails.token;
                          this.userPostData.lastCreated="";
                          this.getFeed();
                          this.noRecords = false

                        this.form = fb.group({
                          "startt"                  : ["", Validators.required],
                          "end"                    : ["", Validators.required],
                          "date"                   : ["", Validators.required],
                          "time"                   : ["", Validators.required],
                          "sit"                    : ["", Validators.required],
                          "brand"                  : ["", Validators.required],
                          "color"                  : ["", Validators.required],
                          "license"                : ["", Validators.required],
                          "tel"                    : ["", Validators.required]
                        });
      }
    
      ionViewWillEnter()
      {
        this.load();
         this.resetFields();
    
         if(this.NP.get("record"))
         {
            this.isEdited      = true;
            this.selectEntry(this.NP.get("record"));
            this.pageTitle     = 'Amend entry';
         }
         else
         {
            this.isEdited      = false;
            this.pageTitle     = 'Create entry';
         }
      }
      
     detail(){
       this.navCtrl.push(DetailPage);
     }

     doInfinite(refresher): Promise<any> {
      console.log("Begin async operation");
         return new Promise(resolve => {
         setTimeout(() => {
            this.loginCtrl.postData(this.userPostData, "feed").then(
            result => {
               this.resposeData = result;
               if (this.resposeData.feedData.length) {
                  const newData = this.resposeData.feedData;
                  this.userPostData.lastCreated = this.resposeData.feedData[newData.length - 1].created;
      
           for (let i = 0; i < newData.length; i++) {
              this.dataSet.push(newData[i]);
              refresher.complete();
           }this.noRecords = true;
              console.log("No user updates");
      } else {
          this.noRecords = true;
           console.log("No user updates");
      }
      },
      err => {
      //Connection failed message
      }
      );
      
      
      }, 500);
      });
      }

      getFeed() {
        this.common.presentLoading();
        this.loginCtrl.postData(this.userPostData, "feed").then(
        result => {
           this.resposeData = result;
           if (this.resposeData.feedData) {
              this.common.closeLoading();
              this.dataSet = this.resposeData.feedData;
              // Data set length
              const dataLength = this.resposeData.feedData.length;
              this.userPostData.lastCreated = this.resposeData.feedData[dataLength - 1].created;
            } else {
             console.log("No data");
           }
      },
      err => {
         //Connection failed message
      }
      );
      }

            

           /* feedUpdate() {
              if (this.userPostData.startt,this.userPostData.endd,this.userPostData.brand) {
                //this.common.presentLoading();
                this.loginCtrl.postData(this.userPostData, "feedUpdate")
                  .then((result) => {
                    this.resposeData = result;
                    if (this.resposeData.feedData) {
                     // this.common.closeLoading();
                      this.dataSet.unshift(this.resposeData.feedData);
                      this.userPostData.startt = "";
                      this.userPostData.endd = "";
                    } else {
                      console.log("No access");
                    }
          
                  }, (err) => {
                    //Connection failed message
                  });
              }
          
            }*/
            
          
feedDelete(feed_id, msgIndex) {
  if (feed_id > 0) {
    let alert = this.alertCtrl.create({
        title: 'Delete Feed',
        message: 'Do you want to buy this feed?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }, {
            text: 'Delete',
            handler: () => {
              this.userPostData.feed_id = feed_id;
              this.loginCtrl.postData(this.userPostData, "feedDelete")
                .then((result) => {
                  this.resposeData = result;
                  if (this.resposeData.success) {
                    this.dataSet.splice(msgIndex, 1);
                  } else {
                    console.log("No access");
                  }
                }, (err) => {
                  //Connection failed message
                });
            }
          }
        ]
      });
    alert.present();
  }
}
            

      load()
      {
         this.http.get('http://localhost/DB/retrieve-data.php')
         .map(res => res.json())
         .subscribe(data => 
         {
            this.items = data;         
         });
      }
    
      // Assign the navigation retrieved data to properties
      // used as models on the page's HTML form
      selectEntry(item)
      {
        this.technologystartt        = item.startt;
        this.technologyend          = item.end;
        this.technologydate         = item.date;
        this.technologytime         = item.time;
        this.technologysit          = item.sit;
        this.technologybrand        = item.brand;
        this.technologycolor        = item.color;
        this.technologylicense      = item.license;
        this.technologytel          = item.tel;
        this.recordID               = item.id;
      }
    
    
    
      // Save a new record that has been added to the page's HTML form
      // Use angular's http post method to submit the record data 
      // to our remote PHP script (note the body variable we have created which 
      // supplies a variable of key with a value of create followed by the key/value pairs
      // for the record data
      createEntry(startt, end, date, time, sit, brand, color, tel, license)
      {
         let body     : string   = "key=create&start=" + startt + "&end=" + end + "&date=" +
         date + "&time=" + time + "&sit=" + sit +"&license=" + license +
          "&brand=" + brand + "&color=" + color + "&tel=" + tel,
             type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
             headers  : any      = new Headers({ 'Content-Type': type}),
             options  : any      = new RequestOptions({ headers: headers }),
             url      : any      = this.baseURI + "manage-data.php";
    
         this.http.post(url, body, options)
         .subscribe((data) =>
         {
            // If the request was successful notify the user
            if(data.status === 200)
            {
               this.hideForm   = true;
               this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
            }
            // Otherwise let 'em know anyway
            else
            {
               this.sendNotification('Something went wrong!');
            }
         });
      }
    
    
    
      // Update an existing record that has been edited in the page's HTML form
      // Use angular's http post method to submit the record data 
      // to our remote PHP script (note the body variable we have created which 
      // supplies a variable of key with a value of update followed by the key/value pairs
      // for the record data
      updateEntry(startt, end, date, time, sit, brand, color, tel ,license)
      {
         let body       : string = "key=update&start=" + startt + "&end=" + end + "&date=" +
                                   date + "&time=" + time + "&sit=" + sit + "&license=" + license +
                                   "&brand=" + brand + "&color=" + color + "&tel=" +
                                   tel  + "&recordID=" + this.recordID,
             type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
             headers    : any     = new Headers({ 'Content-Type': type}),
             options    : any     = new RequestOptions({ headers: headers }),
             url        : any     = this.baseURI + "manage-data.php";
    
         this.http.post(url, body, options)
         .subscribe(data =>
         {
            // If the request was successful notify the user
            if(data.status === 200)
            {
               this.hideForm  =  true;
               this.sendNotification(`Congratulations the technology: ${name} was successfully updated`);
            }
            // Otherwise let 'em know anyway
            else
            {
               this.sendNotification('Something went wrong!');
            }
         });
      }
    
    
    
      // Remove an existing record that has been selected in the page's HTML form
      // Use angular's http post method to submit the record data 
      // to our remote PHP script (note the body variable we have created which 
      // supplies a variable of key with a value of delete followed by the key/value pairs
      // for the record ID we want to remove from the remote database
      deleteEntry()
      {
         let name       : string = this.form.controls["startt"].value,
             body       : string    = "key=delete&recordID=" + this.recordID,
             type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
             headers    : any    = new Headers({ 'Content-Type': type}),
             options    : any    = new RequestOptions({ headers: headers }),
             url        : any    = this.baseURI + "manage-data.php";
    
         this.http.post(url, body, options)
         .subscribe(data =>
         {
            // If the request was successful notify the user
            if(data.status === 200)
            {
               this.hideForm     = true;
               this.sendNotification(`Congratulations the technology: ${name} was successfully deleted`);
            }
            // Otherwise let 'em know anyway
            else
            {
               this.sendNotification('Something went wrong!');
            }
         });
      }
    
    
    
      // Handle data submitted from the page's HTML form
      // Determine whether we are adding a new record or amending an
      // existing record
      saveEntry()
      {
         let startt          : string    = this.form.controls["startt"].value,
         end            : string    = this.form.controls["end"].value,
         date           : string    = this.form.controls["date"].value,
         time           : string    = this.form.controls["time"].value,
         sit            : string    = this.form.controls["sit"].value,
         brand          : string    = this.form.controls["brand"].value,
         color          : string    = this.form.controls["color"].value,
         license          : string    = this.form.controls["license"].value,
         tel            : string    = this.form.controls["tel"].value;
    
         if(this.isEdited)
         {
            this.updateEntry(startt, end, date, time, sit, brand, color, tel, license);
         }
         else
         {
            this.createEntry(startt, end, date, time, sit, brand, color, tel, license);
         }
      }
    
    
    
      // Clear values in the page's HTML form fields
      resetFields() : void
      {
        this.technologystartt   = "";
        this.technologyend  = ""; 
        this.technologydate = ""; 
        this.technologytime  = ""; 
        this.technologysit  = ""; 
        this.technologybrand  = ""; 
        this.technologycolor  = ""; 
        this.technologylicense  = "";
        this.technologytel  = ""; 
      }
    
    
    
      // Manage notifying the user of the outcome
      // of remote operations
      sendNotification(message)  : void
      {
         let notification = this.toastCtrl.create({
             message       : message,
             duration      : 3000
         });
         notification.present();
      }
    
  content(param){
    this.navCtrl.push("ContentPage",param);
  }

}
