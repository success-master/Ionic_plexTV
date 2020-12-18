
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import swal from 'sweetalert';
import { ApiProvider } from '../../providers/api/api';
import { SplashScreen } from '@ionic-native/splash-screen';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    ApiProvider
  ]
})
export class LoginPage {

  @ViewChild('searchInput') sInput;

  public USUARIO: any = this.navParams.get('USUARIO');
  public SENHA: any = this.navParams.get('SENHA');
  loader: any;
  public lista: any;
  public numero: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
  ) {


  }

  moveFocus(nextElement) {
    console.log(nextElement);

    nextElement.setFocus();
  }

  onKey(event,nextElement) {
    console.log(event.key);

    if (event.key === "Enter") {
console.log(nextElement);


      nextElement.setFocus();


    }

  }

  onKey2(event,nextElement,en) {
    if (event.key === "Enter") {

        //document.getElementById("ctl00_plcPrincipal_btnContrato").click();
        //en.setFocus();
this.login();

    }else if(event.key === "ArrowUp"){
      nextElement.setFocus();
    }else if(event.key === "ArrowDown"){
      document.getElementById("ctl00_plcPrincipal_btnContrato").click();
    }

  }



  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Verificando dados..."
    });
    this.loader.present();
  }

FechaCarregando(){
  this.loader.dismiss();
}



  login(){
    this.AbreCarregando();
    this.numero = Math.floor(Math.random() * 156747891789);
    this.ApiProvider.login(this.USUARIO, this.SENHA, this.numero).subscribe(data=>{

       const response = (data as any);
       const objeto_retorno = JSON.parse(response._body);

         this.lista = objeto_retorno.DADOS;

         //console.log(this.lista);



 if(this.lista.STATUS == 1){
  this.navCtrl.setRoot(HomePage);
  localStorage.setItem("LOGADO", this.numero);
  localStorage.setItem("ETAPA", "1");
  localStorage.setItem("NOME", this.lista.NOME);
  localStorage.setItem("PIN", this.lista.PIN);
  localStorage.setItem("USUARIO", this.USUARIO);
  localStorage.setItem("PREMIUM", this.lista.PREMIUM);
  localStorage.setItem("PLAY", "3");
  //swal("Logado com sucesso!", "Seja bem vindo de volta " + this.lista.NOME, "success");
  this.FechaCarregando();
 }else if(this.lista.STATUS == 2){
  swal("Usuário ou senha incorretos!", "Tente novamente ou entre em contato com o administrador", "error");
  this.FechaCarregando();
}else if(this.lista.STATUS == 0){
  swal("Seu login foi desativado!", "Entre em contato com o administrador para saber o porque.", "error");
  this.FechaCarregando();
}





   },error=>{
     console.log(error);
     this.FechaCarregando();
   }

   )


  }


  cadastrar(){
    this.navCtrl.setRoot('CadastrarPage');
  }

  ionViewDidEnter() {
    this.splashScreen.hide();

    this.menuCtrl.enable(false, 'myMenu');
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }
}
