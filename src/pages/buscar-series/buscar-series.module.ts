import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarSeriesPage } from './buscar-series';

@NgModule({
  declarations: [
    BuscarSeriesPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarSeriesPage),
  ],
})
export class BuscarSeriesPageModule {}
