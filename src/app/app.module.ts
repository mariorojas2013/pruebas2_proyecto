import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core';

import { FCM } from '@ionic-native/fcm/ngx';
// import { RegistroPage } from '../app/registro/registro.page';
@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(),
    // AgmCoreModule.forRoot({
    //   // please get your own API key here:
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
    //   apiKey: 'AIzaSyBJEorEHuUF5hlfoX09KZNNLgol31I0YLk'
    // }),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
