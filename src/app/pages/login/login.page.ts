import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordVisibilityPipe } from '../../pipes/password-visibility.pipe'; // Importa el Pipe aquí
import { HoverColorDirective } from 'src/app/directives/hover-color.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, // Configura el componente como standalone
  imports: [ReactiveFormsModule, RouterModule, IonicModule,PasswordVisibilityPipe,HoverColorDirective], // Asegúrate de incluir RouterModule aquí
})
export class LoginPage {
  loginForm: FormGroup;
  isPasswordVisible: boolean = false; // Controla la visibilidad de la contraseña

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Error al iniciar sesión.');
      }
    }
  }
}
