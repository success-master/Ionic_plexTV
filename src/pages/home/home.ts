import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, MenuController, PopoverController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { SplashScreen } from '@ionic-native/splash-screen';
import swal from 'sweetalert';









@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('searchInput') sInput;
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
  public LETREIRO_STATUS: any;

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
  public BANNER: any;
  public LETREIRO: any;
  public TITULOS1: any;
  public TITULOS2: any;








  constructor(
    public navCtrl: NavController,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController
  ) {

    this.carregarFeed();
    //this.verificaVersao();
    this.verificarstatus();
    //localStorage.setItem("MENU", this.pages);
    //this.chamarlista();
  }
  focusInput(input) { }


  moveFocus(nextElement) {
    console.log(nextElement);

    nextElement.setFocus();
  }

  carregarFeed() {


    this.ApiProvider.inicio().subscribe(data => {

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      //localStorage.setItem("DADOS", objeto_retorno.DADOS);

      this.lista = objeto_retorno.DADOS;
      this.listaS = objeto_retorno.DADOS2;
      this.listaEP = objeto_retorno.DADOS3;
      this.listaFM = objeto_retorno.FDESTAQUES;
      this.listaSM = objeto_retorno.SDESTAQUES;
      this.listaWLT = objeto_retorno.DADOSWALT;
      this.listaACAO = objeto_retorno.DADOSACAO;
      this.BANNER = objeto_retorno.BANNER;
      this.LETREIRO_STATUS = objeto_retorno.LETREIRO.STATUS;

      this.TITULOS1 = this.listaWLT[0]['TITULO_SESSAO'];
      this.TITULOS2 = this.listaACAO[0]['TITULO_SESSAO'];

      this.LETREIRO = objeto_retorno.LETREIRO.TITULO;

      //console.log(objeto_retorno);




      //this.FechaCarregando();

    }, error => {
      console.log(error);
      this.FechaCarregando();
    }

    )
  }






  onKey(event, nextElement) {

    console.log(event.key);
    if (event.key === "Enter" || event.key === "0") {
      this.varFilme(nextElement);
    }

  }





  //VERIFICAR SE ESTA COM PRAZO
  verificarstatus() {
    let LGD = localStorage.getItem('LOGADO');
    let USR = localStorage.getItem('USUARIO');
    let DTBS: any;

    this.ApiProvider.verStatus(USR).subscribe(data => {

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      DTBS = objeto_retorno.DADOS;

      this.PRAZO = DTBS.PRAZO;
      this.TEMPO = DTBS.TEMPO;

      if (DTBS.STATUS == "1") {

      } else {
        swal("Seu login foi desativado!", "Entre em contato com o administrador para saber o porque.", "error");

        this.navCtrl.setRoot('LoginPage');
      }

    }, error => {
      console.log(error);
    }

    )
  }



  //VERIFICAR SE ESTA ATUALIZADO
  verificaVersao() {

    this.ApiProvider.verificaV(this.VERSAO).subscribe(data => {

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      this.VS = objeto_retorno.DADOS.VERSAO;
      this.LEMBRETE = objeto_retorno.LEMBRETE;
      this.LEMBRETE2 = objeto_retorno.LEMBRETE2;

      localStorage.setItem("PREMIUM", objeto_retorno.DADOS.PREMIUM);

      //console.log(this.LEMBRETE2);


      if (this.LEMBRETE.STATUS === "1") {

        swal(this.LEMBRETE.TITULO + " Esta disponível!", "Você pode encontrar em últimos filmes, em categorias ou no menu Pesquisar.", "success", { timer: 3000, buttons: [false] })
          .then((value) => {
            this.updateLembrete(this.LEMBRETE.ID, this.LEMBRETE.MODO);

          });








      }



      if (this.LEMBRETE2.STATUS === "1") {

        swal(this.LEMBRETE2.TITULO + " Esta disponível!", "Você pode encontrar em últimas séries, em categorias ou no menu Pesquisar.", "success", { timer: 3000, buttons: [false] })
          .then((value) => {
            this.updateLembrete(this.LEMBRETE2.ID, this.LEMBRETE2.MODO);

          });
      }


      if (this.VS > this.VERSAO) {
        swal("Nova atualização disponivel!", "Procure o servidor do aplicativo para realizar a atualização.", "success");
      }


    }, error => {
      console.log(error);

    }

    )




  }








  updateLembrete(filme, modo) {



    this.ApiProvider.upLembrete(filme, modo).subscribe(data => {

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);



      console.log(objeto_retorno);


      this.navCtrl.setRoot(HomePage);
    }, error => {
      console.log(error);

    }


    )

  }






  onKeyBANNER(event, nextElement, T) {

    if (event.key === "Enter") {
      this.verbanner(nextElement, T);
    }

  }

  onKeySerie(event, nextElement) {

    if (event.key === "Enter") {
      this.varSerie(nextElement);
    }

  }


  onKeyMENU(event, nextElement) {

    if (event.key === "Enter") {
      //this.AbreCarregando();
      this.openPage(nextElement);
    }

  }

  onKeyPesquisar(event) {

    if (event.key === "Enter") {

      this.pesquisarPage();
    }

  }

  pesquisarPage() {
    this.navCtrl.setRoot('PesquisarPage');
  }

  onKeyEp(event, l, t, text, lk, e, s) {

    if (event.key === "Enter") {
      this.abrirEp(l, t, text, lk, e, s);

    }

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

  inicio() {
    this.navCtrl.setRoot(HomePage);
  }
  inicio2() {
    this.navCtrl.setRoot('HomeSeriePage');
  }

  filmes() {
    this.navCtrl.setRoot('FilmescatPage');
  }

  serie() {
    this.navCtrl.setRoot('CategoriaSeriePage');
  }

  pesquisars() {
    this.navCtrl.setRoot('BuscarSeriesPage');
  }

  pesquisarf() {
    this.navCtrl.setRoot('BuscarFilmesPage');
  }

  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando tela inicial..."
    });
    this.loader.present();
  }


  AbreCarregando2() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando tela inicial..."
    });
    this.loader.present();
  }

  FechaCarregando() {
    this.loader.dismiss();
  }


  verbanner(ID, T) {
    if (T == '0') {
      this.navCtrl.push('DetalheFilmePage', { id: ID });
    } else {
      this.navCtrl.push('VerSeriePage', { id: ID });
    }

  }

  varFilme(n) {
    this.navCtrl.push('DetalheFilmePage', { id: n });
  }

  varSerie(n) {
    this.navCtrl.push('VerSeriePage', { id: n });
  }

  abrirEp(l, t, text, lk, e, s) {
    this.navCtrl.push('VerepPage', { id: l, titulo: t, texto: text, link: lk, ep: e, serie: s });
  }









  chamarlista(newpage: boolean = false) {


    this.AbreCarregando();
    this.ApiProvider.TodosFilmes(this.page).subscribe(data => {

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);




      if (newpage) {
        this.lista = this.lista.concat(objeto_retorno.DADOS);
        console.log(this.lista);
        this.infiniteScroll.complete();
      } else {
        this.lista = objeto_retorno.DADOS;


      }



      this.FechaCarregando();
      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;


      }


    }, error => {
      console.log(error);
      this.FechaCarregando();
      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }
    }

    )


  }








  ionViewDidEnter() {
    //this.AbreCarregando();

    this.menuCtrl.enable(true, 'myMenu');


    //document.getElementById("menu").click();


    this.splashScreen.hide();

    setTimeout(() => {
      //this.sInput.setFocus();
    }, 500);
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
