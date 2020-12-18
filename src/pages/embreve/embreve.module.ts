import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmbrevePage } from './embreve';

@NgModule({
  declarations: [
    EmbrevePage,
  ],
  imports: [
    IonicPageModule.forChild(EmbrevePage),
  ],
})
export class EmbrevePageModule {}
