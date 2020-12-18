import { DetalhebrevePage } from './../detalhebreve/detalhebreve';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FavoritosPage } from '../favoritos/favoritos';
import { LancamentosPage } from '../lancamentos/lancamentos';
import { KidsPage } from '../kids/kids';
import { LegendadosPage } from '../legendados/legendados';
import { HomeFilmePage } from '../home-filme/home-filme';
import { HomeSeriePage } from '../home-serie/home-serie';
import { CategoriasPage } from '../categorias/categorias';
import { PesquisarPage } from '../pesquisar/pesquisar';
import { AdultoPage } from '../adulto/adulto';
import { PedirPage } from '../pedir/pedir';
import { OpcaoPage } from '../opcao/opcao';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DetalheFilmePage } from '../detalhe-filme/detalhe-filme';
import { VerSeriePage } from '../ver-serie/ver-serie';
import { ApiProvider } from '../../providers/api/api';
import { DetalhebrevesPage } from '../detalhebreves/detalhebreves';
import { QuatrokPage } from '../quatrok/quatrok';
import { QrcodePage } from '../qrcode/qrcode';


@IonicPage()
@Component({
  selector: 'page-embreve',
  templateUrl: 'embreve.html',
})
export class EmbrevePage {

  loader: any;
  public lista: any;
  public listaS: any;
  public listaEP: any;
  public USER: any = localStorage.getItem('USUARIO');
  public STATUS: any;
  public STATUS2: any;




  public menu: any = [
    { icon: "ios-home", title: 'Início', component: HomePage },
    { icon: "ios-clock", title: 'Em Breve', component: 'EmbrevePage' },
    { icon: "ios-heart", title: 'Favoritos', component: 'FavoritosPage' },
    { icon: "ios-star", title: 'Lançamentos', component: 'LancamentosPage' },
    { icon: "ios-football", title: 'Kids', component: 'KidsPage' },
    { icon: "ios-closed-captioning", title: 'Legendados', component: 'LegendadosPage' },
    { icon: "ios-easel-outline", title: '4k', component: 'QuatrokPage' },
    { icon: "ios-film", title: 'Todos os Filmes', component: 'HomeFilmePage' },
    { icon: "ios-desktop-outline", title: 'Todas as Séries', component: 'HomeSeriePage' },
    { icon: "ios-folder-open", title: 'Categorias', component: 'CategoriasPage' },
    { icon: "ios-search", title: 'Pesquisar', component: 'PesquisarPage' },
    { icon: "ios-lock", title: 'XXX', component: 'AdultoPage' },
    { icon: "ios-send", title: 'Pedir Filme e Séries', component: 'PedirPage' },
    { icon: "ios-phone-portrait-outline", title: 'Instale no celular', component: 'QrcodePage' },
    { icon: "ios-settings", title: 'Configurações', component: 'OpcaoPage' },
    { icon: "ios-card", title: 'Assinatura', component: 'ContaVencidaPage' },
    { icon: "ios-exit-outline", title: 'Sair', component: 'LoginPage' },
  ];


  constructor(

    public navCtrl: NavController,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,


    ) {


  }

  onKey(event,nextElement) {

    if (event.key === "Enter") {
 this.varFilme(nextElement);
 }

   }

   onKeySerie(event,nextElement) {

     if (event.key === "Enter") {
  this.varSerie(nextElement);
  }

    }


    onKeyMENU(event,nextElement) {

     if (event.key === "Enter") {
  this.openPage(nextElement);
  }

    }










  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }

  varFilme(n){
    this.navCtrl.push('DetalhebrevePage', {id: n});
 }

 varSerie(n){
  this.navCtrl.push('DetalhebrevesPage', {id: n});
 }






  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando favoritos..."
    });
    this.loader.present();
  }


  AbreCarregando2() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando tela inicial..."
    });
    this.loader.present();
  }

FechaCarregando(){
  this.loader.dismiss();
}








  carregarFeed(){

    this.AbreCarregando();
   this.ApiProvider.embreve(this.USER).subscribe(data=>{

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

        this.lista = objeto_retorno.DADOS;
        this.listaS = objeto_retorno.DADOS2;

     this.STATUS = this.lista[0].STATUS;
     this.STATUS2 = this.listaS[0].STATUS;


     this.FechaCarregando();

  },error=>{
    console.log(error);
    this.FechaCarregando();
  }

  )
  }

  ionViewDidEnter() {
    this.carregarFeed();
    this.menuCtrl.enable(true, 'myMenu');
      }

}
