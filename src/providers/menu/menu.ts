import { LancamentosPage } from './../../pages/lancamentos/lancamentos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { FavoritosPage } from '../../pages/favoritos/favoritos';
import { HomeSeriePage } from '../../pages/home-serie/home-serie';
import { CategoriasPage } from '../../pages/categorias/categorias';
import { PesquisarPage } from '../../pages/pesquisar/pesquisar';


@Injectable()
export class MenuProvider {
  public pages: any;

  constructor() {

  }

}
