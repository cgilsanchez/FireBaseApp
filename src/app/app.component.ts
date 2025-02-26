import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PushNotificationsService } from './services/push-notifications.service';
import { LanguageService } from './services/language.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isAuthenticated = false; // 🔥 Controla si el usuario está autenticado

  constructor(
    private router: Router,
    private pushService: PushNotificationsService,
    private languageService: LanguageService,
    private authService: AuthService
  ) {
    // 🔥 Escuchar cambios en la autenticación
    this.authService.isAuthenticated().subscribe((authState) => {
      this.isAuthenticated = authState;
    });

    // 🔥 Ocultar el menú en Login y Register aunque el usuario esté autenticado
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/register'];
        if (hiddenRoutes.includes(event.urlAfterRedirects)) {
          this.isAuthenticated = false; // 🔥 Forzar ocultar el menú en Login y Register
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
      this.router.navigate(['/login']); // Redirigir al login al cerrar sesión
    });
  }
}
