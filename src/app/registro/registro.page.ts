import { Component, OnInit,NgZone } from '@angular/core';
import { IonicModule, NavController, NavParams,ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
// import { Observable } from 'rxjs/Observable'
// import 'rxjs/add/operator/map';
 


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }
  filterItemsw:any;
  data:any=[];
  header:any = {};
  found:boolean;
  users = []; 
  tabBarElement: any;
  searchTerm : any="";

  ngOnInit() {
  }

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,private http:HttpClient,  public zone: NgZone) {
    this.getdatos();
    //this.add();
  }

  apiUrl = 'http://localhost/2019/IonicServe/consultados.php';
  
  ionViewWillEnter()
  {

    this.getdatos();
  }
  getdatos(){
    this.http.get(this.apiUrl).subscribe(
      (data: string) => {
          if(data.length){
             this.data =  data;
             this.filterItemsw = this.data;
             this.found = true;
             console.log( data);
          }
      }
    )
  }

  ionViewDidLoad(){
    // this.setFilteredItems();
  }
  act()
  {
    this.getdatos();
  }
  filterItems2(ev: any){
    let val = ev.target.value;
    if (val && val.trim() != '') {
    this.filterItemsw = this.data.filter(item =>
        item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1);
    }
    else
    {
    this.getdatos();
    }
  }

  async ToastGeneral(text:any, duracion:any)
  {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: duracion
    });
    toast.present(); 
  } 

  async deleteToast() {
    this.ToastGeneral('Se ha Eliminado', 3000)
  }
  delete(id : any, nombre : any)
  {
     
      // this.apiUrl = 'http://localhost/2019/IonicServe/eliminar.php';
      this.presentToastWithOptions(id, nombre);
     
  }

  async presentToastWithOptions(id: any, nombre: any) {
    const toast = await this.toastCtrl.create({
      header: 'Eliminar a ' ,
      message:  nombre,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'close',
          text: 'Eliminar',
          handler: () => {
            let postData = {
              "id": id
            }
            this.http.post('http://localhost/2019/IonicServe/eliminar.php',postData,this.header)
                        .subscribe(data => {
                          
                       
                          this.getdatos();
                          this.deleteToast();
                            
                         
                         }, error => {
                          console.log(error);
                        });
          
            this.getdatos();
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async publicarToast() {
    this.ToastGeneral('Se ha recibido la publicacion, estará en revisión', 3000)
  }
  async publicar(id: any, nombre: any) {
    const toast = await this.toastCtrl.create({
      header: 'Publicar a ' ,
      message:  nombre,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
          text: 'Publicar',
          handler: () => {
            let postData = {
              "id": id
            }
            this.http.post('http://localhost/2019/IonicServe/publicar.php',postData,this.header)
                        .subscribe(data => {
                          
                       
                          this.getdatos();
                          this.publicarToast();
                            
                         
                         }, error => {
                          console.log(error);
                        });
          
            this.getdatos();
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  

  async quitarpublicar(id: any, nombre: any) {
    const toast = await this.toastCtrl.create({
      header: 'No Publicar a ' ,
      message:  nombre,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'cloud-download',
          text: 'No Publicar',
          handler: () => {
            let postData = {
              "id": id
            }
            this.http.post('http://localhost/2019/IonicServe/nopublicar.php',postData,this.header)
                        .subscribe(data => {
                          
                       
                          this.getdatos();
                          //this.publicarToast();
                            
                         
                         }, error => {
                          console.log(error);
                        });
          
            this.getdatos();
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  
  close()
  {
    
    // this.navCtrl.navigateRoot(StartloginPage); 
  }
  edit(id: any)
  {
     this.navCtrl.navigateForward( ["/edicion", id] );
     this.getdatos();
  }
  add()
  {
    this.navCtrl.navigateForward( ["/edicion", ''] );
    // this.navCtrl.push(AnuncioFormPage,{ID: ''});
    this.getdatos();
  }
   
}
