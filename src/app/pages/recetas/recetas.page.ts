import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecetaService } from '../../services/receta.service';
import { RecetaFormComponent } from '../../components/receta-form/receta-form.component';

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

  // Abrir el modal para crear una nueva receta
  async openCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: RecetaFormComponent,
      cssClass: 'receta-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadRecetas(); // Recargar la lista después de agregar una receta
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
        this.loadRecetas(); // Recargar la lista después de actualizar una receta
      }
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
