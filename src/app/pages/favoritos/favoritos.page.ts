import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RecetaService } from '../../services/receta.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false
})
export class FavoritosPage {
  recetasFavoritas: any[] = [];

  constructor(private recetaService: RecetaService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadFavoritos();
  }

  async loadFavoritos(): Promise<void> {
    this.recetasFavoritas = await this.recetaService.getFavoritas();
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
