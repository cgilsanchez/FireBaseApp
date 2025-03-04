import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANG_KEY = 'SELECTED_LANGUAGE';
  private currentLang = new BehaviorSubject<string>('en'); // 🔥 Idioma inicial

  constructor(private translate: TranslateService) {
    this.initTranslate();
  }

  private initTranslate() {
    const savedLang = localStorage.getItem(this.LANG_KEY) || 'en'; // 🔥 Cargar idioma guardado o establecer "en"
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.setDefaultLang(lang); // 🔥 Idioma por defecto
    this.translate.use(lang);
    localStorage.setItem(this.LANG_KEY, lang);
    this.currentLang.next(lang); // 🔥 Notificar cambios de idioma en tiempo real
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }

  getCurrentLanguageObservable() {
    return this.currentLang.asObservable(); // 🔥 Permite suscribirse a los cambios de idioma
  }
}
