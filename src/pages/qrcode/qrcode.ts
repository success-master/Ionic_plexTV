
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';
import swal from 'sweetalert';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  constructor(public ApiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
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



  onKey(event) {

    if (event.key === "Enter") {


 }

}



onKeyS(event) {

  if (event.key === "Enter") {


}

}




  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page);

    this.navCtrl.setRoot(page.component);
  }

  onKeyMENU(event,nextElement) {

    if (event.key === "Enter") {
 this.openPage(nextElement);
 }

   }



}
