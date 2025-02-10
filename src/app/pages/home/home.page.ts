import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../app.module'; // Firestore
import { ItemComponent } from '../../components/item/item.component'; // Componente Item

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ItemComponent],
})
export class HomePage implements OnInit {
  items: any[] = []; // Lista de ítems desde Firestore
  collectionName = 'documentos'; // Nombre de la colección en Firestore

  

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    this.loadItems(); // Cargar los ítems al iniciar la página
  }

  // Cargar ítems desde Firebase
  async loadItems(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      this.items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error al cargar los ítems:', error);
    }
  }

  // Abrir el modal para crear un nuevo ítem
  async openCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ItemComponent,
      cssClass: 'item-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadItems(); // Recargar la lista después de agregar un ítem
      }
    });

    await modal.present();
  }

  // Abrir el modal para editar un ítem
  async openEditModal(item: any): Promise<void> {
    const modal = await this.modalController.create({
      component: ItemComponent,
      componentProps: { item }, // Pasar el ítem al modal
      cssClass: 'item-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadItems(); // Recargar la lista después de actualizar un ítem
      }
    });

    await modal.present();
  }

  // Eliminar un ítem
  async deleteItem(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
      this.loadItems();
    } catch (error) {
      console.error('Error al eliminar el ítem:', error);
    }
  }
}
