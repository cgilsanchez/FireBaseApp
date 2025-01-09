import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, // Configura el componente como standalone
  imports: [ReactiveFormsModule, RouterModule, IonicModule], // Asegúrate de incluir RouterModule aquí
})
export class LoginPage {
  loginForm: FormGroup;

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
        await this.authService.login(email, password); // Llama al servicio de autenticación
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/create']); // Redirige a la pantalla de creación de personas
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  }
}