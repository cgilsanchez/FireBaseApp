import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;
  isPasswordVisible: boolean = false;
  showLanguageMenu = false;
  currentLanguage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Obtener el idioma actual
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        console.log('Inicio de sesión exitoso');

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert(this.translate.instant('LOGIN_ERROR'));
      }
    }
  }

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
    console.log('Menú de idioma:', this.showLanguageMenu);
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.currentLanguage = lang;
    this.showLanguageMenu = false;
  }
}
