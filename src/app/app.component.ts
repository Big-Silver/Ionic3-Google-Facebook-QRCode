import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ShowqrPage } from '../pages/showqr/showqr';
import { LoginPage } from '../pages/login/login';

import { LoginService } from '../providers/loginservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private loginService: LoginService) {
    this.initializeApp();

    loginService.subject.subscribe(label => {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Show QR', component: ShowqrPage },
        { title: label, component: LoginPage },
      ];
    })

    // used for an example of ngFor and navigation
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component.name == "LoginPage") {
      this.loginService.logout();
      if(page.title == "Log in") {
        this.nav.push(page.component);
      } else {
        this.nav.setRoot(HomePage);
      }
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
