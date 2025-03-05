import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', // 🔥 Redirige automáticamente al login
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  
  { path: 'register', 
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard], // 🔥 Protegido
},

  {
    path: 'recetas',
    loadChildren: () => import('./pages/recetas/recetas.module').then(m => m.RecetasPageModule),
    canActivate: [AuthGuard], // 🔥 Protegido
},

  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then((m) => m.FavoritosPageModule),
    canActivate: [AuthGuard], // 🔥 Protegido
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
