import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { NavController,  NavParams, ToastController } from '@ionic/angular';

    

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {

  data:any=[];
  header:any = {};
  ID:any;
  nombre:any;
  texto_mensaje:any;
  id_usuario_sesion : any;
  constructor( public toastCtrl: ToastController,public local: LocalStorageService,private http:HttpClient,private activeRoute: ActivatedRoute ) { 
    //id_desaparecido
    this.ID = this.activeRoute.snapshot.paramMap.get('id');
    this.id_usuario_sesion = this.local.get(`id_usuario`);
    this.nombre = this.activeRoute.snapshot.paramMap.get('nombre');
    this.getdatos(this.ID);
  }

  ngOnInit() {
  }

  apiUrl = 'http://localhost/2019/IonicServe/mensajes.php';
   getdatos( id_desaparecido:any){

    let postData = {
      "id_desaparecido": id_desaparecido 

    }
    this.http.post(this.apiUrl,postData,this.header)
    .subscribe(data => {
      if(data){
        this.data =  data;
        console.log( data);
     }
     
     }, error => {
      console.log(error);
    });

   
  }
 

  enviarmensaje()
  { 
        let postData = {
          "id_desaparecido":this.ID, 
          "id_usuario_envia":this.id_usuario_sesion ,
          "mensaje" : this.texto_mensaje
        }
        this.http.post('http://localhost/2019/IonicServe/mensajes_envio.php',postData,this.header)
                    .subscribe(data => {
                         console.log(data);
                         this.enviaMensajeToast();
                         this.getdatos(this.ID);
                     }, error => {
                      console.log(error);
                    });
      
       
      // this.navCtrl.pop();
    }
    async enviaMensajeToast() {
      const toast = await this.toastCtrl.create({
        message: 'Se ha enviado el mensaje',
        duration: 2000
      });
      toast.present();
    }


}


