import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentosFilmesPage } from './lancamentos-filmes';

@NgModule({
  declarations: [
    LancamentosFilmesPage,
  ],
  imports: [
    IonicPageModule.forChild(LancamentosFilmesPage),
  ],
})
export class LancamentosFilmesPageModule {}
