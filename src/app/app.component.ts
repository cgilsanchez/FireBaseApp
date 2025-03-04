import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PushNotificationsService } from './services/push-notifications.service';
import { LanguageService } from './services/language.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isAuthenticated = false; // 🔥 Controla si el usuario está autenticado
  showSplash: boolean = false; // 🔥 Controla la visibilidad del Splash
  showToolbar: boolean = false; // 🔥 Controla si la barra de navegación debe mostrarse
  user: User | null = null; // 🔥 Información del usuario autenticado
  showDropdown: boolean = false; // 🔥 Controla el menú desplegable del usuario
  private previousUrl: string = ''; // 🔥 Guarda la URL anterior
  currentLanguage: string = 'en';
  showLanguageMenu: boolean = false; 

  constructor(
    private router: Router,
    private authService: AuthService,
    private pushService: PushNotificationsService,
    private languageService: LanguageService
  ) {
    // 🔥 Escuchar cambios en la autenticación
    this.authService.getCurrentUser().subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;

      // 🔥 Si el usuario está autenticado y está en el login, redirigir al Home
      if (user && this.router.url === '/login') {
        this.router.navigate(['/home']);
      }
    });

    // 🔥 Gestionar la visibilidad de la barra y el Splash Screen
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/register'];

        // 🔥 Ocultar la barra de navegación en Login y Register
        this.showToolbar = !hiddenRoutes.includes(event.urlAfterRedirects);

        // 🔥 Ocultar menú lateral en Login y Register
        if (hiddenRoutes.includes(event.urlAfterRedirects)) {
          this.isAuthenticated = false;
        }

        // 🔥 Mostrar Splash solo si venimos del Login y vamos a Home
        if (this.previousUrl === '/login' && event.urlAfterRedirects === '/home') {
          this.showSplash = true;
          setTimeout(() => {
            this.showSplash = false; // 🔥 Ocultar Splash después de 3 segundos
          }, 3000);
        }

        // 🔥 Guardar la URL anterior para la próxima navegación
        this.previousUrl = event.urlAfterRedirects;
      }
    });

    

    // 🔥 Suscribirse a cambios de idioma
    this.languageService.getCurrentLanguageObservable().subscribe((lang) => {
      this.currentLanguage = lang;
    });

    // 🔔 Inicializar notificaciones push
    this.initPushNotifications();
  }

  onLanguageChange(event: Event) {
    const selectedLang = (event.target as HTMLSelectElement).value;
    this.changeLanguage(selectedLang);
  }
  

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  // 🔥 Inicializar notificaciones push
  private initPushNotifications(): void {
    this.pushService.requestPermission();
  }

  

  // 🔥 Mostrar/ocultar dropdown del usuario
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  // 🔥 Cerrar sesión
  logout() {
    this.authService.logout().then(() => {
      this.showDropdown = false; // 🔥 Cerrar el menú desplegable
      this.router.navigate(['/login']);
    });
  }

  // 🔥 Cambiar idioma
  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.showLanguageMenu = false;
  }
}
