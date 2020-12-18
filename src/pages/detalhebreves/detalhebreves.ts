import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WebIntent } from '@ionic-native/web-intent';
import { DomSanitizer } from '@angular/platform-browser';
import { TrailerPage } from '../trailer/trailer';
import { SeriesTempPage } from '../series-temp/series-temp';
import swal from 'sweetalert';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-detalhebreves',
  templateUrl: 'detalhebreves.html',
})
export class DetalhebrevesPage {

  loader: any;
  public lista: any;
  public CAPA: any;
  public TITULO: any;
  public LINK: any;
  public SINOPSE: any;
  public DIRETOR: any;
  public NOTA: any;
  public PAIS: any;
  public IDIOMA: any;
  public GENERO: any;
  public LANCAMENTO: any;
  public listaTemp: any;
  public CAPA2: any;
  public FUNDO: any;
  public FAVORITO: any;
  public buttonDisabled: any;
  public buttonDisabled2: any;
  public USER: any = localStorage.getItem('USUARIO');
  public RELACIONADOS: any;
  public TRAILER: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private webIntent: WebIntent,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    private navController: NavController,
    public sanitizer: DomSanitizer,

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


  //ENTER COM CONTROLE
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

//ABRIR
   onKey(event,n,t) {

    if (event.key === "Enter") {
 this.varTemporada(n,t);
 }

   }



//funções
  addFavoritos(){
    this.verificarstatus();
    let id = this.navParams.get("id");



    this.AbreCarregando();
    this.ApiProvider.addLembrete(this.USER,id,"1").subscribe(data=>{

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

        this.lista = objeto_retorno.DADOS;

    if(this.lista.STATUS = '1'){
      swal("Pronto!", "Série adicionada aos lembretes com sucesso.", "success");
      this.buttonDisabled = true;
    }
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

    RFavoritos(){
      this.verificarstatus();
      let id = this.navParams.get("id");



      this.AbreCarregando();
      this.ApiProvider.RemoverLembrete(this.USER,id,"1").subscribe(data=>{

        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

          this.lista = objeto_retorno.DADOS;

      if(this.lista.STATUS = '1'){
        swal("Pronto!", "Série removida dos lembretes com sucesso.", "success");
        this.buttonDisabled2 = true;
      }
       this.FechaCarregando();

      },error=>{
      console.log(error);
      this.FechaCarregando();
      }

      )



      }









      onKeyTrailer(event,nextElement) {

        if (event.key === "Enter") {
     this.varTrailer(nextElement);
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



abrirFilme(l){
  let u = "http://www.tplay.live/lista/";
  let url = u + l + ".mp4";

  const options = {
    action: this.webIntent.ACTION_VIEW,
    url: l,
    type: 'application/vnd.android.package-archive'
  };

  this.webIntent.startActivity(options).then();
}





varTemporada(n,t){
  this.navCtrl.push(SeriesTempPage, {id: n, titulo: t, serie: this.TITULO, capa: this.CAPA});
}



carregarFeed(){
let id = this.navParams.get("id");
  this.AbreCarregando();
 this.ApiProvider.embreveDetalheSerie(id).subscribe(data=>{

    const response = (data as any);
    const objeto_retorno = JSON.parse(response._body);

      this.lista = objeto_retorno.DADOS;
console.log(this.lista);

      this.listaTemp = objeto_retorno.DADOS2;
      this.RELACIONADOS = objeto_retorno.RELACIONADOS;




this.CAPA = this.lista.CAPA;
this.CAPA2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.lista.CAPA);
this.LINK = this.lista.LINK;
this.TITULO = this.lista.TITULO;
this.SINOPSE = this.lista.SINOPSE;
this.NOTA = this.lista.RATTING;
this.PAIS = this.lista.PAIS;
this.GENERO = this.lista.GENERO;
this.IDIOMA = this.lista.IDIOMA;
this.DIRETOR = this.lista.DIRETOR;
this.LANCAMENTO = this.lista.LANCAMENTO;
this.FUNDO = this.lista.FUNDO;
this.FAVORITO = this.lista.FAVORITO;
this.TRAILER = this.lista.TRAILER;



   this.FechaCarregando();

},error=>{
  console.log(error);
  this.FechaCarregando();
}

)
}



  ionViewDidEnter() {
this.carregarFeed();
  }
}
