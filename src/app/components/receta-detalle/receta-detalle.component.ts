import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.component.html',
  styleUrls: ['./receta-detalle.component.scss'],
  standalone: false
})
export class RecetaDetalleComponent {
  @Input() receta: any;

  constructor(private modalController: ModalController) {}

  close(): void {
    this.modalController.dismiss();
  }
  async shareReceta() {
    if (!this.receta) {
      console.error('No hay receta disponible para compartir');
      return;
    }

    await Share.share({
      title: `Receta: ${this.receta.titulo}`,
      text: `🍽️ ¡Mira esta receta deliciosa de ${this.receta.titulo}! \n\n📝 Ingredientes: ${this.receta.ingredientes.join(', ')}\n\n📖 Instrucciones: ${this.receta.descripcion}`,
      url: `http://localhost:4200/recetas/${this.receta.id}`,
      dialogTitle: 'Compartir Receta'
    });
  }
}
