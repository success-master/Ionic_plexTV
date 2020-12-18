import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaSeriePage } from './categoria-serie';

@NgModule({
  declarations: [
    CategoriaSeriePage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaSeriePage),
  ],
})
export class CategoriaSeriePageModule {}
