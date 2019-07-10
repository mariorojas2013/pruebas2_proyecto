import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { IonicModule, NavController, NavParams,ToastController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre_usuario : any ; 
  id_usuario_sesion: any ; 
  clave_actual: any ; 
  nueva_cl: any ; 
  confirm_cl: any ; 
  apiUrl: any;
  header:any = {};
  celular:any;
  direccion: any; 
  
  datae:any =[
    {"nombre":''}];
   
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private http: HttpClient, public local: LocalStorageService, public session: SessionStorageService
    ) {
     
      this.id_usuario_sesion = this.local.get(`id_usuario`);
      this.nombre_usuario = this.local.get(`nombre_usuario`);
      this.celular = this.local.get(`celular`);
      this.direccion = this.local.get(`direccion`);
     }

    
     cambiarClave()
  { 
      
       if(this.confirm_cl != this.nueva_cl)
       {
          this.NocoincideToast();
       }
        else
      {
        let postData = {
          "id":this.id_usuario_sesion, 
          "clave_actual": this.clave_actual,
          "confirm_cl" : this.confirm_cl
        }
        this.apiUrl = 'http://localhost/2019/IonicServe/update_clave.php';
  
        this.http.post(this.apiUrl,postData,this.header)
                    .subscribe(data => {
                      this.datae =  data;
                      console.log(this.datae.cambio_ok);
                      
                      
                          if(this.datae.cambio_ok == "ok")
                          {
                            this.cambiaClaveToast();
                            this.local.set(`sesion_ok`, 'no');
                            this.navCtrl.navigateRoot('registro');

                          }
                          if(this.datae.claveError == "error")
                          {
                            this.ClaveActErToast();
                            // this.local.set(`sesion_ok`, 'no');
                          }
                      
                         console.log(data);
                        
                        //salir de la sesion
                     
                     }, error => {
                      console.log(error);
                    });
      
       
      }
   
    }
    cerrarSesion()
    {
      this.local.set(`sesion_ok`, 'no');
      this.local.clear();
      this.navCtrl.navigateRoot('home');


    }
    async cambiaClaveToast() {
      const toast = await this.toastCtrl.create({
        message: 'Se ha cambiado la clave',
        duration: 2000
      });
      toast.present();
    }
    async NocoincideToast() {
      const toast = await this.toastCtrl.create({
        message: 'No coincide la nueva clave',
        duration: 2000
      });
      toast.present();
    }
    async ClaveActErToast() {
      const toast = await this.toastCtrl.create({
        message: 'La clave actual esta errada',
        duration: 2000
      });
      toast.present();
    }
     

  ngOnInit() {
  }

}
