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
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: false,
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
  
})
export class RecetasPage implements OnInit, OnDestroy {
  recetas: any[] = []; 
  private recetasSubscription!: Subscription;

  constructor(
    private recetaService: RecetaService,
    private firestoreSubscription: FirestoreSubscriptionService<any>, 
    private modalController: ModalController,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscribeToRecetas();
  }

  ionViewWillEnter(): void {
    console.log("📌 Volviendo a la página de recetas, recargando...");
    this.forceReloadRecetas();
  }


  subscribeToRecetas(): void {
    if (this.recetasSubscription) {
      this.recetasSubscription.unsubscribe(); 
    }

    this.recetas = []; 

    this.recetasSubscription = this.firestoreSubscription
      .subscribeToCollection('recetas')
      .subscribe((change: CollectionChange<any>) => {
        console.log('📌 Cambio en recetas:', change);
        this.updateRecetas(change);
      });
  }

  
  async forceReloadRecetas(): Promise<void> {
    try {
      this.recetas = await this.recetaService.getRecetas();
      console.log(" Recetas recargadas:", this.recetas);
    } catch (error) {
      console.error(" Error al cargar recetas:", error);
    }
  }

  
  updateRecetas(change: CollectionChange<any>): void {
    console.log(' Cambio en recetas:', change);

    switch (change.type) {
      case 'added':
        
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

  async toggleFavorito(receta: any, event: Event): Promise<void> {
    event.stopPropagation();
    receta.esFavorito = !receta.esFavorito;
    await this.recetaService.toggleFavorito(receta.id, receta.esFavorito);
  }


  async openCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: RecetaFormComponent,
    });

    await modal.present();
  }


  async openEditModal(receta: any): Promise<void> {
    const modal = await this.modalController.create({
      component: RecetaFormComponent,
      componentProps: { receta },
      cssClass: 'receta-modal',
    });

    await modal.present();
  }

  
  async openDetailModal(receta: any): Promise<void> {
    const modal = await this.modalController.create({
      component: RecetaDetalleComponent,
      componentProps: { receta },
      cssClass: 'receta-detalle-modal',
    });

    await modal.present();
  }


  async deleteReceta(id: string): Promise<void> {
      await this.recetaService.deleteReceta(id);
    
  }


  ngOnDestroy(): void {
    if (this.recetasSubscription) {
      this.recetasSubscription.unsubscribe();
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
