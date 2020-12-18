import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrailerPage } from './trailer';
import { AndroidExoplayer } from '@ionic-native/android-exoplayer';

@NgModule({
  declarations: [
    TrailerPage,
  ],
  imports: [
    IonicPageModule.forChild(TrailerPage),
  ],
  providers:[
    AndroidExoplayer
  ]
})
export class TrailerPageModule { }
