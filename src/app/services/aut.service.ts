import { Injectable } from '@angular/core';
import { user } from '../classes/User';
import {request} from "tns-core-modules/http";
import { HttpResponse } from '@angular/common/http';
import { FormGroupDirective } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AutService {

  user = new user();

bizURL= "http://auth.bizbox.mx/api/";
loginURL = "auth/login";
registerURL = "auth/register";
forgotURL = "auth/recover-password";


  constructor() 
  { 
  }
  Register(first_name: string, last_name: string, email: string, password: string, password_confirmation: string): Promise<string>
    {
        return new Promise<string>((resolve, reject) =>
        {
            request({
                url: this.bizURL + this.registerURL,
                headers: {"Content-Type": "application/json"},
                method: "POST",
                content: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    password,
                    password_confirmation
                })
            }).then((response) =>
            {
                const result = response.content.toJSON();

                console.log(result);
                if (result.msg)
                {
                    resolve(result.msg);
                }
                else
                {
                    reject(result.error);
                }
            }, (e) =>
            {
                reject(e);
            });
        });
    }

login(email:string, password:string): Promise<string>
{
    return new Promise<string>((resolve, reject)=>
    {
      request({
      url: this.bizURL + this.loginURL,
      headers: {"Content-Type": "application/json"},
      method: "POST",
      content: JSON.stringify({
        email,
        password,
      })
      }).then((response)=>
      {
        const result = response.content.toJSON();

        if(result.access_token){


          this.user.first_name = result.user.first_name;
          this.user.last_name = result.user.last_name;
          this.user.email = result.user.email;
          this.user.uuid = result.user.uuid;
          this.user.id = result.user.id;

          this.user.token = result.access_token;

          console.log(this.user);

          resolve(result.access_token);
        }
        else
        {
          reject(result.error);
        }

      }).catch((error)=>
      {
        reject(error);
      });
    });
  
  }
    forgot(email:string): Promise<string>
      {
          return new Promise<string>((resolve, reject)=>
          {
            request({
            url: this.bizURL + this.forgotURL,
            headers: {"Content-Type": "application/json"},
            method: "POST",
            content: JSON.stringify({
              email
            })
            }).then((response)=>
            {
              const result = response.content.toJSON();

              if(result.msg){
                resolve(result.msg);
              }
              else
              {
                reject(result.error);
              }

            }).catch((error)=>
            {
              reject(error);
            });
    });
    
  }
}
