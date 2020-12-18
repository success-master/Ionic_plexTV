import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilmescatPage } from './filmescat';

@NgModule({
  declarations: [
    FilmescatPage,
  ],
  imports: [
    IonicPageModule.forChild(FilmescatPage),
  ],
})
export class FilmescatPageModule {}
