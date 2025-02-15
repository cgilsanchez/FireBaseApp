import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../models/receta.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-receta-list',
  templateUrl: './receta-list.component.html',
  styleUrls: ['./receta-list.component.css']
})
export class RecetaListComponent implements OnInit {
  recetas: Receta[] = [];
  chefs: any[] = [];
  modalAbierto = false;
  modalDetalleAbierto = false;
  recetaSeleccionada: Receta | null = null;
  recetaDetalle: Receta | null = null;

  constructor(private recetaService: RecetaService, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.recetaService.getRecetas().subscribe(data => {
      this.recetas = data;
    });

    // Obtener lista de chefs
    this.firestore.collection('chefs').valueChanges({ idField: 'id' }).subscribe(data => {
      this.chefs = data;
    });
  }

  abrirModal(receta: Receta | null = null) {
    this.recetaSeleccionada = receta 
      ? { ...receta } 
      : { titulo: '', ingredientes: [], descripcion: '', chefId: '' } as Receta;
    this.modalAbierto = true;
  }
  
  cerrarModal() {
    this.modalAbierto = false;
  }

  verDetalles(receta: Receta) {
    this.recetaDetalle = receta;
    this.modalDetalleAbierto = true;
  }

  cerrarModalDetalle() {
    this.modalDetalleAbierto = false;
  }

  editarReceta(receta: Receta) {
    this.abrirModal(receta);
  }

  async eliminarReceta(id: string) {
    if (confirm('¿Seguro que quieres eliminar esta receta?')) {
      await this.recetaService.deleteReceta(id);
    }
  }

  toggleFavorito(receta: Receta) {
    this.recetaService.updateReceta(receta.id!, { favorito: !receta.favorito });
  }

  getChefNombre(chefId: string): string {
    const chef = this.chefs.find(c => c.id === chefId);
    return chef ? chef.nombre : 'Desconocido';
  }
}
