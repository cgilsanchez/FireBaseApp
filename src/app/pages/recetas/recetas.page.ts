import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecetaService } from '../../services/receta.service';
import { FirestoreSubscriptionService, CollectionChange } from '../../services/firestore-subscription.service';
import { RecetaFormComponent } from '../../components/receta-form/receta-form.component';
import { RecetaDetalleComponent } from '../../components/receta-detalle/receta-detalle.component';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, RecetaFormComponent],
})
export class RecetasPage implements OnInit, OnDestroy {
  recetas: any[] = []; // Lista de recetas obtenidas de Firestore
  private recetasSubscription!: Subscription;

  constructor(
    private recetaService: RecetaService,
    private firestoreSubscription: FirestoreSubscriptionService<any>, // 🔥 Inyectamos el servicio de suscripción
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.subscribeToRecetas();
  }

  ionViewWillEnter(): void {
    console.log("📌 Volviendo a la página de recetas, recargando...");
    this.forceReloadRecetas(); // 🔥 Cargar los datos de nuevo al entrar
  }

  // 🔥 Suscribirse en tiempo real a los cambios en la colección "recetas"
  subscribeToRecetas(): void {
    if (this.recetasSubscription) {
      this.recetasSubscription.unsubscribe(); // 🔥 Evita suscripciones duplicadas
    }

    this.recetas = []; // 🔥 Limpiar el array antes de recibir datos nuevos

    this.recetasSubscription = this.firestoreSubscription
      .subscribeToCollection('recetas')
      .subscribe((change: CollectionChange<any>) => {
        console.log('📌 Cambio en recetas:', change);
        this.updateRecetas(change);
      });
  }

  // 🔥 Cargar las recetas de Firestore manualmente cuando se entra a la página
  async forceReloadRecetas(): Promise<void> {
    try {
      this.recetas = await this.recetaService.getRecetas();
      console.log("📌 Recetas recargadas:", this.recetas);
    } catch (error) {
      console.error("❌ Error al cargar recetas:", error);
    }
  }

  // 🔥 Actualizar el array de recetas en base a los cambios en Firestore
  updateRecetas(change: CollectionChange<any>): void {
    console.log('📌 Cambio en recetas:', change);

    switch (change.type) {
      case 'added':
        // 🔥 Verificar si la receta ya está en la lista para evitar duplicados
        if (!this.recetas.some(r => r.id === change.id)) {
          this.obtenerNombreChef(change.data.chefId).then(chefNombre => {
            change.data.chefNombre = chefNombre;
            this.recetas.push(change.data);
          });
        }
        break;
      case 'modified':
        const index = this.recetas.findIndex(r => r.id === change.id);
        if (index !== -1) {
          this.obtenerNombreChef(change.data.chefId).then(chefNombre => {
            this.recetas[index] = { ...change.data, chefNombre };
          });
        }
        break;
      case 'removed':
        this.recetas = this.recetas.filter(r => r.id !== change.id);
        break;
    }
  }

  async obtenerNombreChef(chefId: string): Promise<string> {
    if (!chefId) return 'Desconocido';

    try {
      const chefDoc = await this.recetaService.getChefById(chefId);
      return chefDoc?.name.trim() || 'Desconocido';
    } catch (error) {
      console.error('Error al obtener el nombre del chef:', error);
      return 'Desconocido';
    }
  }

  // Método para marcar o desmarcar como favorito
  async toggleFavorito(receta: any, event: Event): Promise<void> {
    event.stopPropagation();
    receta.esFavorito = !receta.esFavorito;
    await this.recetaService.toggleFavorito(receta.id, receta.esFavorito);
  }

  // Abrir el modal para crear una nueva receta
  async openCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: RecetaFormComponent,
      cssClass: 'receta-modal',
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
    }
  }

  // 🔥 Desuscribirse de Firestore al salir de la página
  ngOnDestroy(): void {
    if (this.recetasSubscription) {
      this.recetasSubscription.unsubscribe();
    }
  }
}
