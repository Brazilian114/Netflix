import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, AlertController, ToastController,App} from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Http,Headers, RequestOptions } from '@angular/http';
//import{ AngularFireDatabase} from 'angularfire2/database';
//import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map'; 
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  posts: any;
  public items : any = [];
  public userDetails : any;

  userPostData = {"user_id":"","token":"","username":"","tel":"","email":"",
  "license":"","province": ""};
  public resposeData : any;
  public form                   : FormGroup;
  public technologyemail         : any;
  public technologyusername             : any;
  public technologylicense            : any;
  public technologyprovince            : any;
  public technologytel             : any;

  
  // Flag to be used for checking whether we are adding/editing an entry
  public isEdited               : boolean = false;
  // Flag to hide the form upon successful completion of remote operation
  public hideForm               : boolean = false;
  // Property to help ste the page title
  public pageTitle              : string;
  // Property to store the recordID for when an existing entry is being edited
  public recordID               : any      = null;
  private baseURI               : string  = "http://localhost/DB123/";
   
 
    constructor( //public angularfire :AngularFireDatabase,
                 public alertCtrl   :AlertController,
                 public http        :Http,
                 public loadingCtrl :LoadingController,
                 public navCtrl     :NavController, 
                 public NP          :NavParams,
                 public loginCtrl   :LoginProvider,
                 public fb          :FormBuilder,
                 public toastCtrl   :ToastController,
                 public auth : LoginProvider)
                  {
  
                    const data = JSON.parse(localStorage.getItem('userData'));
                    this.userDetails = data.userData; 
                      this.form = fb.group({
                        "email"                  : ["", Validators.required],
                        "username"               : ["", Validators.required],
                        "license"                : ["", Validators.required],
                        "province"               : ["", Validators.required],
                        "tel"                    : ["", Validators.required]
                        
                      });
    }
  
    ionViewWillEnter()
    {
        this.initializeItems();
    
        this.http.get('http://localhost/DB123/retrieve-data.2.php').map(res => res.json()).subscribe(data => {
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
       this.http.get('http://localhost/DB123/retrieve-data.2.php')
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
      this.technologyemail        = item.email;
      this.technologyusername     = item.username;
      this.technologylicense      = item.license;
      this.technologyprovince     = item.province;
      this.technologytel          = item.tel;
     
      this.recordID               = item.id;
    }
  
  
  
    // Save a new record that has been added to the page's HTML form
    // Use angular's http post method to submit the record data 
    // to our remote PHP script (note the body variable we have created which 
    // supplies a variable of key with a value of create followed by the key/value pairs
    // for the record data
    createEntry(email, username, license, province, tel,)
    {
       let body     : string   = "key=create&email=" + email + "&username=" + username + "&province=" +
       province + "&tel=" + tel+ "&license=" + license ,
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
    updateEntry(email : string, username : string, license : string, province : string, tel : string) : void
    {
       let headers 	: any		= new http ({ 'Content-Type': 'application/json' }),
           options 	: any		= { "key" : "update", "email" : email, "username" : username, 
           "license" : license, "province" : province, "tel" : tel, "recordID" : this.recordID},
           url       : any      	= this.baseURI + "manage-data.php";
 
       this.http
       .post(url, JSON.stringify(options), headers)
       .subscribe(data =>
       {
          // If the request was successful notify the user
          this.hideForm  =  true;
          this.sendNotification(`Congratulations the technology: ${name} was successfully updated`);
       },
       (error : any) =>
       {
          this.sendNotification('Something went wrong!');
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
    /*deleteEntry()
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
  
  */
  
    // Handle data submitted from the page's HTML form
    // Determine whether we are adding a new record or amending an
    // existing record
    saveEntry()
    {
       let email          : string    = this.form.controls["email"].value,
           username       : string    = this.form.controls["username"].value,
           license        : string    = this.form.controls["license"].value,
           province       : string    = this.form.controls["province"].value,
           tel            : string    = this.form.controls["tel"].value
           
  
       if(this.isEdited)
       {
          this.updateEntry(email, username, license, province, tel);
       }
       else
       {
        this.createEntry(email, username, license, province, tel);
       }
    }
  
  
  
    // Clear values in the page's HTML form fields
    resetFields() : void
    {
     
      this.technologyemail        = "";
      this.technologyusername     = "";
      this.technologylicense      = "";
      this.technologyprovince     = "";
      this.technologytel          = "";

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
  profileUpdate() {
    if (this.userPostData.username,this.userPostData.email,this.userPostData.license,
      this.userPostData.province,this.userPostData.tel
      ) {
      //this.common.presentLoading();
      this.auth.postData(this.userPostData, "profileUpdate")
        .then((result) => {
          this.resposeData = result;
          if (this.resposeData.feedData) {
           // this.common.closeLoading();
            //this.dataSet.unshift(this.resposeData.feedData);
            this.userPostData.username = "";
            this.userPostData.license = "";
            this.userPostData.province = "";
            this.userPostData.email = "";
            this.userPostData.tel = "";
            
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
  }
  
  
 
 

