import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../home/home';
import { Http,Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  waiting: string = "w";
 
  
  public form                   : FormGroup;

  
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
                  "username"                  : ["", Validators.required],
                  "email"                     : ["", Validators.required],
                  "tel"                       : ["", Validators.required],
                  "license"                   : ["", Validators.required],
                  "province"                  : ["", Validators.required],
                  "password"                  : ["", Validators.required],
                  "status"                    : ["", Validators.required],
                  
                  
                  
                  
                  
                  
               });
                
    }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
 /*
  register(){

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
*/
    
  home(){
    this.navCtrl.push(HomePage);
  }

 

  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form




  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data 
  // to our remote PHP script (note the body variable we have created which 
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(username, email ,tel ,license ,password, province,status)
  {
     let body     : string   = "key=create&username=" + username + "&email=" + email+ "&tel=" +
                                tel+ "&license=" + license + "&province=" + province + "&password=" + password + "&status=" + status ,
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
           this.sendNotification(`Congratulations the technology: ${username} was successfully added`);
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
 



  // Remove an existing record that has been selected in the page's HTML form
  // Use angular's http post method to submit the record data 
  // to our remote PHP script (note the body variable we have created which 
  // supplies a variable of key with a value of delete followed by the key/value pairs
  // for the record ID we want to remove from the remote database
  



  // Handle data submitted from the page's HTML form
  // Determine whether we are adding a new record or amending an
  // existing record
  saveEntry()
  {
     let username          : string = this.form.controls["username"].value,
         email             : string = this.form.controls["email"].value,
         tel               : string = this.form.controls["tel"].value,
         license           : string = this.form.controls["license"].value,
         province          : string = this.form.controls["province"].value,
         status          : string = this.form.controls["status"].value,
         password          : string = this.form.controls["password"].value;
         
         
         
         
     if(this.isEdited)
     {
      
     }
     else
     {
       this.createEntry(username, email ,tel ,license ,password,province,status);
     }
  }



  // Clear values in the page's HTML form fields



  // Manage notifying the user of the outcome
  // of remote operations
  sendNotification(message)  : void
  {
    let alert = this.alert.create({
      title: 'ยินดีต้อนรับ',
      subTitle: 'คุณได้ทำการลงทะเบียนเรียบร้อย',
      buttons: ['OK']
      
  });
  alert.present();
  
  }
}
