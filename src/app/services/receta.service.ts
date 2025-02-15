import { Injectable } from '@angular/core';
import { collection, addDoc, updateDoc, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { Receta } from '../models/receta.model';
import { Observable } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import { db } from '../app.module'; // ✅ Usar la instancia ya inicializada

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private recetasCollection = collection(db, 'recetas'); // ✅ Usa db en lugar de Firestore

  constructor() {}

  getRecetas(): Observable<Receta[]> {
    return collectionData(this.recetasCollection, { idField: 'id' }) as Observable<Receta[]>;
  }

  async addReceta(receta: Receta) {
    return await addDoc(this.recetasCollection, receta);
  }

  async updateReceta(id: string, receta: Partial<Receta>) {
    const recetaDoc = doc(db, `recetas/${id}`);
    return await updateDoc(recetaDoc, receta);
  }

  async deleteReceta(id: string) {
    const recetaDoc = doc(db, `recetas/${id}`);
    return await deleteDoc(recetaDoc);
  }

  async uploadImage(file: File, recetaId: string): Promise<string> {
    const filePath = `recetas/${recetaId}_${file.name}`;
    const storageRef = ref(getStorage(), filePath);
    
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}
