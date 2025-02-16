import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecetaService } from '../../services/receta.service';
import { RecetaFormComponent } from '../../components/receta-form/receta-form.component';
import { RecetaDetalleComponent } from '../../components/receta-detalle/receta-detalle.component'; // 📌 Importo el modal de detalles

@Component({
  standalone: true,
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, RecetaFormComponent],
})
export class RecetasPage implements OnInit {
  recetas: any[] = []; // Lista de recetas obtenidas de Firestore

  constructor(private recetaService: RecetaService, private modalController: ModalController) {}

  ngOnInit(): void {
    this.loadRecetas();
  }

  // Cargar recetas desde Firestore
  async loadRecetas(): Promise<void> {
    this.recetas = await this.recetaService.getRecetas();
  }

  // Método para marcar o desmarcar como favorito
async toggleFavorito(receta: any, event: Event): Promise<void> {
  event.stopPropagation(); // Evita que el evento se propague y abra el modal
  receta.esFavorito = !receta.esFavorito; // Cambia el estado localmente
  await this.recetaService.toggleFavorito(receta.id, receta.esFavorito); // Actualiza en Firestore
}


  // Abrir el modal para crear una nueva receta
  async openCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: RecetaFormComponent,
      cssClass: 'receta-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadRecetas();
      }
    });

    await modal.present();
  }

  // Abrir el modal para editar una receta existente
  async openEditModal(receta: any): Promise<void> {
    const modal = await this.modalController.create({
      component: RecetaFormComponent,
      componentProps: { receta },
      cssClass: 'receta-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadRecetas();
      }
    });

    await modal.present();
  }

  // 📌 Abrir el modal para ver detalles de la receta
  async openDetailModal(receta: any): Promise<void> {
    const modal = await this.modalController.create({
      component: RecetaDetalleComponent,
      componentProps: { receta },
      cssClass: 'receta-detalle-modal',
    });

    await modal.present();
  }

  // Eliminar una receta
  async deleteReceta(id: string): Promise<void> {
    if (confirm('¿Seguro que quieres eliminar esta receta?')) {
      await this.recetaService.deleteReceta(id);
      this.loadRecetas();
    }
  }
}
