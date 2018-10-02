import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { ProfilePage } from '../profile/profile';
//import{ AngularFireDatabase} from 'angularfire2/database';
//import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { LoginProvider } from '../../providers/login/login';
import 'rxjs/add/operator/map'; 
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http,Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the RegisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regis',
  templateUrl: 'regis.html',
})
export class RegisPage {

  
  resposeData : any;
  userData = {"username":"","password":"","email":"","name":"","gender":"","birthday":"","tel":""};

  arrData= []
  Username
  Password
  



  public form                   : FormGroup;
  public technologyName         : any;
  public technologyemail        : any;
  public technologypassword         : any;
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

  constructor(public  navCtrl  : NavController,
              public  NP       : NavParams,
              //public  fdb      : AngularFireDatabase,              
              public  alert    : AlertController,
              public  http     : Http,
              public  fb       : FormBuilder,
              public toastCtrl  :ToastController,
              public  auth     :LoginProvider) {

                this.form = fb.group({
                  "name"                  : ["", Validators.required],
                  "email"                 : ["", Validators.required],
                  "password"                   : ["", Validators.required]
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
  

    signup(){

      this.auth.postData(this.userData, "signup").then((result) =>{
      this.resposeData = result;
      console.log(this.resposeData);
      if(this.resposeData.userData){
        
              const toast = this.toastCtrl.create({
            message: 'Your files were successfully saved',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
        
      localStorage.setItem('userData',JSON.stringify(this.resposeData))
      console.log("signup success");
    
    }else{
          

      let alert = this.alert.create({
        title: 'Warning',
        subTitle: 'Wrong Username or Password! Please Try Again !',
        buttons: ['OK']
    });
  
    alert.present();
    }







      }, (err) =>{
        
        

      });


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
       this.technologyName        = item.name;
       this.technologyemail       = item.email;
       this.technologypassword    = item.password;
       this.recordID              = item.id;
    }
  
  
  
    // Save a new record that has been added to the page's HTML form
    // Use angular's http post method to submit the record data 
    // to our remote PHP script (note the body variable we have created which 
    // supplies a variable of key with a value of create followed by the key/value pairs
    // for the record data
    createEntry(name, email,password)
    {
       let body     : string   = "key=create&name=" + name + "&email=" + email + "&password=" + password,
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
    updateEntry(name, email,password)
    {
       let body       : string = "key=update&name=" + name + "&email=" + email + "&password=" + password  + "&recordID=" + this.recordID,
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
       let name       : string = this.form.controls["name"].value,
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
       let name          : string = this.form.controls["name"].value,
           email   : string    = this.form.controls["email"].value,
           password   : string    = this.form.controls["password"].value;
  
       if(this.isEdited)
       {
          this.updateEntry(name, email,password);
       }
       else
       {
          this.createEntry(name, email,password);
       }
    }
  
  
  
    // Clear values in the page's HTML form fields
    resetFields() : void
    {
       this.technologyName   = "";
       this.technologyemail  = ""; 
       this.technologypassword  = ""; 
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
  
  home(){
    this.navCtrl.push(HomePage);
  }
  
  }
  
  