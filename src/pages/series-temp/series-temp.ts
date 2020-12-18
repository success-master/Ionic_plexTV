import { AbrirseriePage } from './../abrirserie/abrirserie';
import { VerepPage } from './../verep/verep';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WebIntent } from '@ionic-native/web-intent';
import { ApiProvider } from '../../providers/api/api';



@IonicPage()
@Component({
  selector: 'page-series-temp',
  templateUrl: 'series-temp.html',
})
export class SeriesTempPage {
  loader: any;
  public lista: any;
  public TITULO: any = this.navParams.get("titulo");
  public SERIE: any = this.navParams.get("serie");
  public CAPA: any = this.navParams.get("capa");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private webIntent: WebIntent,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    private navController: NavController,

    ) {
  }

  voltar(){
    this.navController.pop();
  }
  bvoltar(event) {

    if (event.key === "Enter") {
 this.voltar();
 }

   }


   onKey(event,l,t,text,lk,e) {

    if (event.key === "Enter") {
 this.abrir(l,t,text,lk,e);
 }

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


abrir(l,t,text,lk,e){
  this.navCtrl.push('VerepPage', {id: l, titulo: t, texto: text, link: lk, ep: e, serie: this.SERIE});
}


abrirFilme2(l){
  let u = "http://www.tplay.live/lista-series/";
  let url = u + l + ".mp4";

console.log(l);


  const options = {
    action: this.webIntent.ACTION_VIEW,
    url: url,
    type: 'application/com.bubblesoft.android.bubbleupnp'
  };

  this.webIntent.startActivity(options).then();
}

verEp(n){
  this.navCtrl.push('VerepPage', {id: n});
}



carregarFeed(){


let id = this.navParams.get("id");


  this.AbreCarregando();
 this.ApiProvider.SerieEp(id).subscribe(data=>{

    const response = (data as any);
    const objeto_retorno = JSON.parse(response._body);

      this.lista = objeto_retorno.DADOS;






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
