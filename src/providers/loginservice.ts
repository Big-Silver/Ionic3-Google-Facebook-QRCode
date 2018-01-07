import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

import { Device } from '@ionic-native/device';

@Injectable()
export class LoginService {
  uuid: string;
  loginState: boolean = false;
  public subject: any = new BehaviorSubject('Log in');
  
  constructor(public http: Http, private device: Device, private googlePlus: GooglePlus, private facebook: Facebook) {
    
  }

  getUuid() {
    if(this.loginState == false)
      return this.device.uuid;
    else
      return this.uuid;
  }

  setUuid(uuid: string) {
    this.uuid = uuid;
  }

  setLoginState(state: boolean) {
    this.loginState = state;
    if(this.loginState) {
      this.subject.next('Log out');
    } else {
      this.subject.next('Log in');
    }
  }

  logout(){
    this.setLoginState(false);

    this.googlePlus.logout()
    .then(function (response) {
      console.log("Google logout success");
    },function (error) {
      console.log("Google logout failed");
    });

    this.facebook.logout()
    .then(function (response) {
      console.log("Facebook logout success");
    },function (error) {
      console.log("Facebook logout failed");
    });    
  }

}
