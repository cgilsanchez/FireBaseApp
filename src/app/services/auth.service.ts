import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(); // Inicializa Firebase Auth

  constructor() {}

  // **Registro**
  async register(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  // **Inicio de Sesión**
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario logueado:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  // **Cierre de Sesión**
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Usuario desconectado');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  // **Obtener el Usuario Actual**
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
