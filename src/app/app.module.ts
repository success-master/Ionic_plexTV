import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WebIntent } from '@ionic-native/web-intent';
import { ApiProvider } from '../providers/api/api';

import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { MenuProvider } from '../providers/menu/menu';
import { AppAvailability } from '@ionic-native/app-availability';
import { Device } from '@ionic-native/device';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { AndroidExoplayer } from '@ionic-native/android-exoplayer';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WebIntent,
    ApiProvider,
    InAppBrowser,
    UniqueDeviceID,
    MenuProvider,
    AppAvailability,
    Device,
    StreamingMedia,
    AndroidExoplayer
  ]
})
export class AppModule { }
