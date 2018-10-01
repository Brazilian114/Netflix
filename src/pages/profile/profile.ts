import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, AlertController, ToastController,App} from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Http,Headers, RequestOptions } from '@angular/http';
//import{ AngularFireDatabase} from 'angularfire2/database';
//import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map'; 
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public userDetails : any;
  posts: any;
  public form                   : FormGroup;
  public technologystartt           : any;
  public technologyendd              : any;
  public technologydated             : any;
  public technologytimed             : any;
  public technologysit              : any;
  public technologybrand            : any;
  public technologycolor            : any;
  public technologytel              : any;
  public technologyname             : any;
  public technologylicense            : any;
  
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
                 public app : App)
                  {
  
                    const data = JSON.parse(localStorage.getItem('userData'));
                    this.userDetails = data.userData; 
                      this.form = fb.group({
                        "startt"                  : ["", Validators.required],
                        "endd"                    : ["", Validators.required],
                        "dated"                   : ["", Validators.required],
                        "timed"                   : ["", Validators.required],
                        "sit"                    : ["", Validators.required],
                        "brand"                  : ["", Validators.required],
                        "color"                  : ["", Validators.required],
                        "tel"                    : ["", Validators.required],
                        "name"                    : ["", Validators.required],
                        "license"                    : ["", Validators.required]
                      });
    }
  
    ionViewWillEnter()
    {
        this.initializeItems();
    
        this.http.get('http://localhost/DB/retrieve-data.php').map(res => res.json()).subscribe(data => {
          this.posts = data;
         // console.log(this.posts);
    
      });
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
      this.technologystartt       = item.startt;
      this.technologyendd         = item.endd;
      this.technologydated         = item.dated;
      this.technologytimed         = item.timed;
      this.technologysit          = item.sit;
      this.technologybrand        = item.brand;
      this.technologycolor        = item.color;
      this.technologytel          = item.tel;
      this.technologyname          = item.name;
      this.technologylicense         = item.license;
      this.recordID               = item.id;
    }
  
  
  
    // Save a new record that has been added to the page's HTML form
    // Use angular's http post method to submit the record data 
    // to our remote PHP script (note the body variable we have created which 
    // supplies a variable of key with a value of create followed by the key/value pairs
    // for the record data
    createEntry(startt, endd, dated, timed, sit, brand, color, tel, license)
    {
       let body     : string   = "key=create&startt=" + startt + "&endd=" + endd + "&dated=" +
       dated + "&timed=" + timed + "&sit=" + sit +"&license=" + license +
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
    updateEntry(startt, endd, dated, timed, sit, brand, color, tel, license)
    {
       let body       : string = "key=updated&startt=" + startt + "&endd=" + endd + "&dated=" +
                                 dated + "&timed=" + timed + "&sit=" + sit + "&license=" + license +
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
             this.sendNotification(`คุณได้ทำการขอร่วมทางเรียบร้อยแล้ว`);
          }
          // Otherwise let 'em know anyway
          else
          {
             this.sendNotification('Something went wrong!');
          }
       });
    }
  
  
    initializeItems() {
      this.items =this.posts;
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
       endd            : string    = this.form.controls["endd"].value,
       dated           : string    = this.form.controls["dated"].value,
       timed           : string    = this.form.controls["timed"].value,
       sit            : string    = this.form.controls["sit"].value,
       brand          : string    = this.form.controls["brand"].value,
       color          : string    = this.form.controls["color"].value,
       tel            : string    = this.form.controls["tel"].value,
       license            : string    = this.form.controls["license"].value,
       name            : string    = this.form.controls["name"].value;
  
       if(this.isEdited)
       {
          this.updateEntry(startt, endd, dated, timed, sit, brand, color, tel, license);
       }
       else
       {
          this.createEntry(startt, endd, dated, timed, sit, brand, color, tel, license);
       }
    }
  
  
  
    // Clear values in the page's HTML form fields
    resetFields() : void
    {
      this.technologystartt  = "";
      this.technologyendd  = ""; 
      this.technologydated = ""; 
      this.technologytimed  = ""; 
      this.technologysit  = ""; 
      this.technologybrand  = ""; 
      this.technologycolor  = ""; 
      this.technologytel  = ""; 
      this.technologyname  = ""; 
      this.technologylicense = ""; 
      
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
  
 homePage(){
    this.navCtrl.push(HomePage);
            
           
  }
  
  }
  
  
 
 

