import { Component } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { TranslateService } from '@ngx-translate/core';
import { RecetaDetalleComponent } from 'src/app/components/receta-detalle/receta-detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false
})
export class FavoritosPage {
  recetasFavoritas: any[] = [];

  constructor(
    private recetaService: RecetaService, 
    private translate: TranslateService, 
    private modalController: ModalController // ✅ Asegurar que esté definido aquí
  ) {}

  ngOnInit(): void {
    this.loadFavoritos();
  }

  // ✅ Método para abrir el modal de detalles
  async openDetailModal(receta: any): Promise<void> {
    const modal = await this.modalController.create({
      component: RecetaDetalleComponent,  // ✅ Aquí se abre el modal de detalles
      componentProps: { receta }, // ✅ Pasamos la receta seleccionada
    });

    await modal.present();
  }

  async loadFavoritos(): Promise<void> {
    this.recetasFavoritas = await this.recetaService.getFavoritas();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
