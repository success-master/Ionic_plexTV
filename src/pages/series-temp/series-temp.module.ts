import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriesTempPage } from './series-temp';

@NgModule({
  declarations: [
    SeriesTempPage,
  ],
  imports: [
    IonicPageModule.forChild(SeriesTempPage),
  ],
})
export class SeriesTempPageModule {}
