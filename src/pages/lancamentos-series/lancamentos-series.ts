import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';
import swal from 'sweetalert';

@IonicPage()
@Component({
  selector: 'page-lancamentos-series',
  templateUrl: 'lancamentos-series.html',
})
export class LancamentosSeriesPage {

  loader: any;
  public lista: any;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;


  public pages: any = [
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
    ) {
      this.chamarlista();
      this.verificarstatus();

    }

    verificarstatus(){
      let LGD = localStorage.getItem('LOGADO');
      let USR = localStorage.getItem('USUARIO');
      let DTBS: any;

      this.ApiProvider.verStatus(USR).subscribe(data=>{

        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        DTBS = objeto_retorno.DADOS;

     if(DTBS.STATUS == "1"){

     }else{
      swal("Seu login foi desativado!", "Entre em contato com o administrador para saber o porque.", "error");

      this.navCtrl.setRoot('LoginPage');
     }

    },error=>{
      console.log(error);
    }

    )
    }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
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




  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando séries..."
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

    this.AbreCarregando();
   this.ApiProvider.LancamentosFilmes().subscribe(data=>{

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

        this.lista = objeto_retorno.DADOS;
console.log(this.lista);



     this.FechaCarregando();

  },error=>{
    console.log(error);
    this.FechaCarregando();
  }

  )


  this.FechaCarregando();
  }


  chamarlista(newpage: boolean = false){


    this.AbreCarregando();
    this.ApiProvider.LancamentosSeries(this.page).subscribe(data=>{

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





  ionViewDidEnter() {
//this.carregarFeed();
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
}
