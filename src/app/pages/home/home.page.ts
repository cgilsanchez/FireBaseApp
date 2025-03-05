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
  standalone: false
})
export class HomePage implements OnInit {
  items: any[] = []; 
  filteredChefs: any[] = []; 
  searchText: string = ''; 
  collectionName = 'documentos'; 


  constructor(private modalController: ModalController, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  async loadItems(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      this.items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.filteredChefs = [...this.items];
    } catch (error) {
      console.error('Error al cargar los ítems:', error);
    }
  }

  
  filterChefs(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredChefs = this.items.filter(chef =>
      chef.name.toLowerCase().includes(searchTerm)
    );
  }

  
  async openCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ItemComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadItems();
      }
    });

    await modal.present();
  }

  
  async openEditModal(item: any): Promise<void> {
    const modal = await this.modalController.create({
      component: ItemComponent,
      componentProps: { item },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadItems();
      }
    });

    await modal.present();
  }

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
