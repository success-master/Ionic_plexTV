import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegendadosFilmesPage } from './legendados-filmes';

@NgModule({
  declarations: [
    LegendadosFilmesPage,
  ],
  imports: [
    IonicPageModule.forChild(LegendadosFilmesPage),
  ],
})
export class LegendadosFilmesPageModule {}
