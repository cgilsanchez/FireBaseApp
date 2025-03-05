import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'userFavorites';

  constructor() {}

  
  getFavorites(): string[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }


  addFavorite(recipeId: string) {
    const favorites = this.getFavorites();
    if (!favorites.includes(recipeId)) {
      favorites.push(recipeId);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }


  removeFavorite(recipeId: string) {
    const favorites = this.getFavorites().filter(id => id !== recipeId);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }


  isFavorite(recipeId: string): boolean {
    return this.getFavorites().includes(recipeId);
  }
}
