import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecetasPageRoutingModule } from './recetas-routing.module';
import { RecetasPage } from './recetas.page';
import { RecetaFormComponent } from '../../components/receta-form/receta-form.component';

// 🔥 Importar `TranslateModule`
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RecetasPage, // ✅ Ahora declaramos la página correctamente
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, // ✅ Importamos correctamente el módulo de Ionic
    RecetasPageRoutingModule,
    TranslateModule ,// ✅ Importamos `TranslateModule` para que funcione `| translate`
    RecetaFormComponent
  ],
  exports: [
    RecetasPage
  ]
})
export class RecetasPageModule { }
