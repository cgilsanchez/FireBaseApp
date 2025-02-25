import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page'; // Importa el componente
import { PasswordVisibilityPipe } from '../../pipes/password-visibility.pipe'; // Importa el Pipe
import { HoverColorDirective } from '../../directives/hover-color.directive'; // Importa la Directiva

@NgModule({
  declarations: [
    LoginPage, 
    PasswordVisibilityPipe, 
    HoverColorDirective // Declara la Directiva aquí
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    LoginPageRoutingModule
  ],
  exports: [
    PasswordVisibilityPipe, 
    HoverColorDirective // Exporta la Directiva si la usarás en otros módulos
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule {}
