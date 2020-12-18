import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-abrir-video',
  templateUrl: 'abrir-video.html',
})
export class AbrirVideoPage {
public URL: any = this.navParams.get("id");
public TITULO: any = this.navParams.get("titulo");

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private navController: NavController,) {
  }


  voltar(){
    this.navController.pop();
  }
  ionViewDidLoad() {

  //  document.getElementById("play").click();

  }

}
