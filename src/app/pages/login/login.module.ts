import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { TranslateModule } from '@ngx-translate/core';

// ✅ Importar las clases standalone en lugar de declararlas
import { PasswordVisibilityPipe } from '../../pipes/password-visibility.pipe';
import { HoverColorDirective } from '../../directives/hover-color.directive';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    LoginPageRoutingModule,
    TranslateModule,
    PasswordVisibilityPipe,
    HoverColorDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule { }
