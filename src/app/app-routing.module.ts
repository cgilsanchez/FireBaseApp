import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redirige automáticamente al login
    pathMatch: 'full', // Asegura que el redireccionamiento sea exacto
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage), // Usa loadComponent
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage), // Usa loadComponent
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage), // Usa loadComponent
  },
  {
    path: 'recetas',
    loadComponent: () => import('./pages/recetas/recetas.page').then(m => m.RecetasPage)
  }
  
  ,
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
