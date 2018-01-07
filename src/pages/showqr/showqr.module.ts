import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowqrPage } from './showqr';

@NgModule({
  declarations: [
    ShowqrPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowqrPage),
  ],
  exports: [
    ShowqrPage
  ]
})
export class ShowqrModule {}
