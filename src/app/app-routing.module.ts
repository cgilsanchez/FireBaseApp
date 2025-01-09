import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './components/item/item.component'; // Importa el componente standalone

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redirige automáticamente al login
    pathMatch: 'full', // Asegura que el redireccionamiento sea exacto
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'home', // Ruta para el componente de crear personas
    component: ItemComponent, // Usa directamente el componente standalone
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
