import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.component.html',
  styleUrls: ['./receta-detalle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule] // 📌 Agrego IonicModule aquí
})
export class RecetaDetalleComponent {
  @Input() receta: any;

  constructor(private modalController: ModalController) {}

  close(): void {
    this.modalController.dismiss();
  }
}
