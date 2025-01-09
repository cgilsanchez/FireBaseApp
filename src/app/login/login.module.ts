import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page'; // Importa el componente standalone

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, // Importar formularios reactivos
    IonicModule,
    RouterModule, // Importar módulos de Ionic
    LoginPageRoutingModule,
    LoginPage, // Importa el componente standalone aquí
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite los componentes de Ionic
})
export class LoginPageModule {}
