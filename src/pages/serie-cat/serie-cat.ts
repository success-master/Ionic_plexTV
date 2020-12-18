import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { MenuPage } from '../menu/menu';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-serie-cat',
  templateUrl: 'serie-cat.html',
})
export class SerieCatPage {
  loader: any;
  public lista: any;
  public NOME: any = this.navParams.get("nome");
  public pages: any;
  public STATUS: any;
  public pagess: any;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    private navController: NavController,
  ) {
    this.pages = [
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
  }



  onKey(event,nextElement) {

    if (event.key === "Enter") {
 this.varFilme(nextElement);
 }

   }

    onKeyMENU(event,nextElement) {

     if (event.key === "Enter") {
  this.openPage(nextElement);
  }

    }

    onKeyVERMAIS(event) {

      if (event.key === "Enter") {
        this.doInfinite(1)
   }

     }




  voltar(){
    this.navController.pop();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

  menu(){
    this.navCtrl.push(MenuPage);
  }

  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

FechaCarregando(){
  this.loader.dismiss();
}


varFilme(n){
   this.navCtrl.push('VerSeriePage', {id: n});
}



  carregarFeed(){
let id = this.navParams.get("id");


    this.AbreCarregando();
   this.ApiProvider.CatSeries(id).subscribe(data=>{

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

        this.lista = objeto_retorno.DADOS;


this.STATUS = this.lista[0].STATS;

     this.FechaCarregando();

  },error=>{
    console.log(error);
    this.FechaCarregando();
  }

  )
  }



  chamarlista(newpage: boolean = false){

    let id = this.navParams.get("id");
    this.AbreCarregando();
    this.ApiProvider.CatSeries(id,this.page).subscribe(data=>{

       const response = (data as any);
       const objeto_retorno = JSON.parse(response._body);


         if(newpage){
          this.lista = this.lista.concat(objeto_retorno.DADOS);

        // this.infiniteScroll.complete();
        }else{
          this.lista = objeto_retorno.DADOS;


        }




      this.FechaCarregando();
      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;


      }


   },error=>{
     console.log(error);
     this.FechaCarregando();
     if(this.isRefreshing){
      this.refresher.complete();
      this.isRefreshing = false;
    }
   }

   )


  }







  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.chamarlista();
  }


  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.chamarlista(true);

  }





  ionViewDidEnter() {
this.chamarlista();
  }


}
