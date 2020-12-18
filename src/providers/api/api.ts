import { Http } from '@angular/http';
import { Injectable } from '@angular/core';



@Injectable()
export class ApiProvider {


  private baseApi = "http://api.tplay.live/";
  public USUARIOID: any = localStorage.getItem('USUARIO');
  public LOGADO1: any;
  public DATABASE: any;


  constructor(public http: Http) { }






  inicio() {
    return this.http.get(this.baseApi + "inicio.php?type=inicio");
  }

  TodosFilmes(page = 31, pages = 30) {
    return this.http.get(this.baseApi + "teste.php?type=filme&page=" + page);
  }

  TodosSeries(page = 31, pages = 30) {
    return this.http.get(this.baseApi + "teste-serie.php?type=series&page=" + page);
  }

  LancamentosFilmes(page = 31, pages = 30) {
    return this.http.get(this.baseApi + "lancamentos.php?type=filmes&page=" + page);
  }

  LancamentosSeries(page = 31, pages = 30) {
    return this.http.get(this.baseApi + "lancamentos.php?type=series&page=" + page);
  }


  favoritos(ID) {
    return this.http.get(this.baseApi + "favoritos.php?type=lista&user=" + ID);
  }

  embreve(ID) {
    return this.http.get(this.baseApi + "embreve.php?type=lista");
  }

  embreveDetalhe(ID) {
    return this.http.get(this.baseApi + "embreve.php?type=detalhe&id=" + ID + "&user=" + this.USUARIOID);
  }



  embreveDetalheSerie(ID) {
    return this.http.get(this.baseApi + "embreve.php?type=detalhebreve&id=" + ID + "&user=" + this.USUARIOID);
  }

  upLembrete(filme, modo) {
    return this.http.get(this.baseApi + "embreve.php?type=upLembrete&user=" + this.USUARIOID + "&filme=" + filme + "&modo=" + modo);
  }


  addLembrete(usuario, filme, modo) {
    return this.http.get(this.baseApi + "embreve.php?type=addLembrete&user=" + usuario + "&filme=" + filme + "&modo=" + modo);
  }

  RemoverLembrete(usuario, filme, modo) {
    return this.http.get(this.baseApi + "embreve.php?type=delete&user=" + usuario + "&filme=" + filme + "&modo=" + modo);
  }



  addFavorito(usuario, filme, modo) {
    return this.http.get(this.baseApi + "favoritos.php?type=add&user=" + usuario + "&filme=" + filme + "&modo=" + modo);
  }

  RemoverFavorito(usuario, filme, modo) {
    return this.http.get(this.baseApi + "favoritos.php?type=delete&user=" + usuario + "&filme=" + filme + "&modo=" + modo);
  }


  UltimosFilmes() {
    return this.http.get(this.baseApi + "teste.php?type=filme");
  }

  CatFilmes(id, page = 31) {
    return this.http.get(this.baseApi + "teste.php?type=filmecat&id=" + id + "&page=" + page);
  }

  Categorias() {
    return this.http.get(this.baseApi + "teste.php?type=CatFilmes");
  }

  FilmeDetalhe(n) {
    return this.http.get(this.baseApi + "teste.php?type=detalhe&id=" + n + "&user=" + this.USUARIOID);
  }

  categorias() {
    return this.http.get(this.baseApi + "teste.php?type=categorias");
  }

  UltimosSeries() {
    return this.http.get(this.baseApi + "teste-serie.php?type=series");
  }

  SerieDetalhe(n) {
    return this.http.get(this.baseApi + "teste-serie.php?type=detalhe&id=" + n + "&user=" + this.USUARIOID);
  }

  SerieEp(n) {
    return this.http.get(this.baseApi + "teste-serie.php?type=ep&id=" + n);
  }

  CatSeries(id, page = 31) {
    return this.http.get(this.baseApi + "teste-serie.php?type=seriescat&id=" + id + "&page=" + page);
  }


  login(u, s, n) {
    return this.http.get(this.baseApi + "login.php?type=login&usuario=" + u + "&senha=" + s + "&numero=" + n);
  }


  cadastrar(u, s, n, email, nome) {
    return this.http.get(this.baseApi + "login.php?type=cadastrar&usuario=" + u + "&senha=" + s + "&numero=" + n + "&email=" + email + "&nome=" + nome);
  }

  verificar(n, u) {
    return this.http.get(this.baseApi + "login.php?type=verificar&usuario=" + u + "&numero=" + n);
  }

  verStatus(u) {
    return this.http.get(this.baseApi + "login.php?type=verStatus&usuario=" + u);
  }


  verificaV(v) {
    return this.http.get(this.baseApi + "versao.php?v=" + v + "&user=" + this.USUARIOID);
  }

  enviar(v) {
    return this.http.get(this.baseApi + "pedido.php?v=" + v + "&i=" + this.USUARIOID);
  }


  renovar(v) {
    return this.http.get(this.baseApi + "renovar.php?codigo=" + v + "&i=" + this.USUARIOID);
  }

  renovar2(v, u) {
    return this.http.get(this.baseApi + "renovar.php?codigo=" + v + "&i=" + u);
  }

  verPIN(v) {
    return this.http.get(this.baseApi + "pin.php?i=" + this.USUARIOID);
  }

  buscarFilmesb() {
    return this.http.get(this.baseApi + "buscar.php?type=bfilmes");
  }


  buscarFilmes(page = 1, nome) {
    return this.http.get(this.baseApi + "buscar.php?type=filmes&page=" + page + "&titulo=" + nome);
  }


  buscarSeriesb() {
    return this.http.get(this.baseApi + "buscar.php?type=bseries");
  }

  buscarSeries(page = 1, nome) {
    return this.http.get(this.baseApi + "buscar.php?type=series&page=" + page + "&titulo=" + nome);
  }


}
