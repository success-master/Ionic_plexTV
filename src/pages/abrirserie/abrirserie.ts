import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WebIntent } from '@ionic-native/web-intent';
import { ApiProvider } from '../../providers/api/api';



@IonicPage()
@Component({
  selector: 'page-abrirserie',
  templateUrl: 'abrirserie.html',
})
export class AbrirseriePage {
public ID: any = this.navParams.get("id");


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private webIntent: WebIntent,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    ) {
  }




  abrirFilme(l){
    let u = "http://www.tplay.live/lista/";
    let url = u + l + ".mp4";


    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: url,
      type: 'application/vnd.android.package-archive'
    };

    this.webIntent.startActivity(options).then();
  }


  abrirFilme2(l){
    let u = "http://www.tplay.live/lista-series/";
    let url = u + l + ".mp4";



    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: url,
      type: 'application/org.videolan.vlc'
    };

    this.webIntent.startActivity(options).then();
  }






}
