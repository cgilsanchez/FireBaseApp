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
    RecetasPage,
    RecetaFormComponent // 🔥 Aquí va en `declarations`
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // ✅ Se mantiene aquí
    IonicModule,
    RecetasPageRoutingModule,
    TranslateModule // ✅ Importamos `TranslateModule` aquí para usar `| translate`
  ]
})
export class RecetasPageModule { }
