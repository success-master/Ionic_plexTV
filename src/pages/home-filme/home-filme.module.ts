import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeFilmePage } from './home-filme';

@NgModule({
  declarations: [
    HomeFilmePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeFilmePage),
  ],
})
export class HomeFilmePageModule {}
