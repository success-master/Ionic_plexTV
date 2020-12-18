
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, PopoverController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuProvider } from '../../providers/menu/menu';
import { ApiProvider } from '../../providers/api/api';
import swal from 'sweetalert';


@IonicPage()
@Component({
  selector: 'page-conta-vencida',
  templateUrl: 'conta-vencida.html',
})
export class ContaVencidaPage {
  loader: any;
  public lista: any;
  public listaS: any;
  public listaEP: any;
  public listaFM: any;
  public listaSM: any;
  public listaWLT: any;
  public listaACAO: any;
  public VS: any;
  public VERSAO: any = "1";
  public LEMBRETE: any;
  public LEMBRETE2: any;

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


  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;
  public PULAR: any;
  public PRAZO: any;
  public TEMPO: any;
  public DATAFINAL: any;
  public TITULO: any;


  @ViewChild('searchInput') sInput;

  selecionar(){
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);

    console.log("Foi");
  }


  constructor(
    public navCtrl: NavController,
    public ApiProvider: ApiProvider,
    public MenuProvider: MenuProvider,
    public loadingCtrl: LoadingController,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController
  ) {
    this.verificarstatus();
  }
  onKeyMENU(event,nextElement) {

    if (event.key === "Enter") {
 this.openPage(nextElement);
 }

   }

   onKey(event) {

    if (event.key === "Enter") {
 this.enviar();
 }

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

   onKey3(event) {

    if (event.key === "Enter") {
 this.renovar();
 }

   }


renovar(){
  this.navCtrl.push('RenovarPage');
}




enviar(){



  this.AbreCarregando();
 this.ApiProvider.renovar(this.TITULO).subscribe(data=>{

    const response = (data as any);
    const objeto_retorno = JSON.parse(response._body);

      this.lista = objeto_retorno.DADOS;

      if(this.lista.STATUS == '1'){



        swal("Renovado com sucesso!", {
          buttons: {
            cancel: false,
            confirm: false,
          },
          timer: 3000,
          icon: "success",
        }).then((value) => {
          this.navCtrl.setRoot(HomePage);
        });
      }else{
        swal("Código inválido", "", "error").then((value) => {

        });
      }


   this.FechaCarregando();

},error=>{
  console.log(error);
  this.FechaCarregando();
}

)


}



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page);

    this.navCtrl.setRoot(page.component);
  }


  openPage2() {



    this.navCtrl.setRoot(HomePage);
  }


  verificarstatus(){
    let LGD = localStorage.getItem('LOGADO');
    let USR = localStorage.getItem('USUARIO');
    let DTBS: any;

    this.ApiProvider.verStatus(USR).subscribe(data=>{

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      DTBS = objeto_retorno.DADOS;

      this.PRAZO = DTBS.PRAZO;
      this.TEMPO = DTBS.TEMPO;
      this.DATAFINAL = DTBS.DATAFINAL;
console.log(this.PRAZO);

   if(DTBS.PRAZO == "0"){

     this.selecionar();

   }
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
}
