import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone:false
})
export class FavoritosPage implements OnInit {
  recetasFavoritas: any[] = [];

  constructor(private recetaService: RecetaService) {}

  ngOnInit(): void {
    this.loadFavoritos();
  }

  async loadFavoritos(): Promise<void> {
    this.recetasFavoritas = await this.recetaService.getFavoritas();
  }
}
