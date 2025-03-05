import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../app.module'; // Firestore
import { ItemComponent } from '../../components/item/item.component'; // Componente Item
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ItemComponent,TranslateModule],
})
export class HomePage implements OnInit {
  items: any[] = []; // Lista completa de chefs
  filteredChefs: any[] = []; // Lista filtrada de chefs
  searchText: string = ''; // Texto del buscador
  collectionName = 'documentos'; // Nombre de la colección en Firestore


  constructor(private modalController: ModalController, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadItems(); // Cargar los ítems al iniciar la página
  }

  async loadItems(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      this.items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.filteredChefs = [...this.items]; // Inicialmente, todos los chefs visibles
    } catch (error) {
      console.error('Error al cargar los ítems:', error);
    }
  }

  // 🔍 Filtrar chefs por nombre
  filterChefs(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredChefs = this.items.filter(chef =>
      chef.name.toLowerCase().includes(searchTerm)
    );
  }

  // 📌 Abrir modal para crear un chef
  async openCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ItemComponent,
      cssClass: 'item-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadItems();
      }
    });

    await modal.present();
  }

  // 📌 Abrir modal para editar un chef
  async openEditModal(item: any): Promise<void> {
    const modal = await this.modalController.create({
      component: ItemComponent,
      componentProps: { item },
      cssClass: 'item-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadItems();
      }
    });

    await modal.present();
  }

  // 🗑️ Eliminar un chef
  async deleteItem(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
      this.loadItems();
    } catch (error) {
      console.error('Error al eliminar el ítem:', error);
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
