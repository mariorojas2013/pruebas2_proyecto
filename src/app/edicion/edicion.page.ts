import { Component, OnInit} from '@angular/core';
import { NavController,  NavParams, ToastController } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
// import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { Camera, CameraOptions, CameraOriginal} from '@ionic-native/camera';
import { AgmDirectionModule } from 'agm-direction';  
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.page.html',
  styleUrls: ['./edicion.page.scss'],
  styles:[`
  agm-map {
    height: 300px;
    
  }

  `],
  
})
export class EdicionPage implements OnInit {

  // constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activeRoute.snapshot.paramMap.get('id'));
  }


  test: string[];
  devices: any[];
  orientation: any;
  pics: string[] = [];

  title ='';
  header:any = {};
  ID = '';
  Ubicacion = '';
  toaster: any;
  id_desaparecido: any;
  tipo_documento: any;
  numero_documento: any;
  nombres: any;
  apellidos: any;
  color_ojos: any;
  color_cabello: any;
  existeMark: any ; 
  color_piel: any;
  peso_promedio: any;
  genero: any;
  estatura: any;
  telefono_fijo: any;
  celular: any;
  enfermedades: any;
  ultima_ubicacion: any;
  fecha_nacimiento:any;
  asigPosi : any= {};
  public savebtn: boolean = false;
  public updatebtn: boolean = false;
  public deletebtn: boolean = false;
  image: string = null;

  lat: number = 3.3950619;
  lng: number = -76.5957046;
  location : any;
                        
  datae:any =[
    {"nombre":'',"correo":"","universidad":""}];
   
  foundedit:boolean;
  apiUrl = '';
  markersd: marker[] = [];  
  latR: number;
  lngR: number;
  zoom: number = 15;
  
  constructor( public navCtrol: NavController,  
    private http: HttpClient, public toastCtrl: ToastController,private activeRoute: ActivatedRoute )
    {
  
      this.existeMark = false;
      
      this.title = 'desaparecidos';
      this.ID = this.activeRoute.snapshot.paramMap.get('id');
      // public gMaps: GoogleMapsAPIWrapper
      
      if(this.ID != null || this.ID != undefined)
      {
        this.title = 'Editar desaparecidos';
      }
      this.carga();   
    }
    async carga() {
      const toast = await this.toastCtrl.create({
        message: 'Cargando...',
        duration: 3000
      });
      toast.present();
    }
    // openCam(){

    //   const options: CameraOptions = {
    //     quality: 100,
    //     destinationType: this.camera.DestinationType.FILE_URI,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE
    //   }
      
    //   this.camera.getPicture(options).then((imageData) => {
    //    // imageData is either a base64 encoded string or a file URI
    //    // If it's base64 (DATA_URL):
    //    //alert(imageData)
    //    this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
    //   }, (err) => {
    //    // Handle error
    //    alert("error "+JSON.stringify(err))
    //   });
  
    // }
   
  
  
  
  
    

    
    ionViewWillEnter()
    {
      this.loadatos();
    }
    asociarUbicacion()
    {
      // this.navCtrol.push(AnuncioMapPage,{ID: this.ID,Ubicacion : this.ultima_ubicacion});
    }
    mapClicked($event: MouseEvent) {
      if(!this.existeMark)
      {
        this.markersd.push({
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          draggable: true, 
          iconUrl : 'https://cdn0.iconfinder.com/data/icons/iconsweets2/40/user_walk.png'
        });
        this.existeMark = false;
       
      }

      
      console.log(`clicked the marker: ${this.lat + ' ' + this.lng} `)
    }
    markerDragEnd(m: marker, $event: MouseEvent) {
      console.log('dragEnd', m, $event);
      this.lat =  $event.coords.lat ;
      this.lng = $event.coords.lng;
    }

    clickedMarker(label: string, index: number) {
      console.log(`clicked the marker: ${label || index} ${this.lat + ' ' + this.lng} `);
  
      this.latR = this.lat ;
      this.lngR = this.lng;
    }

    volver()
    {
      this.navCtrol.navigateRoot('registro');
    }
    reverseGeocode(latLng) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        console.log(results);
        if (status === 'OK') {
          if (results[0]) {
            console.log('emitir una posicion');
          }
        }
      });
    }
    GuardarPosi()
  { 
      
        
        let postData = {
          "id":this.ID, 
          "lat": this.lat,
          "lng" : this.lng
        }
        this.apiUrl = 'http://localhost/2019/IonicServe/update_posicion.php';
  
        this.http.post(this.apiUrl,postData,this.header)
                    .subscribe(data => {
                      
                         console.log(data);
                          this.ToastGeneral('Se ha actualizado la ubicación', 2000);
                
                     
                     }, error => {
                      console.log(error);
                    });
      
       
      // this.navCtrl.pop();
    }
     

    async ToastGeneral(text:any, duracion:any)
    {
      const toast = await this.toastCtrl.create({
        message: text,
        duration: duracion
      });
      toast.present(); 
    }
    loadatos()
    {
      if(this.ID != '')
      { 
       this.savebtn = false;
       this.updatebtn = true;
       this.deletebtn = true;
          this.apiUrl = 'http://localhost/2019/IonicServe/consultar.php';
        
        let postData = {
            "id": this.ID 
          }
      
          this.http.post(this.apiUrl,postData,this.header)
                  .subscribe(data => {
                    
                      this.datae =  data;
                      for(let datad of this.datae) {
                          this.tipo_documento = datad.tipo_documento; 
                          this.numero_documento = datad.numero_documento; 
                          this.nombres = datad.nombres; 
                          this.apellidos = datad.apellidos; 
                          this.color_ojos = datad.color_ojos; 
                          this.color_cabello = datad.color_cabello; 
                          this.color_piel = datad.color_piel; 
                          this.peso_promedio = datad.peso_promedio; 
                          this.genero = datad.genero; 
                          this.estatura = datad.estatura; 
                          this.telefono_fijo = datad.telefono_fijo; 
                          this.celular = datad.celular; 
                          this.enfermedades = datad.enfermedades; 
                          this.ultima_ubicacion = datad.ultima_ubicacion; 
                          this.fecha_nacimiento = datad.fecha_nacimiento;
                         console.log(datad.nombre);

                         this.asigPosi = this.ultima_ubicacion.split(',');
                        this.latR= parseFloat(this.asigPosi[0]);
                        this.lngR = parseFloat(this.asigPosi[1]);
                         
                        if(this.latR != 0)
                        {
                        this.lat= parseFloat(this.asigPosi[0]);
                        this.lng = parseFloat(this.asigPosi[1]);
                        }
                        else
                        {
                          this.lat=3.3950619;
                          this.lng = -76.5957046;
                        }
                        console.log(this.zoom);


                        this.location = {lat: this.latR ,  lng: this.lngR};
                        // console.log("direc"+ this.reverseGeocode(this.location));
                        console.log("add"+ this.latR);
                        if(this.latR != 0)
                        { 
                          this.existeMark = true;
                        }
                        // this.gMaps.setCenter({ lat: , lng: markerObj.longitude });
                        // this.markersd.map.
                        if(this.latR != 0)
                        {
                          this.markersd = [{
                            lat: this.latR,
                            lng: this.lngR,
                            label: '',
                            draggable: true,
                            iconUrl: 'https://cdn0.iconfinder.com/data/icons/iconsweets2/40/user_walk.png'
                          }];
                        }
                      }     
                      this.foundedit = true;
                       console.log( data);
                   
                   }, error => {
                    console.log(error);
                  });
        
          
      }
      else{
        this.savebtn = true;
        this.updatebtn = false;
        this.deletebtn = false;
      }
      
  }
   
  save()
  {
    if(this.numero_documento == '' ||
    this.tipo_documento == '' ||
    this.numero_documento == '' ||
    this.nombres == '' ||
    this.apellidos == '' ||
    this.color_ojos == '' ||
    this.color_cabello == '' ||
    this.color_piel == '' ||
    this.peso_promedio == '' ||
    this.genero == '' ||
    this.estatura == '' ||
    this.telefono_fijo == '' ||
    this.celular == '' ||
    this.enfermedades == '' ||
    this.fecha_nacimiento == '')
    {
      this.toaster.setMessaje('Campos vacios');
      this.toaster.present();
    }else{
      
      let postData = {
        "tipo_documento" : this.tipo_documento,
        "numero_documento" : this.numero_documento,
        "nombres" : this.nombres,
        "apellidos" : this.apellidos,
        "color_ojos" : this.color_ojos,
        "color_cabello" : this.color_cabello,
        "color_piel" : this.color_piel,
        "peso_promedio" : this.peso_promedio,
        "genero" : this.genero,
        "estatura" : this.estatura,
        "telefono_fijo" : this.telefono_fijo,
        "celular" : this.celular,
        "enfermedades" : this.enfermedades 
        ,"fecha_nacimiento" : this.fecha_nacimiento
      }
      this.apiUrl = 'http://localhost/2019/IonicServe/insertar.php';

      this.http.post(this.apiUrl,postData,this.header)
                  .subscribe(data => {
                    
                    this.ToastGeneral('Se ha Guardado', 3000);
                    this.navCtrol.pop();
                    
                   
                   }, error => {
                    console.log(error);
                  });
    
    }
    
  }

 
  update()
  {
    if(this.numero_documento == '' ||
    this.tipo_documento == '' ||
    this.numero_documento == '' ||
    this.nombres == '' ||
    this.apellidos == '' ||
    this.color_ojos == '' ||
    this.color_cabello == '' ||
    this.color_piel == '' ||
    this.peso_promedio == '' ||
    this.genero == '' ||
    this.estatura == '' ||
    this.telefono_fijo == '' ||
    this.celular == '' ||
    this.enfermedades == '' ||
    this.ultima_ubicacion == '' ||
    this.fecha_nacimiento == '')
    {
      this.toaster.setMessaje('Campos vacios');
      this.toaster.present();
    }else{
      
      let postData = {
        "tipo_documento" : this.tipo_documento,
        "numero_documento" : this.numero_documento,
        "nombres" : this.nombres,
        "apellidos" : this.apellidos,
        "color_ojos" : this.color_ojos,
        "color_cabello" : this.color_cabello,
        "color_piel" : this.color_piel,
        "peso_promedio" : this.peso_promedio,
        "genero" : this.genero,
        "estatura" : this.estatura,
        "telefono_fijo" : this.telefono_fijo,
        "celular" : this.celular,
        "enfermedades" : this.enfermedades,
       
        "id":this.ID,
        "fecha_nacimiento" : this.fecha_nacimiento
      }
      this.apiUrl = 'http://localhost/2019/IonicServe/update.php';

      this.http.post(this.apiUrl,postData,this.header)
                  .subscribe(data => {
                    
                    this.ToastGeneral('Se ha Actualizado', 3000);
                       
              
                   
                   }, error => {
                    console.log(error);
                  });
    
    }
    this.navCtrol.pop();
  }
   
  delete()
  {
     let postData = {
        "id":this.ID
      }
      this.apiUrl = 'http://localhost/2019/IonicServe/eliminar.php';

      this.http.post(this.apiUrl,postData,this.header)
                  .subscribe(data => {
                    
                this.ToastGeneral('Se ha Eliminado', 3000);

                      
                   
                   }, error => {
                    console.log(error);
                  });
    
                  this.navCtrol.pop();
  }
  
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  iconUrl?: string;
}