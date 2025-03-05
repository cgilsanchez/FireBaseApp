import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecetasPageRoutingModule } from './recetas-routing.module';
import { RecetasPage } from './recetas.page';
import { RecetaFormComponent } from '../../components/receta-form/receta-form.component';

// 🔥 Importar `TranslateModule`
import { TranslateModule } from '@ngx-translate/core';
import { RecetaDetalleComponent } from 'src/app/components/receta-detalle/receta-detalle.component';
import { ChefSelectorComponent } from 'src/app/components/chef-selector/chef-selector.component';

@NgModule({
  declarations: [
    RecetasPage,
    RecetaDetalleComponent ,
    RecetaFormComponent,
    ChefSelectorComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    IonicModule, 
    RecetasPageRoutingModule,
    TranslateModule ,
  ],
  exports: [
    RecetasPage
  ]
})
export class RecetasPageModule { }
