import { Component } from '@angular/core';
 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, NavParams,ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
                    console.log(this.local);
                    console.log('  ');
                    console.log(data);
                      this.navCtrl.navigateRoot('registro');
                      // this.sessionValue = `Hello`;
                      this.local.set(`sesion_ok`, 'ok');
                      this.local.set(`id_usuario`, this.datae.id_usuario);
                      this.local.set(`nombre_usuario`, this.datae.nombre_usuario);
                      this.local.set(`celular`, this.datae.celular);
                      this.local.set(`direccion`, this.datae.direccion);
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
  
}
