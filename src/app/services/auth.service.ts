import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private authState = new BehaviorSubject<User | null>(null);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.authState.next(user);
    });
  }

  // 📌 Devuelve si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable().pipe(map(user => !!user));
  }

  // 📌 Obtener el usuario actual
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // 📌 Registrar usuario
  async register(email: string, password: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    this.authState.next(userCredential.user);
  }

  // 📌 Iniciar sesión
  async login(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    this.authState.next(userCredential.user);
  }

  // 📌 Cerrar sesión
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.authState.next(null);
  }
}
