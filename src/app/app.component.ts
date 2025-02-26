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
  standalone:false,
})
export class AppComponent {
  isAuthenticated = false; // 🔥 Controla si el usuario está autenticado
  showSplash: boolean = false; // 🔥 Controla la visibilidad del Splash
  user: User | null = null; // 🔥 Almacena la información del usuario autenticado

  constructor(
    private router: Router,
    private authService: AuthService,
    private pushService: PushNotificationsService,
    private languageService: LanguageService
  ) {
    // 🔥 Escuchar cambios en la autenticación
    this.authService.isAuthenticated().subscribe((authState) => {
      this.isAuthenticated = authState;
      if (authState) {
        this.authService.getCurrentUser().subscribe(user => {
          this.user = user;
        });
      } else {
        this.user = null;
      }
    });

    // 🔥 Gestionar Splash Screen y ocultar menú en Login/Register
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/register'];

        if (hiddenRoutes.includes(event.urlAfterRedirects)) {
          this.isAuthenticated = false; // 🔥 Ocultar menú
        }

        if (event.urlAfterRedirects === '/home' && this.isAuthenticated) {
          this.showSplash = true;
          setTimeout(() => {
            this.showSplash = false; // 🔥 Ocultar Splash después de 3 segundos
          }, 3000);
        }
      }
    });

    // 🔔 Inicializar notificaciones push
    this.initPushNotifications();
  }

  // 🔥 Inicializar notificaciones push
  private initPushNotifications(): void {
    this.pushService.requestPermission();
  }

  // 🔥 Cerrar sesión
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
