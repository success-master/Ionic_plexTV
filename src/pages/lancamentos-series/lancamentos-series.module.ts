import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentosSeriesPage } from './lancamentos-series';

@NgModule({
  declarations: [
    LancamentosSeriesPage,
  ],
  imports: [
    IonicPageModule.forChild(LancamentosSeriesPage),
  ],
})
export class LancamentosSeriesPageModule {}
