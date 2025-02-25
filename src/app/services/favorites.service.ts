import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'userFavorites';

  constructor() {}

  // Obtener favoritos desde localStorage
  getFavorites(): string[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  // Guardar una receta en favoritos
  addFavorite(recipeId: string) {
    const favorites = this.getFavorites();
    if (!favorites.includes(recipeId)) {
      favorites.push(recipeId);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  // Eliminar una receta de favoritos
  removeFavorite(recipeId: string) {
    const favorites = this.getFavorites().filter(id => id !== recipeId);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  // Verificar si una receta está en favoritos
  isFavorite(recipeId: string): boolean {
    return this.getFavorites().includes(recipeId);
  }
}
