import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = new BehaviorSubject<string>('es'); // Idioma por defecto
  private translations: any = {};

  constructor(private http: HttpClient) {
    this.loadTranslations(this.language.value);
  }

  setLanguage(lang: string) {
    this.language.next(lang);
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: string) {
    this.http.get(`/assets/i18n/${lang}.json`).subscribe(translations => {
      this.translations = translations;
    });
  }

  getTranslation(key: string): string {
    return this.translations[key] || key; // Si no se encuentra, devuelve la clave original
  }

  // 🔥 Para actualizar el componente automáticamente
  getTranslations() {
    return this.language.asObservable();
  }
}
