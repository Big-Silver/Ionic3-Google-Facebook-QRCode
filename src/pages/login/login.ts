import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, LoadingController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { LoginService } from '../../providers/loginservice';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  FB_APP_ID: number = 1111111111111;
  email: string = "";
  password: string = "";
  headers = new Headers();
  credentials: any = {};
  valid: any = {};
  touched: boolean = false;
 
  constructor(public nav: NavController, public http: Http, public loginService: LoginService, private facebook: Facebook, private google: GooglePlus, private loadingCtrl: LoadingController) {
    this.headers.append('Content-Type', 'application/json');
    this.facebook.browserInit(this.FB_APP_ID, "v2.10");
  }
 
  login(){
    if(this.email.indexOf("@") > 0) {
      this.credentials = {
        email: this.email,
        password: this.password
      };
    } else {
      this.credentials = {
        phone: this.email,
        password: this.password
      };
    }

    this.http.post('http://35.189.187.130/max/server.php/api/v1/auth/login', JSON.stringify(this.credentials), {headers: this.headers})
      .subscribe(res => {
        this.loginService.setUuid(res.json().uuid);
        this.loginService.setLoginState(true);
        this.nav.setRoot(HomePage);
      }, (err) => {
        this.touched = true;
        this.valid = err.json();
    });
  }
 
  launchSignup(){
    this.nav.push(SignupPage);
  }

  fbLogin() {
    let permissions = new Array();
    let env = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.facebook.logout();
    loading.present();

    permissions = ["public_profile"];
    this.facebook.login(permissions)
    .then(function(response) {
      env.http.get("https://graph.facebook.com/me?fields=name,email&access_token="+response.authResponse.accessToken)
        .subscribe(function(res) {
          if(res.json().email) {
            env.credentials = {
              google: "default",
              name: res.json().name,
              email: res.json().email,
              facebook: res.json().id
            };
          } else {
            env.credentials = {
              google: "default",
              name: res.json().name,
              facebook: res.json().id
            };
          }

          env.http.post('http://35.189.187.130/max/server.php/api/v1/auth/register', JSON.stringify(env.credentials), {headers: env.headers})
          .subscribe(res => {
            env.loginService.setUuid(res.json().uuid);
            env.loginService.setLoginState(true);
            env.nav.setRoot(HomePage);
            
            loading.dismiss();
          }, (err) => {
            env.http.get('http://35.189.187.130/max/server.php/api/v1/auth/getuuid?fbid='+res.json().id)
            .subscribe(res => {
              console.log(env.headers);
              env.loginService.setLoginState(true);
              env.loginService.setUuid(res.json().uuid);
              env.nav.setRoot(HomePage);
              
              loading.dismiss();
            }, (err) => {
              loading.dismiss();
            });
          });
        });
      
    }, function(error) {
      loading.dismiss();      
    });
  }

  goLogin() {
    let env = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.google.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '452471919547-q6lqn12s34ig6j77io04fd1il6r4qqja.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then(function (user) {
      
      env.credentials = {
        google: user.email,
        name: user.displayName,
        email: user.email,
        facebook: "default"
      };

      env.http.post('http://35.189.187.130/max/server.php/api/v1/auth/register', JSON.stringify(env.credentials), {headers: env.headers})
      .subscribe(res => {
        env.loginService.setUuid(res.json().uuid);
        env.loginService.setLoginState(true);
        env.nav.setRoot(HomePage);
        
        loading.dismiss();
      }, (err) => {
        env.http.get('http://35.189.187.130/max/server.php/api/v1/auth/getuuid?email='+user.email)
        .subscribe(res => {
          env.loginService.setLoginState(true);
          env.loginService.setUuid(res.json().uuid);
          env.nav.setRoot(HomePage);
          
          loading.dismiss();
        }, (err) => {
          loading.dismiss();
        });
      });
    }, function (error) {
      loading.dismiss();
    });
  }
 
}