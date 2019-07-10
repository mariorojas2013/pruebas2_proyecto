import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, NavParams,ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
 
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
// import { HomePage } from '../home/home';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
  

export class HomePageModule {
  
 
  
}