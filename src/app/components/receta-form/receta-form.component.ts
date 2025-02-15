import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../models/receta.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  standalone: true,
  selector: 'app-receta-form',
  templateUrl: './receta-form.component.html',
  styleUrls: ['./receta-form.component.scss'],
  imports: [FormsModule] // Agregar FormsModule en imports
})
export class RecetaFormComponent implements OnInit {
  @Input() receta: Receta = { titulo: '', ingredientes: [], descripcion: '', chefId: '' };
  @Output() cerrarModal = new EventEmitter<void>();

  chefs: any[] = [];
  nuevoIngrediente: string = '';
  imagenArchivo: File | null = null;
  imagenPreview: string | null = null;

  constructor(private recetaService: RecetaService, private firestore: AngularFirestore) {}

  ngOnInit() {
    // Obtener chefs desde Firestore
    this.firestore.collection('chefs').valueChanges({ idField: 'id' }).subscribe(data => {
      this.chefs = data;
    });
  }

  agregarIngrediente() {
    if (this.nuevoIngrediente.trim()) {
      this.receta.ingredientes.push(this.nuevoIngrediente.trim());
      this.nuevoIngrediente = '';
    }
  }

  eliminarIngrediente(ing: string) {
    this.receta.ingredientes = this.receta.ingredientes.filter(i => i !== ing);
  }

  seleccionarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenArchivo = file;
      const reader = new FileReader();
      reader.onload = () => this.imagenPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  async guardarReceta() {
    try {
      if (this.receta.id) {
        await this.recetaService.updateReceta(this.receta.id, this.receta);
      } else {
        const docRef = await this.recetaService.addReceta(this.receta);
        if (this.imagenArchivo) {
          const imagenUrl = await this.recetaService.uploadImage(this.imagenArchivo, docRef.id);
          await this.recetaService.updateReceta(docRef.id, { imagenUrl });
        }
      }
      this.cerrarModal.emit();
    } catch (error) {
      console.error('Error al guardar receta:', error);
    }
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}
