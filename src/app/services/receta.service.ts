import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../app.module';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private collectionName = 'recetas';
  private storage = getStorage();

  constructor() {}

  // Subir imagen a Firebase Storage
  async uploadImage(file: File): Promise<string> {
    try {
      const storageRef = ref(this.storage, `recetas/${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  }

  // Crear una nueva receta con imagen opcional
  async createReceta(data: any, imageFile?: File): Promise<void> {
    try {
      if (imageFile) {
        data.imageUrl = await this.uploadImage(imageFile);
      }
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
      let recetas = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      // 🔥 Obtener nombres de chefs desde la colección correcta
      const chefsSnapshot = await getDocs(collection(db, 'documentos'));
      const chefsMap: { [key: string]: string } = {};
  
      chefsSnapshot.docs.forEach((chef) => {
        chefsMap[chef.id] = chef.data()['name'].trim(); // 🔥 Asegurar que no tenga espacios adicionales
      });
  
      // 🔥 Reemplazar chefId con el nombre del chef
      recetas = recetas.map((receta: any) => ({
        ...receta,
        chefNombre: receta.chefId ? chefsMap[receta.chefId] || 'Desconocido' : 'Desconocido',
      }));
  
      return recetas;
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      return [];
    }
  }
  
  
  async toggleFavorito(id: string, esFavorito: boolean): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, { esFavorito });
      console.log(`Receta ${id} actualizada como favorita: ${esFavorito}`);
    } catch (error) {
      console.error('Error al actualizar favorito:', error);
    }
  }
  
  async getChefById(chefId: string): Promise<any> {
    try {
      const chefRef = doc(db, 'documentos', chefId);
      const chefSnap = await getDoc(chefRef);
  
      if (chefSnap.exists()) {
        return chefSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el chef:', error);
      return null;
    }
  }
  

  // Obtener solo las recetas favoritas
  async getFavoritas(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      return querySnapshot.docs
        .map((doc) => ({ id: doc.id, esFavorito: false, ...doc.data() })) // 🔥 Asegurar que esFavorito siempre está definido
        .filter((receta) => receta.esFavorito === true);
    } catch (error) {
      console.error('Error al obtener recetas favoritas:', error);
      return [];
    }
  }
  
  
  
  // Actualizar una receta con imagen opcional
  async updateReceta(id: string, data: any, imageFile?: File): Promise<void> {
    try {
      if (imageFile) {
        data.imageUrl = await this.uploadImage(imageFile);
      }
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
