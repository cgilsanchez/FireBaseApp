import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavoritosPageRoutingModule } from './favoritos-routing.module';
import { FavoritosPage } from './favoritos.page';
import { TranslateModule } from '@ngx-translate/core'; // ✅ Importar el módulo de traducción

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritosPageRoutingModule,
    TranslateModule // ✅ Añadir para soporte de traducciones
  ],
  declarations: [FavoritosPage]
})
export class FavoritosPageModule {}
