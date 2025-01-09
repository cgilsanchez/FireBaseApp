import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(); // Inicializa Firebase Auth

  constructor() {}

  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Inicio de sesión exitoso:', userCredential.user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}
