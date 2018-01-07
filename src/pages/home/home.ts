import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ShowqrPage } from '../showqr/showqr';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goQR() {
    this.navCtrl.setRoot(ShowqrPage);
  }
}
