import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { LoginService } from '../../providers/loginservice';
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
  name: string;
  phone: number;
  email: string;
  password: string;
  confirmPassword: string;
  valid: any = {};

  constructor(public nav: NavController, public http: Http, public loginService: LoginService) {
 
  }
 
  register(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.password != this.confirmPassword) {
      this.confirmPassword = '';
      return;
    }

    let user = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password,
    };

    this.http.post('http://35.189.187.130/max/server.php/api/v1/auth/register', JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        this.loginService.setUuid(res.json().uuid);
        this.loginService.setLoginState(true);
        this.nav.setRoot(HomePage);
      }, (err) => {
        this.valid = err.json();
    }); 
  }
 
}