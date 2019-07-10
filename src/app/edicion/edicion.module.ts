import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EdicionPage } from './edicion.page';

import { AgmCoreModule } from '@agm/core';

import { AgmDirectionModule } from 'agm-direction';  

const routes: Routes = [
  {
    path: '',
    component: EdicionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBJEorEHuUF5hlfoX09KZNNLgol31I0YLk'
    }),
    AgmDirectionModule,
    RouterModule.forChild(routes)
  ],
  
  declarations: [EdicionPage]
})
export class EdicionPageModule {}


