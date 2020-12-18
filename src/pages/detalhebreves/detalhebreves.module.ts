import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhebrevesPage } from './detalhebreves';

@NgModule({
  declarations: [
    DetalhebrevesPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhebrevesPage),
  ],
})
export class DetalhebrevesPageModule {}
