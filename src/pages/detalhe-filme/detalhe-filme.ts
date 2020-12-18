import { ContaVencidaPage } from './../conta-vencida/conta-vencida';
import { Playerhtml5Page } from './../playerhtml5/playerhtml5';
import { TrailerPage } from './../trailer/trailer';
import { AbrirVideoPage } from './../abrir-video/abrir-video';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Alert } from 'ionic-angular';
import { WebIntent } from '@ionic-native/web-intent';
import { ApiProvider } from '../../providers/api/api';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser';
import swal from 'sweetalert';
import { LoginPage } from '../login/login';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import videojs from 'video.js';

@IonicPage()
@Component({
  selector: 'page-detalhe-filme',
  templateUrl: 'detalhe-filme.html',
})
export class DetalheFilmePage {
  loader: any;
  public lista: any;
  public CAPA: any;
  public CAPA2: any;
  public TITULO: any;
  public LINK: any;
  public LINK2: any;
  public SINOPSE: any;
  public DIRETOR: any;
  public NOTA: any;
  public PAIS: any;
  public IDIOMA: any;
  public GENERO: any;
  public LANCAMENTO: any;
  public ID: any;
  public RETORNO: any;
  public FUNDO: any;
  public FAVORITO: any;
  public USER: any = localStorage.getItem('USUARIO');
  private LOGADO: any = localStorage.getItem('LOGADO');
  public buttonDisabled: any;
  public buttonDisabled2: any;
  public RELACIONADOS: any;
  public TRAILER: any;
  public PLAY: any = localStorage.getItem('PLAY');
  public PLAYER: any;
  public PRAZO: any;
  public TEMPO: any;
  public link: any;

  public URLTESTE: string = "https://1fichier.com/?mr5xrbl8yltjlqtes0m2"

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private webIntent: WebIntent,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    public sanitizer: DomSanitizer,
    private navController: NavController,
    public iab: InAppBrowser,
    private streamingMedia: StreamingMedia

  ) {

    this.verificarstatus();

  }

  initPlayer() {
    try {
      // setup the player via the unique element ID
      var element = document.getElementById('videoPlayer');
      if (element == null) {
        throw "error loading blah";
      }
      // if we get here, all good!
      videojs(element, {}, () => { });
    }
    catch (e) {
    }
  }


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
      console.log(objeto_retorno.DADOS);



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


  voltar() {
    this.navController.pop();
  }









  //VERIFICAR QUAL PLAYER ESTA CONFIGURADO
  play(id, m) {
    this.verificarstatus();


    if (this.TEMPO == "0") {
      //swal("Poxa.. acabou os seus dias!", "Renove sua assinatura e continue a usar o Xplay.", "error");
      this.navCtrl.setRoot('ContaVencidaPage');
    } else {
      let n = this.PLAY;

      if (n === "1") {
        //MX PLAYER
        this.abrirMXP(id, m);
      } else if (n === "2") {
        //VLC PLAYER
        this.abrirVLC(id, m);
      } else if (n === "3") {
        //PLAYER NATIVO
        this.abrirPlay(id, m);
      } else if (n === "4") {
        //PLAYER HTML5
        this.abrirPlayHtml5(id, m);
      } else if (n === "5") {
        //ABRIR TODOS
        this.abrirTODOS(id, m);
      } else if (n === "7") {
        //nvp
        this.abrirNVP(id, m);
      }
    }
  }

  plai(event, nextElement, m) {

    if (event.key === "Enter") {
      this.play(nextElement, m);
    }

  }


  //OPÇÕES DE PLAYER

  abrirNVP(l, m) {
    let u = "http://www.tplay.live/lista/";
    let url = u + l + "." + m + "." + this.LOGADO + ".mp4";


    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: url,
      type: 'application/com.rz.night.player'
    };

    this.webIntent.startActivity(options).then();
  }


  abrirMXP(l, m) {
    let u = "http://www.tplay.live/lista/";
    let url = u + l + "." + m + "." + this.LOGADO + ".mp4";


    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: url,
      type: 'application/com.mxtech.videoplayer.ad'
    };

    this.webIntent.startActivity(options).then();
  }

  abrirVLC(l, m) {
    let u = "vlc://www.tplay.live/lista/";
    let url1 = u + l + "." + m + "." + this.LOGADO + ".mp4";


    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes'
    }
    let url = url1;
    const browser = this.iab.create(url, '_system', options);
  }


  abrirTODOS(l, m) {
    let u = "rtsp://www.tplay.live/lista/";
    let url1 = u + l + "." + m + "." + this.LOGADO + ".mp4";


    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes'
    }
    let url = url1;
    const browser = this.iab.create(url, '_system', options);
  }


  abrirPlay(url1, m) {
    // Playing a video.
    let u = "http://www.tplay.live/lista/";
    let url = u + url1 + "." + m + "." + this.LOGADO + ".mp4";


    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: true
    };

    this.streamingMedia.playVideo(url, options);



  }

  abrirPlayHtml5(url1, m) {


    this.navCtrl.push('Playerhtml5Page', { id: url1, modo2: m });

  }















  //OUTRAS OPÇÕES
  varFilme(n) {
    this.navCtrl.push('DetalheFilmePage', { id: n });
  }

  varTrailer(n) {
    this.navCtrl.push('TrailerPage', { id: n });
  }

  onKey(event, nextElement) {

    if (event.key === "Enter") {
      this.varFilme(nextElement);
    }

  }

  onKeyTrailer(event, nextElement) {

    if (event.key === "Enter") {
      this.varTrailer(nextElement);
    }

  }


  bvoltar(event) {

    if (event.key === "Enter") {
      this.voltar();
    }

  }

  rmfavorito(event) {

    if (event.key === "Enter") {
      this.RFavoritos();
    }

  }

  Adfavorito(event) {

    if (event.key === "Enter") {
      this.addFavoritos();
    }

  }



  MXP(event, nextElement, m) {

    if (event.key === "Enter") {
      this.abrirMXP(nextElement, m);
    }

  }


  VLC(event, nextElement, m) {

    if (event.key === "Enter") {
      this.abrirVLC(nextElement, m);
    }

  }


  NATIVO(event, nextElement, m) {

    if (event.key === "Enter") {
      this.abrirPlay(nextElement, m);
    }

  }













  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando detalhes..."
    });
    this.loader.present();
  }

  FechaCarregando() {
    this.loader.dismiss();
  }




  carregarFeed() {
    let id = this.navParams.get("id");
    this.AbreCarregando();
    this.ApiProvider.FilmeDetalhe(id).subscribe(data => {

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      this.lista = objeto_retorno.DADOS;
      this.RELACIONADOS = objeto_retorno.RELACIONADOS;

      this.ID = this.lista.ID_FILM;
      this.LINK = this.lista.LINK;
      this.LINK2 = this.lista.LINK2;
      this.link = this.lista.LINK_NATIVO;
      this.CAPA = this.lista.CAPA;
      this.CAPA2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.lista.CAPA);
      this.TITULO = this.lista.TITULO;
      this.SINOPSE = this.lista.SINOPSE;
      this.NOTA = this.lista.RATING;
      this.PAIS = this.lista.PAIS;
      this.GENERO = this.lista.GENERO;
      this.IDIOMA = this.lista.IDIOMA;
      this.DIRETOR = this.lista.DIRETOR;
      this.LANCAMENTO = this.lista.LANCAMENTO;
      this.FUNDO = this.lista.FUNDO;
      this.FAVORITO = this.lista.FAVORITO;
      this.TRAILER = this.lista.TRAILER;

      console.log(this.LINK);


      this.FechaCarregando();

    }, error => {
      console.log(error);
      this.FechaCarregando();
    }

    )
  }


  addFavoritos() {

    let id = this.navParams.get("id");



    this.AbreCarregando();
    this.ApiProvider.addFavorito(this.USER, id, "0").subscribe(data => {

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      this.lista = objeto_retorno.DADOS;

      if (this.lista.STATUS = '1') {
        swal("Pronto!", "Filme adicionado aos favoritos com sucesso.", "success");
        this.buttonDisabled = true;
      }
      this.FechaCarregando();

    }, error => {
      console.log(error);
      this.FechaCarregando();
    }

    )



  }



  RFavoritos() {

    let id = this.navParams.get("id");



    this.AbreCarregando();
    this.ApiProvider.RemoverFavorito(this.USER, id, "0").subscribe(data => {

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      this.lista = objeto_retorno.DADOS;

      if (this.lista.STATUS = '1') {
        swal("Pronto!", "Filme removido dos favoritos.", "success");
        this.buttonDisabled2 = true;
      }
      this.FechaCarregando();

    }, error => {
      console.log(error);
      this.FechaCarregando();
    }

    )



  }











  //CARREGAR AO ABRIR PAGINA
  ionViewDidEnter() {
    this.carregarFeed();
  }

}
