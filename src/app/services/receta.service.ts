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
export class RecetaService {
  private collectionName = 'recetas'; // Nombre de la colección en Firestore

  constructor() {}

  // Crear una nueva receta
  async createReceta(data: any): Promise<void> {
    try {
      await addDoc(collection(db, this.collectionName), data);
      console.log('Receta creada con éxito');
    } catch (error) {
      console.error('Error al crear la receta:', error);
    }
  }

  // Obtener todas las recetas
  async getRecetas(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      return [];
    }
  }

  // Actualizar una receta existente
  async updateReceta(id: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, data);
      console.log('Receta actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar la receta:', error);
    }
  }

  // Eliminar una receta
  async deleteReceta(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      console.log('Receta eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la receta:', error);
    }
  }
}
