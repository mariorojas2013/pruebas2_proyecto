import { Component,OnInit } from '@angular/core';
 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, NavParams,ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

  const { PushNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  header:any = {};
  apiUrl = '';
  usuario : any;
  clave: any;
  id_usuario_sesion:any; 
  datae:any =[
    {"nombre":'',"correo":"","universidad":""}];
    @SessionStorage() sessionValue: string = ``;
  constructor( public local: LocalStorageService, public session: SessionStorageService,public navCtrl: NavController,  private http: HttpClient,public toastCtrl: ToastController) {
    this.id_usuario_sesion = this.local.get(`id_usuario`);
    
     if(this.local.get(`sesion_ok`) == 'ok')
     {
       this.navCtrl.navigateRoot('registro');
     } 
  }


ngOnInit() {
    console.log('Initializing HomePage');

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On succcess, we should be able to receive notifications
    PushNotifications.addListener('registration', 
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', 
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', 
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
}

  public inicio()
  {
    this.apiUrl = 'http://localhost/2019/IonicServe/login.php';
          
    let postData = {
        "usuario": this.usuario,
        "clave": this.clave 
      }
      this.http.post(this.apiUrl,postData,this.header)
              .subscribe(data => {
                  this.datae =  data;
                  if(this.datae.auth =="ok")
                  {
                      this.navCtrl.navigateRoot('registro');
                      this.local.set(`sesion_ok`, 'ok');
                      this.local.set(`id_usuario`, this.datae.id_usuario);
                      this.local.set(`nombre_usuario`, this.datae.nombre_usuario);
                      this.local.set(`celular`, this.datae.celular);
                      this.local.set(`direccion`, this.datae.direccion);
                      this.local.set(`filtro`, this.datae.filtros);
                  }
                  else
                  {
                    this.local.set(`sesion_ok`, 'no');

                    this.presentToast();
                  }
                    
              
               
               }, error => {
                console.log(error);
              });
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Existe un error con su usuario o clave',
      duration: 2000
    });
    toast.present();
  }
  crear()
  {
    this.navCtrl.navigateRoot('registro-user');
  }
}
