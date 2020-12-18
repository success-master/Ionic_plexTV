import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuProvider } from '../../providers/menu/menu';
import { ApiProvider } from '../../providers/api/api';
import swal from 'sweetalert';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-opcao',
  templateUrl: 'opcao.html',
})
export class OpcaoPage {
  loader: any;
  public lista: any;
  public listaS: any;
  public listaEP: any;
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
  public PLAY: any = localStorage.getItem('PLAY');
  public PLAYER: any;




   onKeyMENU(event,nextElement) {

    if (event.key === "Enter") {
 this.openPage(nextElement);
 }

   }


   openDeveloper(id) {
    window.open('market://developer?id='+id, '_system', 'location=yes');
    }


  constructor(
    public navCtrl: NavController,
    public ApiProvider: ApiProvider,
    public MenuProvider: MenuProvider,
    public loadingCtrl: LoadingController,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController
    ) {

     splashScreen.hide();

     this.config(this.PLAY);

     this.verificarstatus();

    }

    presentToast() {
      const toast = this.toastCtrl.create({
        message: 'Player alterado com sucesso!',
        duration: 3000
      });
      toast.present();
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page);

    this.navCtrl.setRoot(page.component);
  }




  onKey(event,nextElement) {
    console.log(event.key);
       if (event.key === "Enter") {
this.SavePlay(nextElement);
    }

      }


SavePlay(n){
  localStorage.setItem("PLAY", n);
  this.config(n);
 // swal("Pronto!", "Player padrão alterado com sucesso!", "success");
 this.presentToast();
}




config(n){
if(n === "1"){
this.PLAYER = "MX PLAYER";
}else if(n === "2"){
  this.PLAYER = "VLC PLAYER";
}else if(n === "3"){
  this.PLAYER = "PLAYER NATIVO";
}else if(n === "4"){
  this.PLAYER = "PLAYER HTML5";
}
}






}
