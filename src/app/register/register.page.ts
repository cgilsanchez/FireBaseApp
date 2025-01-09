import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { IonicModule } from '@ionic/angular'; // Importa IonicModule

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true, // Configura el componente como standalone
  imports: [ReactiveFormsModule, RouterModule, IonicModule], // Asegúrate de incluir RouterModule aquí
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister(): void {
    console.log('Formulario enviado:', this.registerForm.value);
  }
}
