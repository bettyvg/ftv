import { Component, OnInit } from '@angular/core';
import {capitalizationType,inputType, PromptOptions,login,prompt,confirm,action, LoginOptions, LoginResult, PromptResult} from "tns-core-modules/ui/dialogs";
import { AutService } from '../services/aut.service';

@Component({
  selector: 'ns-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private autService: AutService) { }

  ngOnInit() {
  }
  SimpleDialog()
  {
    alert("Hola");
  }

  Dialog(message: string)
  {
  const options = {
    title: "Race Selection",
    message: "You are a " + message,
    okButtonText: "Ok"
  };

  alert(options);

}

ActionDialog()
{
  const options = {
    title: "Race selection",
    message: "Choose your race",
    cancelButtonText: "Cancelar",
    actions: ["Human","Elf","Dwarf","Orc","Unicorn"]
  };

  action(options).then((result: string)=>
    {
          this.ConfirmDialog(result);
    }); 
  
}

ConfirmDialog(race: string)
{
  const options = {
    title: "Race selection",
    message: "Are you sure you want to be a " + race + "?",
    okButtonText: "Yes",
    cancelButtonText: "No",
  };

  confirm(options).then((result: boolean)=>
    {
        if(result)
        {
          this.Dialog(race);
        }
          
    }); 
  
}

LoginDialog()
{
  const options: LoginOptions = {
    title: "Login",
    message: "Introduce tu usuario y contraseña ",
    okButtonText: "Login",
    cancelButtonText: "Cancel",
    userNameHint: "Correo",
    passwordHint: "Contraseña"
  };

  login(options).then((result: LoginResult) =>
  {
    if(result.result)
    {
      this.autService.login(result.userName, result.password).then((response: string)=>
      {
        alert(response);
      }).catch((error)=>
      {
          alert(error);     
      });
    }
  });
}

PromptDialog()
{
  const options: PromptOptions = {
    title: "Recuperaciòn de contraseña",
    message: "Introduce tu correo para cambiar tu contraseña ",
    okButtonText: "Ok",
    cancelButtonText: "Cancel",
    cancelable: true,
    inputType: inputType.email,
    capitalizationType: capitalizationType.none
  };

  prompt(options).then((result: PromptResult)=>
  {
    if(result.result)
    {
      this.autService.forgot(result.text).then((response: string)=>
      {
        alert(response);
      }).catch((error)=>
      {
          alert(error);     
      });
    }
  });
}


}
