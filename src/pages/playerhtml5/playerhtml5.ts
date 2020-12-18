import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import ReactNetflixPlayer from "react-netflix-player"
import { AndroidExoplayer } from '@ionic-native/android-exoplayer';




@IonicPage()
@Component({
  selector: 'page-playerhtml5',
  templateUrl: 'playerhtml5.html',
})
export class Playerhtml5Page implements PipeTransform {
  transform(value: any, ...args: any[]) {
    throw new Error("Method not implemented.");
  }

  public URL: any = this.navParams.get("id");
  public MODO: any = this.navParams.get("modo");
  public MODO2: any = this.navParams.get("modo2");
  public URL1: any;
  private LOGADO: any = localStorage.getItem('LOGADO');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private navController: NavController,
    public sanitizer: DomSanitizer,
    ) {

if(this.MODO === "1"){
 let u = "http://www.tplay.live/lista-series/";

 let url = u + this.URL + "." + this.MODO2 + "." + this.LOGADO + ".mp4";
 this.URL1 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}else{
  let u = "http://www.tplay.live/lista/";


  let url = u + this.URL  + "." + this.MODO2 + "." + this.LOGADO +  ".mp4";


  this.URL1 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
}




  }

  voltar(){
    this.navController.pop();
  }

  bvoltar(event) {

    if (event.key === "Enter") {
  this.voltar();
  }

   }


    aumentar(event) {

    if (event.key === "Enter") {
  this.telacheia();
  }

   }

  telacheia() {
    var vid = document.getElementById("myvideo");
    vid.requestFullscreen();
  }

  ionViewDidLoad() {

  }

}
