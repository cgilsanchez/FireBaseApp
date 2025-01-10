import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu = true; // Controla si se muestra el menú

  constructor(private router: Router) {
    // Escuchar cambios en la ruta para decidir si mostrar el menú
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/register'];
        this.showMenu = !hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });
  }

  logout(): void {
    // Aquí puedes manejar la lógica de cierre de sesión
    console.log('Cerrando sesión...');
  }
}
