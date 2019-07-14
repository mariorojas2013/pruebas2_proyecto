import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages: any;
  id_usuario_sesion : any; 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,public local: LocalStorageService,
    private fcm: FCM,
    private router: Router 
  ) {
  
    this.initializeApp();
 
    this.fcm.subscribeToTopic('people');

    this.fcm.getToken().then(token => {
      console.log(token);
    });

    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
        this.router.navigate([data.landing_page, data.price]);
      } else {
        console.log('Received in foreground');
        this.router.navigate([data.landing_page, data.price]);
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
   

    this.id_usuario_sesion = this.local.get(`id_usuario`);
    if(this.id_usuario_sesion == '')
    {
    this.appPages = [
      {
        title: 'Iniciar Sesión',
        url: '/home',
        icon: 'home' 
      }
    ];  
    }
    if(this.id_usuario_sesion != '')
    {
      this.appPages = [
         
        {
          title: 'Perfil',
          url: '/perfil',
          icon: 'list' 
        },
        {
          title: 'administracion desaparecidos',
          url: '/registro',
          icon: 'list' 
        },
        {
          title: 'Consultar desaparecidos',
          url: '/consulta',
          icon: 'list' 
        }
      ];  
    }


  }


   

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  
}
