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


  
  resposeData : any;
  userData = {"username": "","password": "","tel": "","email": "", "license": "", "province": ""};
  
 
  public items : any = [];

  constructor(public  navCtrl  : NavController,
              public  NP       : NavParams,
              //public  fdb      : AngularFireDatabase,              
              public  alert    : AlertController,
              public  http     : Http,
              public  fb       : FormBuilder,
              public toastCtrl  :ToastController,
              public  auth     :LoginProvider) {

         
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



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form




  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data 
  // to our remote PHP script (note the body variable we have created which 
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  



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



  // Clear values in the page's HTML form fields



  // Manage notifying the user of the outcome
  // of remote operations

  
}
