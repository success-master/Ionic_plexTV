import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarFilmesPage } from './buscar-filmes';

@NgModule({
  declarations: [
    BuscarFilmesPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarFilmesPage),
  ],
})
export class BuscarFilmesPageModule {}
