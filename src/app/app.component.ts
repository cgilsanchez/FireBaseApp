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
  isAuthenticated = false; 
  showSplash: boolean = false;
  showToolbar: boolean = false; 
  user: User | null = null; 
  showDropdown: boolean = false; 
  private previousUrl: string = ''; 
  currentLanguage: string = 'en';
  showLanguageMenu: boolean = false; 

  constructor(
    private router: Router,
    private authService: AuthService,
    private pushService: PushNotificationsService,
    private languageService: LanguageService
  ) {

    this.authService.getCurrentUser().subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;

    
      if (user && this.router.url === '/login') {
        this.router.navigate(['/home']);
      }
    });

    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/register'];

      
        this.showToolbar = !hiddenRoutes.includes(event.urlAfterRedirects);

      
        if (hiddenRoutes.includes(event.urlAfterRedirects)) {
          this.isAuthenticated = false;
        }

        
        if (this.previousUrl === '/login' && event.urlAfterRedirects === '/home') {
          this.showSplash = true;
          setTimeout(() => {
            this.showSplash = false;
          }, 3000);
        }

        
        this.previousUrl = event.urlAfterRedirects;
      }
    });

    

    
    this.languageService.getCurrentLanguageObservable().subscribe((lang) => {
      this.currentLanguage = lang;
    });

    
    this.initPushNotifications();
  }

  onLanguageChange(event: Event) {
    const selectedLang = (event.target as HTMLSelectElement).value;
    this.changeLanguage(selectedLang);
  }
  

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }


  private initPushNotifications(): void {
    this.pushService.requestPermission();
  }

  


  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

 
  logout() {
    this.authService.logout().then(() => {
      this.showDropdown = false;
      this.router.navigate(['/login']);
    });
  }

  
  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.showLanguageMenu = false;
  }
}
