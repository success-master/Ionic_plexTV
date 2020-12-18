import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeSeriePage } from './home-serie';

@NgModule({
  declarations: [
    HomeSeriePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeSeriePage),
  ],
})
export class HomeSeriePageModule {}
