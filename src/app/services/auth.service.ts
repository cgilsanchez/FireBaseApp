import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updateProfile } from 'firebase/auth';
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

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable().pipe(map(user => !!user));
  }

  getCurrentUser(): Observable<User | null> {
    return this.authState.asObservable();
  }

  // 📌 **Registrar usuario con nombre**
  async register(email: string, password: string, displayName: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(userCredential.user, { displayName }); // 🔥 Guardar nombre en Firebase
    this.authState.next(userCredential.user);
  }

  async login(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    this.authState.next(userCredential.user);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.authState.next(null);
  }

  async updateUserProfile(name: string): Promise<void> {
    if (this.auth.currentUser) {
      await updateProfile(this.auth.currentUser, { displayName: name });
      this.authState.next({ ...this.auth.currentUser });
    }
  }
}
