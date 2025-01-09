import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { CommonModule } from '@angular/common'; // Para *ngFor
import { IonicModule } from '@ionic/angular'; // Para componentes de Ionic
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from 'src/app/app.module'; // Importar Firestore

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule],
})
export class ItemComponent implements OnInit {
  items: any[] = []; // Lista de ítems
  newItem = { name: '', description: '' }; // Modelo para ítem (crear/actualizar)
  collectionName = 'documentos'; // Nombre de la colección en Firestore
  isEditing = false; // Bandera para saber si estamos editando
  editingItemId: string | null = null; // ID del ítem que se está editando

  constructor() {}

  ngOnInit(): void {
    this.loadItems(); // Cargar los ítems al iniciar el componente
  }

  // Cargar todos los ítems
  async loadItems(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      this.items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Items cargados:', this.items);
    } catch (error) {
      console.error('Error al cargar los ítems:', error);
    }
  }

  // Manejar el envío del formulario (crear o actualizar)
  async onSubmit(): Promise<void> {
    if (this.isEditing) {
      // Si estamos editando, actualiza el ítem
      await this.updateItem();
    } else {
      // Si no estamos editando, crea un nuevo ítem
      await this.createItem();
    }
  }

  // Crear un nuevo ítem
  async createItem(): Promise<void> {
    if (this.newItem.name && this.newItem.description) {
      try {
        await addDoc(collection(db, this.collectionName), this.newItem);
        console.log('Item creado con éxito');
        this.newItem = { name: '', description: '' }; // Limpiar el formulario
        this.loadItems(); // Recargar la lista de ítems
      } catch (error) {
        console.error('Error al crear el ítem:', error);
      }
    } else {
      console.warn('Por favor, completa los campos antes de crear un ítem.');
    }
  }

  // Actualizar un ítem
  async updateItem(): Promise<void> {
    if (this.editingItemId) {
      try {
        const docRef = doc(db, this.collectionName, this.editingItemId);
        await updateDoc(docRef, this.newItem);
        console.log('Item actualizado con éxito');
        this.newItem = { name: '', description: '' }; // Limpiar el formulario
        this.isEditing = false; // Salir del modo edición
        this.editingItemId = null; // Limpiar el ID del ítem en edición
        this.loadItems(); // Recargar la lista de ítems
      } catch (error) {
        console.error('Error al actualizar el ítem:', error);
      }
    }
  }

  // Cargar un ítem en el formulario para editar
  editItem(item: any): void {
    this.newItem = { name: item.name, description: item.description }; // Cargar datos en el formulario
    this.isEditing = true; // Activar el modo edición
    this.editingItemId = item.id; // Guardar el ID del ítem que se está editando
  }

  // Eliminar un ítem
  async deleteItem(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      console.log('Item eliminado con éxito');
      this.loadItems(); // Recargar la lista de ítems
    } catch (error) {
      console.error('Error al eliminar el ítem:', error);
    }
  }

  cancelEdit(): void {
    this.isEditing = false; // Salir del modo edición
    this.editingItemId = null; // Limpiar el ID en edición
    this.newItem = { name: '', description: '' }; // Limpiar el formulario
  }
  
}
