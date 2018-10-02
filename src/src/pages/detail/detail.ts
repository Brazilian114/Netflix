import { Component , OnInit, NgZone ,ElementRef,ViewChild} from '@angular/core';
import { App,IonicPage, NavController, NavParams,AlertController  ,ModalController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import{ MainPage }  from '../main/main';
import{ MapPage }  from '../map/map';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http,Headers, RequestOptions } from '@angular/http';
import { LoginProvider } from '../../providers/login/login';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

 
  public userDetails : any;
  userPostData = {"user_id":"","token":"","startt":"",
  "brand":"","endd": "","dated": "","timed": "","sit": ""
  ,"color": "","tel": "","license": "", "feed_id": ""};
  public dataSet : any;
  public resposeData : any;

  public form                       : FormGroup;
  public technologystartt            : any;
  public technologyend              : any;
  public technologydate             : any;
  public technologytime             : any;
  public technologysit              : any;
  public technologybrand            : any;
  public technologycolor            : any;
  public technologylicense          : any;
  public technologytel              : any;
  
  // Flag to be used for checking whether we adding/editing an entry
  public isEdited               : boolean = false;
  // Flag to hide the form upon successful completion of remote operation
  public hideForm               : boolean = false;
  // Property to help ste the page title
  public pageTitle              : string;
  // Property to store the recordID for when an existing entry is being edited
  public recordID               : any      = null;
  private baseURI               : string  = "http://localhost/DB/";
   
  public items : any = [];

  


  constructor(private alert: AlertController,
    public app : App,public navCtrl: NavController,
     public NP: NavParams,public toastCtrl: ToastController,
     private ModalCtrl:ModalController,
     public  http     : Http,
     public  fb       : FormBuilder,
     public loginCtrl   :LoginProvider,
     private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone
    ) 
     {
       const data = JSON.parse(localStorage.getItem('userData'));
     this.userDetails = data.userData;
     this.userPostData.user_id = this.userDetails.user_id;
     this.userPostData.token = this.userDetails.token;
     
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
     map(){
       this.navCtrl.push(MapPage);
     }
     getFeed(){
      
            this.loginCtrl.postData(this.userPostData, "feed").then((result) =>{
            this.resposeData = result;
            if(this.resposeData.feedData){
            this.dataSet = this.resposeData.feedData;
            console.log(this.dataSet);
            }
            else{
              console.log("No Access");

            }

            }, (err) =>{
      
            });
      
      
          }


     feedUpdate() {
      if (this.userPostData.startt,this.userPostData.endd,this.userPostData.brand
        ,this.userPostData.dated,this.userPostData.timed,this.userPostData.sit
        ,this.userPostData.color,this.userPostData.tel,this.userPostData.license) {
        //this.common.presentLoading();
        this.loginCtrl.postData(this.userPostData, "feedUpdate")
          .then((result) => {
            this.resposeData = result;
            if (this.resposeData.feedData) {
             // this.common.closeLoading();
              //this.dataSet.unshift(this.resposeData.feedData);
              this.userPostData.startt = "";
              this.userPostData.endd = "";
              this.userPostData.dated = "";
              this.userPostData.timed = "";
              this.userPostData.sit = "";
              this.userPostData.brand = "";
              this.userPostData.color = "";
              this.userPostData.tel = "";
              this.userPostData.license = "";
              const toast = this.toastCtrl.create({
                message: 'Your files were successfully saved',
                showCloseButton: true,
                closeButtonText: 'Ok'
              });
              toast.present();
            } else {
              console.log("No access");
            }
  
          }, (err) => {
            //Connection failed message
          });
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
   8
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
        this.technologytel          = item.tel;
        this.technologylicense      = item.license;
        this.recordID               = item.id;
     }
   
   
   
     // Save a new record that has been added to the page's HTML form
     // Use angular's http post method to submit the record data 
     // to our remote PHP script (note the body variable we have created which 
     // supplies a variable of key with a value of create followed by the key/value pairs
     // for the record data
     createEntry(startt, end, date, time, sit, brand, color, tel ,license)
     {
        let body     : string   = "key=create&start=" + startt + "&end=" + end + "&date=" +
                                   date + "&time=" + time + "&sit=" + sit +
                                    "&brand=" + brand + "&color=" + color + "&license=" + license + "&tel=" + tel,
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
              this.sendNotification(`Congratulations the technology: ${startt} was successfully added`);
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
     updateEntry(startt, end, date, time, sit, brand, color, tel, license)
     {
        let body       : string = "key=update&start=" + startt + "&end=" + end + "&date=" +
                                  date + "&time=" + time + "&sit=" + sit +
                                   "&brand=" + brand + "&color=" + color + "&license=" + license + "&tel=" +
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
              this.sendNotification(`ลงข้อมูลการเดินทางเรียบร้อยแล้ว`);
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
        let startt         : string    = this.form.controls["startt"].value,
            end            : string    = this.form.controls["end"].value,
            date           : string    = this.form.controls["date"].value,
            time           : string    = this.form.controls["time"].value,
            sit            : string    = this.form.controls["sit"].value,
            brand          : string    = this.form.controls["brand"].value,
            color          : string    = this.form.controls["color"].value,
            license        : string   = this.form.controls["license"].value,
            tel            : string    = this.form.controls["tel"].value;
   
            if(this.isEdited)
            {
               this.updateEntry(startt, end, date, time, sit, brand, color, tel , license);
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
   
  



 /* add(){
    var data = {
        ต้นทาง:  this.start,
        ปลายทาง:this.end,
        วันที่:    this.date,
        เวลา:  this.time,
        ที่นั่ง:  this.sit,
        ยี่ห้อ:  this.brand,
        สีรถ:  this.color,
        เบอร์โทรติดต่อ:  this.tel
    }
    this.fdb.list("/test/").push(data);
    let alert = this.alert.create({
      title: 'ข้อความ',
      subTitle: 'สร้างเส้นทางเรียบร้อย',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(MainPage);
    let nav = this.app.getRootNav();
    nav.setRoot(MainPage);
  }

*/

}
