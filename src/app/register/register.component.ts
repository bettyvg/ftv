import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui";
import { AutService } from '../services/aut.service';
import { LoadingIndicator, Mode, OptionsCommon} from '@nstudio/nativescript-loading-indicator';
import { CFAlertDialog, DialogOptions, CFAlertGravity, CFAlertActionAlignment, CFAlertActionStyle, CFAlertStyle } from 'nativescript-cfalert-dialog';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  first_name = "";
  last_name = "";
  email = "";
  password = "";
  password_confirmation = "";

  loading = false;

  indicator = new LoadingIndicator();
  niceAlert = new CFAlertDialog();

  constructor(private page: Page, private autService: AutService) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  register(){
    this.showLoader();
    this.autService.Register(this.first_name, this.last_name, this.email, this.password, this.password_confirmation).then((Response)=>
    {
      this.hideLoader();

      alert(Response);
      /*
       const options: DialogOptions = {
        dialogStyle: CFAlertStyle.ALERT,
        title: "Register",
        message: Response,
        buttons: [{
            text: "Continuar", 
            buttonStyle: CFAlertActionStyle.POSITIVE,
            buttonAlignment: CFAlertActionAlignment.END,
            onClick: ()=>
            {

            }
        }]  
       };
       this.niceAlert.show(options).then(()=>
       {

       });*/
    }).catch((error)=>
    {
      this.hideLoader();

      alert(error);
      /*
      const options: DialogOptions = {
        dialogStyle: CFAlertStyle.ALERT,
        title: "Error",
        message: error,
        buttons: [{
            text: "Continuar", 
            buttonStyle: CFAlertActionStyle.NEGATIVE,
            buttonAlignment: CFAlertActionAlignment.END,
            onClick: ()=>
            {

            }
        }]  
       };
       this.niceAlert.show(options).then(()=>
       {

       });*/
    });

  }

  showLoader()
{
  this.loading = true;
  const options: OptionsCommon = {
    message: 'Loading...',
    details: 'Additional detail note!',
    margin: 10,
    dimBackground: true,
    color: '#4B9ED6', 
    backgroundColor: 'yellow',
    userInteractionEnabled: false, 
    hideBezel: true, 
    mode: Mode.Indeterminate,
    android: {
      cancelable: false
  
    },
    ios: {
     
      square: false
    }
  };
  this.indicator.show(options);
}

hideLoader()
{
  this.loading = false;
  this.indicator.hide();
}
  

}
