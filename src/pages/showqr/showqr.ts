import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { LoginService } from '../../providers/loginservice';

@IonicPage()
@Component({
  selector: 'page-showqr',
  templateUrl: 'showqr.html',
})
export class ShowqrPage {
  uuid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: LoginService) {
  }

  ionViewDidLoad() {
    let env = this;
    setTimeout(function() {
      env.uuid = env.service.getUuid();
    }, 200);
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
