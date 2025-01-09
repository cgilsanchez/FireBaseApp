import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../app.module'; // Importamos la instancia de Firestore inicializada

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  collectionName = 'documentos'; // Asegúrate de que coincide con el nombre exacto de la colección en Firestore
 // Cambia esto por tu colección en Firestore

  constructor() {}

  // Crear un documento
  async createItem(data: any): Promise<void> {
    try {
      await addDoc(collection(db, this.collectionName), data);
      console.log('Documento creado con éxito');
    } catch (error) {
      console.error('Error al crear el documento:', error);
    }
  }

  // Leer todos los documentos
  async getItems(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener documentos:', error);
      return [];
    }
  }

  // Actualizar un documento
  async updateItem(id: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, data);
      console.log('Documento actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el documento:', error);
    }
  }

  // Eliminar un documento
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
