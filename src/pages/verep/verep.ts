
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WebIntent } from '@ionic-native/web-intent';
import { ApiProvider } from '../../providers/api/api';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser';
import { Playerhtml5Page } from '../playerhtml5/playerhtml5';
import { LoginPage } from '../login/login';
import swal from 'sweetalert';



@IonicPage()
@Component({
  selector: 'page-verep',
  templateUrl: 'verep.html',
})
export class VerepPage {
  loader: any;
  public lista: any;
  public TITULO: any = this.navParams.get("titulo");
  public TEXTO: any = this.navParams.get("texto");
  public ID: any = this.navParams.get("id");
  public EP: any = this.navParams.get("ep");
  public LINK: any = this.navParams.get("link");
  public SERIE: any = this.navParams.get("serie");
  public PLAY: any = localStorage.getItem('PLAY');
  public PLAYER: any;
  private LOGADO: any = localStorage.getItem('LOGADO');
  public PRAZO: any;
  public TEMPO: any;


  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    private webIntent: WebIntent,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    private navController: NavController,
    public iab: InAppBrowser,
    private streamingMedia: StreamingMedia


  ) {
    this.verificarstatus();
  }

  bvoltar(event) {

    if (event.key === "Enter") {
 this.voltar();
 }

   }

   plai(event,nextElement,m) {

    if (event.key === "Enter") {
  this.play(nextElement,m);
  }

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
      console.log(objeto_retorno.DADOS);



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





//VERIFICAR QUAL PLAYER ESTA CONFIGURADO
play(id,m){


  if(this.TEMPO == "0"){
    swal("Poxa.. acabou os seus dias!", "Renove sua assinatura e continue a usar o Xplay.", "error");
  }else{
  let n = this.PLAY;

  if(n === "1"){
  //MX PLAYER
  this.abrirMXP(id,m);
  }else if(n === "2"){
  //VLC PLAYER
  this.abrirVLC(id,m);
  }else if(n === "3"){
  //PLAYER NATIVO
  this.abrirPlay(id,m);
  }else if(n === "4"){
  //PLAYER HTML5
  this.abrirPlayHtml5(id,m);
  }else if(n === "5"){
    //ABRIR TODOS
    this.abrirTODOS(id,m);
    }else if(n === "7"){
      //nvp
      this.abrirNVP(id,m);
      }
  }
  }

  abrirNVP(l,m){
    let u = "http://www.tplay.live/lista/";
    let url = u + l + "." + m + "." + this.LOGADO + ".mp4";


    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: url,
      type: 'application/com.rz.night.player'
    };

    this.webIntent.startActivity(options).then();
  }
  abrirPlayHtml5(url1,m){

    this.navCtrl.push('Playerhtml5Page', {id: url1, modo: "1", modo2: m});

   }

  voltar(){
    this.navController.pop();
  }


  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando episodios..."
    });
    this.loader.present();
  }

FechaCarregando(){
  this.loader.dismiss();
}






  ionViewDidLoad() {
    let id = this.navParams.get("id");
    //this.abrirFilme2(id);
  }





//ABRIR PLAYER

abrirTODOS(l,m){
  let u = "rtsp://www.tplay.live/lista-series/";
  let url1 = u + l + "." + m + "." + this.LOGADO + ".mp4";


  const options: InAppBrowserOptions = {
    zoom: 'no',
    location: 'yes'
  }
let url = url1;
 const browser = this.iab.create(url, '_system', options);
}



abrirMXP(l,m){
  let u = "http://www.tplay.live/lista-series/";
  let url = u + l + "." + m + "." + this.LOGADO + ".mp4";


  const options = {
    action: this.webIntent.ACTION_VIEW,
    url: url,
    type: 'application/com.mxtech.videoplayer.ad'
  };

  this.webIntent.startActivity(options).then();
}

abrirVLC(l,m){
  let u = "vlc://www.tplay.live/lista-series/";
  let url1 = u + l + "." + m + "." + this.LOGADO + ".mp4";


  const options: InAppBrowserOptions = {
    zoom: 'no',
    location: 'yes'
  }
let url = url1;
 const browser = this.iab.create(url, '_system', options);
}



abrirPlay(url1,m){
  // Playing a video.
  let u = "http://www.tplay.live/lista-series/";
  let url = u + url1 + ".mp4";

   let options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played') },
    errorCallback: (e) => { console.log('Error streaming') },
    orientation: 'landscape',
    shouldAutoClose: true,
    controls: true
  };

  this.streamingMedia.playVideo(url, options);


}






MXP(event,nextElement,m) {

  if (event.key === "Enter") {
this.abrirMXP(nextElement,m);
}

 }


 VLC(event,nextElement,m) {

  if (event.key === "Enter") {
this.abrirVLC(nextElement,m);
}

 }


 NATIVO(event,nextElement,m) {

  if (event.key === "Enter") {
this.abrirPlay(nextElement,m);
}

 }






}
