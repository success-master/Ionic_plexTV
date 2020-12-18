import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EmbrevePage } from '../embreve/embreve';
import { FavoritosPage } from '../favoritos/favoritos';
import { LancamentosPage } from '../lancamentos/lancamentos';
import { KidsPage } from '../kids/kids';
import { LegendadosPage } from '../legendados/legendados';
import { QuatrokPage } from '../quatrok/quatrok';
import { HomeFilmePage } from '../home-filme/home-filme';
import { HomeSeriePage } from '../home-serie/home-serie';
import { CategoriasPage } from '../categorias/categorias';
import { PesquisarPage } from '../pesquisar/pesquisar';
import { AdultoPage } from '../adulto/adulto';
import { PedirPage } from '../pedir/pedir';
import { QrcodePage } from '../qrcode/qrcode';
import { OpcaoPage } from '../opcao/opcao';
import { ContaVencidaPage } from '../conta-vencida/conta-vencida';
import { LoginPage } from '../login/login';
import { ApiProvider } from '../../providers/api/api';
import swal from 'sweetalert';



@IonicPage()
@Component({
  selector: 'page-renovar2',
  templateUrl: 'renovar2.html',
})
export class Renovar2Page {


  loader: any;
  public lista: any;
  public TITULO: any;
  public USER: any = this.navParams.get("user");

  public menu: any = [
    { icon: "ios-home", title: 'Início', component: HomePage },
    { icon: "ios-clock", title: 'Em Breve', component: EmbrevePage },
    { icon: "ios-heart", title: 'Favoritos', component: FavoritosPage },
    { icon: "ios-star", title: 'Lançamentos', component: LancamentosPage },
    { icon: "ios-football", title: 'Kids', component: KidsPage },
    { icon: "ios-closed-captioning", title: 'Legendados', component: LegendadosPage },
    { icon: "ios-easel-outline", title: '4k', component: QuatrokPage },
    { icon: "ios-film", title: 'Todos os Filmes', component: HomeFilmePage },
    { icon: "ios-desktop-outline", title: 'Todas as Séries', component: HomeSeriePage },
    { icon: "ios-folder-open", title: 'Categorias', component: CategoriasPage },
    { icon: "ios-search", title: 'Pesquisar', component: PesquisarPage },
    { icon: "ios-lock", title: 'XXX', component: AdultoPage },
    { icon: "ios-send", title: 'Pedir Filme e Séries', component: PedirPage },
    { icon: "ios-phone-portrait-outline", title: 'Instale no celular', component: QrcodePage },
    { icon: "ios-settings", title: 'Configurações', component: OpcaoPage },
    { icon: "ios-card", title: 'Assinatura', component: ContaVencidaPage },
    { icon: "ios-exit-outline", title: 'Sair', component: LoginPage },
  ];
  constructor(
    public navCtrl: NavController,
    public navController: NavController,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
  ) {
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


@ViewChild('searchInput') sInput;

ionViewDidEnter() {

  setTimeout(() => {
    this.sInput.setFocus();
  }, 500);


    }



enviar(){



  this.AbreCarregando();
 this.ApiProvider.renovar2(this.TITULO, this.USER).subscribe(data=>{

    const response = (data as any);
    const objeto_retorno = JSON.parse(response._body);

      this.lista = objeto_retorno.DADOS;

      if(this.lista.STATUS == '1'){
        swal("Renovado com sucesso!", "", "success").then((value) => {
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


}
