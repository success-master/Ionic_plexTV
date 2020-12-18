import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { BuscarSeriesPage } from '../buscar-series/buscar-series';
import { BuscarFilmesPage } from '../buscar-filmes/buscar-filmes';
import { CategoriaSeriePage } from '../categoria-serie/categoria-serie';
import { HomeSeriePage } from '../home-serie/home-serie';
import { CategoriaPage } from '../categoria/categoria';
import { FilmescatPage } from '../filmescat/filmescat';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

public pages: any;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { icon: "ios-film", title: 'Filmes Recentes', component: HomePage },
      { icon: "ios-film", title: 'Séries Recentes', component: HomeSeriePage },
      { icon: "ios-folder-open-outline", title: 'Categoria de Filmes', component: CategoriaPage },
      { icon: "md-folder-open", title: 'Categoria de Séries', component: CategoriaSeriePage },
      { icon: "ios-search", title: 'Pesquisar Filmes', component: BuscarFilmesPage },
      { icon: "md-search", title: 'Pesquisar Séries', component: BuscarSeriesPage },
    ];

  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }
}
