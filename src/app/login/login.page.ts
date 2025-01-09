import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { IonicModule } from '@ionic/angular'; // Importa IonicModule

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, // Configura el componente como standalone
  imports: [ReactiveFormsModule, RouterModule, IonicModule], // Asegúrate de incluir RouterModule aquí
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    console.log('Formulario enviado:', this.loginForm.value);
  }
}
