import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, NavParams,ToastController } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

   
  ngOnInit() {
  }


  apiUrl = '';
  todos = 'todos';
  header:any = {};
  data:any =[
    {"nombre":'',"correo":"","universidad":""}];
    filterItemsw:any;
  datae:any =[
    {"nombre":'',"correo":"","universidad":""}];
    celular: any;
    direccion:any;

constructor(public local: LocalStorageService, public session: SessionStorageService,public navCtrl: NavController,private http: HttpClient, public toastCtrl: ToastController) {
  this.loadRedSocial();
// this.fcm.subscribeToTopic('people');
     this.celular = this.local.get(`celular`);
      this.direccion =  this.local.get(`direccion`);
}

loadRedSocial()
{
  this.apiUrl = 'http://localhost/2019/IonicServe/red.php';
        
  let postData = {
      "todos": this.todos 
    }

    this.http.post(this.apiUrl,postData,this.header)
            .subscribe(data => {
              
                this.datae =  data;
                this.data =  data;
                this.filterItemsw = data;

                 console.log( data);
             
             }, error => {
              console.log(error);
            });
  
}

EnviarMensajes(id:any,nombre:any)
{
  this.navCtrl.navigateForward(['/mensajes',id, nombre]);
}
act()
{
  this.loadRedSocial();

}

filterItems2(ev: any){
  let val = ev.target.value;
  if (val && val.trim() != '') {
  this.filterItemsw = this.data.filter(item =>
      item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }
  
}

close()
{
 // this.navCtrl.setRoot(StartloginPage)
  // this.navCtrl.push(StartloginPage, {})
}

}
