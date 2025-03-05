import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../app.module'; 

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  collectionName = 'documentos'; 


  constructor() {}

 
  async createItem(data: any): Promise<void> {
    try {
      await addDoc(collection(db, this.collectionName), data);
      console.log('Documento creado con éxito');
    } catch (error) {
      console.error('Error al crear el documento:', error);
    }
  }


  async getItems(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener documentos:', error);
      return [];
    }
  }


  async updateItem(id: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, data);
      console.log('Documento actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el documento:', error);
    }
  }


  async deleteItem(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      console.log('Documento eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    }
  }
}
