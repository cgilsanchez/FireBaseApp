import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Receta } from '../../models/receta.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.component.html',
  styleUrls: ['./receta-detalle.component.css']
})
export class RecetaDetalleComponent {
  @Input() receta!: Receta;
  @Output() cerrarModal = new EventEmitter<void>();

  chefs: any[] = [];

  constructor(private firestore: AngularFirestore) {
    this.firestore.collection('chefs').valueChanges({ idField: 'id' }).subscribe(data => {
      this.chefs = data;
    });
  }

  getChefNombre(chefId: string): string {
    const chef = this.chefs.find(c => c.id === chefId);
    return chef ? chef.nombre : 'Desconocido';
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}
