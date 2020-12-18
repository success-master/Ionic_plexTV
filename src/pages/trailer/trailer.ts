import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AndroidExoplayer } from '@ionic-native/android-exoplayer';

@IonicPage()
@Component({
  selector: 'page-trailer',
  templateUrl: 'trailer.html',
})
@Pipe({ name: 'noSanitize' })
export class TrailerPage implements PipeTransform {
  transform(value: any, ...args: any[]) {
    throw new Error("Method not implemented.");
  }


  public URL: any = this.navParams.get("id");
  public URL1: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    private navController: NavController,
    private androidExoPlayer: AndroidExoplayer,
  ) {
  }

  voltar() {
    this.navController.pop();
  }

  bvoltar(event) {
    if (event.key === "Enter") {
      this.voltar();
    }
  }

  ionViewDidLoad() {
    // this.URL1 = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.URL + "?&autoplay=1");
    this.androidExoPlayer.show({ url: "https://www.youtube.com/embed/" + this.URL });
  }

}
