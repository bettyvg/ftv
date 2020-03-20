import { Component, OnInit } from '@angular/core';
import {capitalizationType,inputType, PromptOptions,login,prompt,confirm,action, LoginOptions, LoginResult, PromptResult} from "tns-core-modules/ui/dialogs";
import { AutService } from '../services/aut.service';
import { BarcodeScanner, preferFrontCameraProperty } from "nativescript-barcodescanner";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; 
import * as camera from "nativescript-camera";
import { isAndroid, isIOS } from 'tns-core-modules/platform';


@Component({
  selector: 'ns-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  scanner = new BarcodeScanner();

  imageSrc = "";

  scannerText = "";


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

getCamara()
{

  camera.requestCameraPermissions().then(()=>
    {
        const options: camera.CameraOptions = { width: 100, height: 100, cameraFacing: "rear", keepAspectRatio: true, saveToGallery: true };

        camera.takePicture(options).then((image)=>
        {
          console.log(image);
          if(isAndroid)
          {
            this.imageSrc = image.android;
          }
          else if(isIOS)
          {
            this.imageSrc = image.ios;
          }
        }).catch((error)=>
            {
              console.log(error);
            });
          }).catch((error)=>
    {
      console.log(error);
    });
}


getLocation(){
  geolocation.enableLocationRequest(true).then(()=>
    {
      const options = {desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000};
      geolocation.getCurrentLocation(options).then((response)=>
      {
          console.log(response);
      }).catch((error)=>
      {
        console.log(error);
      });
    }).catch((error)=>
      {
        console.log(error);
      });
  }


Scan()
{
    this.scanner.available().then(()=>
    {
      this.scanner.hasCameraPermission().then((result)=>
      {
        if(result)
        {
          this.scanner.scan({
            formats:"QR_CODE",
            cancelLabel: "cancelar",
            message: "Escanea un QR",
            preferFrontCamera: false,
            showFlipCameraButton: true,
            showTorchButton: true,
            torchOn: false,
          }).then((scanResult)=>
          {
            console.log(scanResult);
          }).catch((error)=>
          {
            console.log(error);
          });
        }
        else
        {
          this.scanner.requestCameraPermission().then(()=>
          {
            this.scanner.scan({
              formats:"QR_CODE",
              cancelLabel: "cancelar",
              message: "Escanea un QR",
              preferFrontCamera: false,
              showFlipCameraButton: true,
              showTorchButton: true,
              torchOn: false,
            }).then((scanResult)=>
            {
              console.log(scanResult);
            }).catch((error)=>
            {
              console.log(error);
            });
          }).catch((error)=>
          {
            console.log(error);
          });
        }
      }).catch((error)=>
      {
        console.log(error);
      });
    });
  }
}
