import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PushNotificationsService } from './services/push-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  showMenu = false; // Ocultar menú en login y register

  constructor(private router: Router, private pushService: PushNotificationsService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/register'];
        this.showMenu = !hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });

    // 🔔 Inicializar el servicio de notificaciones push
    this.initPushNotifications();
  }

  // Método para inicializar notificaciones push
  private initPushNotifications(): void {
    this.pushService.requestPermission();
  }
}
