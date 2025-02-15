import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../app.module';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-receta-form',
  templateUrl: './receta-form.component.html',
  styleUrls: ['./receta-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class RecetaFormComponent implements OnInit {
  @Input() receta: any = { titulo: '', ingredientes: [], descripcion: '', chefId: '' };
  isEditing = false;
  chefs: any[] = [];
  nuevoIngrediente: string = '';
  imagenArchivo: File | null = null;
  imagenPreview: string | null = null;
  collectionName = 'documentos'; // Nombre de la colección donde están los chefs

  constructor(private modalController: ModalController, private recetaService: RecetaService) {}

  async ngOnInit() {
    this.loadChefs(); // Cargar chefs al iniciar el modal
    if (this.receta.id) {
      this.isEditing = true;
    }
  }

  async loadChefs() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      this.chefs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nombre: doc.data()['name'] // 📌 Asegúrate de que `name` es el campo correcto en Firestore
      }));
    } catch (error) {
      console.error('Error al cargar los chefs:', error);
    }
  }

  async save(): Promise<void> {
    if (this.receta.titulo && this.receta.descripcion) {
      try {
        if (this.isEditing) {
          await this.recetaService.updateReceta(this.receta.id, this.receta);
        } else {
          await this.recetaService.createReceta(this.receta);
        }
        this.modalController.dismiss(this.receta);
      } catch (error) {
        console.error('Error al guardar la receta:', error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  agregarIngrediente() {
    if (this.nuevoIngrediente.trim()) {
      this.receta.ingredientes.push(this.nuevoIngrediente.trim());
      this.nuevoIngrediente = '';
    }
  }

  eliminarIngrediente(ing: string) {
    this.receta.ingredientes = this.receta.ingredientes.filter((i: string) => i !== ing);
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

  close(): void {
    this.modalController.dismiss();
  }
}
