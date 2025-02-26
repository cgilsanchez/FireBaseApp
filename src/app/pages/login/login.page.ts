import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordVisibilityPipe } from '../../pipes/password-visibility.pipe';
import { HoverColorDirective } from 'src/app/directives/hover-color.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, IonicModule, PasswordVisibilityPipe, HoverColorDirective],
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

        // 🔥 Mostrar Splash y luego redirigir al Home
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Error al iniciar sesión.');
      }
    }
  }
}
