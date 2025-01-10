import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../app.module';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ItemComponent {
  @Input() item: any = null; // Datos del ítem para editar
  newItem = { name: '', description: '' }; // Datos para el nuevo ítem o edición
  collectionName = 'documentos'; // Nombre de la colección en Firestore
  isEditing = false; // Determina si estamos editando o creando

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    // Si se recibe un ítem como entrada, lo cargamos en el formulario
    if (this.item) {
      this.newItem = { name: this.item.name, description: this.item.description };
      this.isEditing = true; // Cambia el modo a edición
    }
  }

  // Guardar o actualizar el ítem en Firebase
  async save(): Promise<void> {
    if (this.newItem.name && this.newItem.description) {
      try {
        if (this.isEditing && this.item.id) {
          // Si estamos editando, actualizamos el ítem
          const docRef = doc(db, this.collectionName, this.item.id);
          await updateDoc(docRef, this.newItem);
          console.log('Ítem actualizado con éxito:', this.newItem);
        } else {
          // Si no estamos editando, creamos un nuevo ítem
          await addDoc(collection(db, this.collectionName), this.newItem);
          console.log('Ítem creado con éxito:', this.newItem);
        }
        this.modalController.dismiss(this.newItem); // Cierra el modal y envía los datos
      } catch (error) {
        console.error('Error al guardar el ítem:', error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Cerrar el modal sin guardar
  close(): void {
    this.modalController.dismiss();
  }
}
