import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../models/receta.model';
import { RecetaFormComponent } from '../../components/receta-form/receta-form.component';

@Component({
  standalone: true,
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, RecetaFormComponent]
})
export class RecetasPage implements OnInit {
  recetas: Receta[] = [];
  modalAbierto = false;
  recetaSeleccionada: Receta | null = null; // ✅ Cambiar a null para evitar errores

  constructor(private recetaService: RecetaService) {}

  ngOnInit() {
    this.cargarRecetas();
  }

  cargarRecetas() {
    this.recetaService.getRecetas().subscribe(data => {
      this.recetas = data;
    });
  }

  abrirModal(receta: Receta | null = null) {
    this.recetaSeleccionada = receta ?? { titulo: '', ingredientes: [], descripcion: '', chefId: '' };
    this.modalAbierto = true;
  }
  

  cerrarModal() {
    this.modalAbierto = false;
    this.cargarRecetas();
  }

  eliminarReceta(id: string) {
    if (confirm('¿Seguro que quieres eliminar esta receta?')) {
      this.recetaService.deleteReceta(id).then(() => this.cargarRecetas());
    }
  }
}
