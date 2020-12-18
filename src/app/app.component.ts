
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Alert } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api/api';
import swal from 'sweetalert';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private IF_ETAPA = localStorage.getItem('ETAPA') ? localStorage.getItem('ETAPA').length : null;
  private ETAPA: any;
  public LOGADO: any;
  public USER: any;
  public DATA: any;
  public DATA2: any;
  rootPage: any;




  etapaPage() {
    if (this.IF_ETAPA == null) {
      this.rootPage = 'LoginPage';
    } else {
      this.ETAPA = localStorage.getItem('ETAPA');

      if (this.ETAPA == '1') {
        this.rootPage = HomePage;
      } else if (this.ETAPA == '0') {
        this.rootPage = 'PagamentoPage';
      }
    }
  }




  etapa() {
    if (this.IF_ETAPA == null) {
      this.etapaPage();
    } else {
      this.LOGADO = localStorage.getItem('LOGADO');
      this.USER = localStorage.getItem('USUARIO');


      this.ApiProvider.verificar(this.LOGADO, this.USER).subscribe(data => {

        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        this.DATA = objeto_retorno.DADOS;

        if (this.DATA.LOGADO == this.LOGADO) {
          localStorage.setItem("PIN", this.DATA.PIN);
          this.etapaPage();
        } else if (this.DATA.LOGADO2 == this.LOGADO) {
          localStorage.setItem("PIN", this.DATA.PIN);
          this.etapaPage();
        } else if (this.DATA.LOGADO3 == this.LOGADO) {
          localStorage.setItem("PIN", this.DATA.PIN);
          this.etapaPage();
        } else {
          swal("Seu usuario logou em outro dispositivo!", "Só é possivel acessar por um dispositivo. Por favor realize o login para deslogar do outro.", "error");
          localStorage.removeItem("ETAPA");
          this.rootPage = 'LoginPage';
        }



      }, error => {
        console.log(error);
      }

      )



    }

  }



  verificarStatus() {
    if (this.IF_ETAPA == null) {
      this.etapaPage();
    } else {
      this.LOGADO = localStorage.getItem('LOGADO');
      this.USER = localStorage.getItem('USUARIO');


      this.ApiProvider.verStatus(this.USER).subscribe(data => {

        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        this.DATA2 = objeto_retorno.DADOS;

        //console.log(this.DATA2);



        if (this.DATA2.STATUS == "1") {
          this.etapa();
        } else {

          swal("Seu login foi desativado!", "Entre em contato com o administrador para saber o porque.", "error");

          this.rootPage = LoginPage;
        }



      }, error => {
        console.log(error);
      }

      )



    }

  }




  public CATEGORIA: any;
  pages: Array<{ icon: string, title: string, component: any }>;

  constructor(
    public ApiProvider: ApiProvider,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,

  ) {
    this.verificarStatus();
    this.initializeApp();
    this.teste();
    //this.carregarFeed2();
    // used for an example of ngFor and navigation
    this.pages = [
      { icon: "ios-home", title: 'Início', component: HomePage },
    ];

  }


  teste() {
    // console.log(Math.floor(Math.random() * 156747891789));

  }

  carregarFeed2() {


    this.ApiProvider.categorias().subscribe(data => {

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      this.CATEGORIA = objeto_retorno.DADOS;





    }, error => {
      console.log(error);
    }

    )
  }







  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openPage2(id, nome) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot('FilmescatPage', { id: id, nome: nome });
  }
}
