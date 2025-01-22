import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true, // Configura el componente como standalone
  imports: [ReactiveFormsModule, RouterModule, IonicModule], // Asegúrate de incluir RouterModule aquí
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordsMatchValidator });
  }

  // Validador personalizado para confirmar que las contraseñas coinciden
  passwordsMatchValidator(form: FormGroup): null | { mismatch: boolean } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onRegister(): Promise<void> {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      try {
        await this.authService.register(email, password); // Llama al servicio de autenticación
        console.log('Registro exitoso');
        this.router.navigate(['/login']); // Redirige al login
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    }
  }
}
