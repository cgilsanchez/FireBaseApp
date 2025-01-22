import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page'; // Importa el componente standalone

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, // Importar formularios reactivos
    IonicModule, // Importar módulos de Ionic
    RegisterPageRoutingModule,
    RouterModule,
    RegisterPage, // Importa el componente standalone aquí
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite los componentes de Ionic
})
export class RegisterPageModule {}
