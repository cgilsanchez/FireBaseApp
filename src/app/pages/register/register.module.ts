import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core'; // 🔥 Importar TranslateModule

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page'; // Importamos la página

@NgModule({
  declarations: [RegisterPage], // ✅ Declaramos RegisterPage en lugar de importarlo
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    RegisterPageRoutingModule,
    TranslateModule // ✅ Importar para las traducciones
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ Permitir componentes de Ionic
})
export class RegisterPageModule {}
