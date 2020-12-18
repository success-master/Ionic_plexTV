import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContaVencidaPage } from './conta-vencida';

@NgModule({
  declarations: [
    ContaVencidaPage,
  ],
  imports: [
    IonicPageModule.forChild(ContaVencidaPage),
  ],
})
export class ContaVencidaPageModule {}
