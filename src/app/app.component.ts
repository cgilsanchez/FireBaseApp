import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
  
})
export class AppComponent {
  showMenu = false; // Ocultar menú en login y register

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/register'];
        this.showMenu = !hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });
  }


  
}
