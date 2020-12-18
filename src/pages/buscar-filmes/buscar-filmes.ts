import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../home/home';
import swal from 'sweetalert';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-buscar-filmes',
  templateUrl: 'buscar-filmes.html',
})
export class BuscarFilmesPage {
  loader: any;
  public lista: any;
  public lista2: any;
  public buscar: any;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;
  public STATUS: number;
  public BOTAO: number = 0;


  public menu2: any = [
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

  @ViewChild('searchInput') sInput;

  constructor(
    public navCtrl: NavController,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    ) {
     splashScreen.hide();
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

      this.navCtrl.setRoot(LoginPage);
     }

    },error=>{
      console.log(error);
    }

    )
    }

  onKeyMENU(event,nextElement) {

    if (event.key === "Enter") {
 this.openPage(nextElement);
 }

   }




  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

FechaCarregando(){
  this.loader.dismiss();
}


varFilme(n){
   this.navCtrl.push('DetalheFilmePage', {id: n});
}


doInfinite(infiniteScroll) {
  this.page++;
  this.infiniteScroll = infiniteScroll;
  this.carregarFeed(true,this.buscar);

}


atualizar(){
  this.navCtrl.setRoot('BuscarFilmesPage');
}
atualizar2(event,nextElement) {

  if (event.key === "Enter") {
this.atualizar();
}

 }

ir(){
  let n = false;
  this.carregarFeed(n,this.buscar);
}

moveFocus(nextElement) {

  nextElement.setFocus();
}


  carregarFeed(newpage: boolean = false, nome: any){

    this.AbreCarregando();
   this.ApiProvider.buscarFilmes(1, nome).subscribe(data=>{

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);




      if(newpage){
        this.lista =this.lista.concat(objeto_retorno.EMPRESAS);

       this.infiniteScroll.complete();
       this.BOTAO = 1;
      }else{
        this.lista = objeto_retorno.DADOS;
        this.BOTAO = 1;
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



  carregarFeed2(){


   this.ApiProvider.buscarFilmesb().subscribe(data=>{

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);


      this.lista2 = objeto_retorno.DADOS;



      this.FechaCarregando();


  },error=>{
    console.log(error);
    this.FechaCarregando();

  }

  )
  }

  onKey(event,nextElement) {

    if (event.key === "Enter") {
 this.varFilme(nextElement);
 }

   }

  onKey2(event) {
    if (event.key === "Enter") {

this.ir();

    }

  }




  ionViewDidEnter() {

setTimeout(() => {
  this.sInput.setFocus();
}, 500);


  }





  getItems(ev: any) {
    // Reset items back to all of the items


    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.lista = this.lista2.filter((item) => {
        return (item.TITULO.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.carregarFeed(false,this.buscar);
    }
  }




}
