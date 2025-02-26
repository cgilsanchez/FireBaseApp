import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecetasPageRoutingModule } from './recetas-routing.module';
import { RecetaFormComponent } from '../../components/receta-form/receta-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasPageRoutingModule,
    RecetaFormComponent,
    ReactiveFormsModule  // ✅ Se importa aquí, pero NO en declarations
  ]
})
export class RecetasPageModule {}
