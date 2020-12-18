import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WebIntent } from '@ionic-native/web-intent';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Playerhtml5Page } from '../playerhtml5/playerhtml5';
import { DetalheFilmePage } from '../detalhe-filme/detalhe-filme';
import { TrailerPage } from '../trailer/trailer';
import swal from 'sweetalert';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-detalhebreve',
  templateUrl: 'detalhebreve.html',
})
export class DetalhebrevePage {
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



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private webIntent: WebIntent,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    public sanitizer: DomSanitizer,
    private navController: NavController,
    public iab: InAppBrowser,

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

voltar(){
  this.navController.pop();
}












onKey(event,nextElement) {

     if (event.key === "Enter") {

  }

    }



bvoltar(event) {

  if (event.key === "Enter") {
this.voltar();
}

 }













  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando detalhes..."
    });
    this.loader.present();
  }

FechaCarregando(){
  this.loader.dismiss();
}




carregarFeed(){
let id = this.navParams.get("id");
  this.AbreCarregando();
 this.ApiProvider.embreveDetalhe(id).subscribe(data=>{

    const response = (data as any);
    const objeto_retorno = JSON.parse(response._body);

      this.lista = objeto_retorno.DADOS;
      this.RELACIONADOS = objeto_retorno.RELACIONADOS;
      console.log(this.lista);
this.ID = this.lista.ID_FILM;
this.LINK = this.lista.LINK;
this.LINK2 = this.lista.LINK2;
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

//console.log(this.RELACIONADOS);


   this.FechaCarregando();

},error=>{
  console.log(error);
  this.FechaCarregando();
}

)
}

varTrailer(n){
  this.verificarstatus();
  this.navCtrl.push(TrailerPage, {id: n});
}
addFavoritos(){
  this.verificarstatus();
let id = this.navParams.get("id");



this.AbreCarregando();
this.ApiProvider.addLembrete(this.USER,id,"0").subscribe(data=>{

  const response = (data as any);
  const objeto_retorno = JSON.parse(response._body);

    this.lista = objeto_retorno.DADOS;

if(this.lista.STATUS = '1'){
  swal("Pronto!", "Filme adicionado aos lembretes com sucesso.", "success");
  this.buttonDisabled = true;
}
 this.FechaCarregando();

},error=>{
console.log(error);
this.FechaCarregando();
}

)



}



RFavoritos(){
  this.verificarstatus();
  let id = this.navParams.get("id");



  this.AbreCarregando();
  this.ApiProvider.RemoverLembrete(this.USER,id,"0").subscribe(data=>{

    const response = (data as any);
    const objeto_retorno = JSON.parse(response._body);

      this.lista = objeto_retorno.DADOS;

  if(this.lista.STATUS = '1'){
    swal("Pronto!", "Filme removido dos lembretes.", "success");
    this.buttonDisabled2 = true;
  }
   this.FechaCarregando();

  },error=>{
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
