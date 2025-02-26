import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true, // ⚡ Necesario para loadComponent
  imports: [CommonModule, IonicModule], // Agregar módulos necesarios
})
export class FavoritosPage {
  recetasFavoritas: any[] = [];

  constructor(private recetaService: RecetaService) {}

  ngOnInit(): void {
    this.loadFavoritos();
  }

  async loadFavoritos(): Promise<void> {
    this.recetasFavoritas = await this.recetaService.getFavoritas();
  }
}
