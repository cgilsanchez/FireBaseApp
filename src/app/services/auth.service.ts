import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private authState = new BehaviorSubject<User | null>(null);

  constructor() {
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.authState.next(JSON.parse(savedUser));
    }

    
    onAuthStateChanged(this.auth, (user) => {
      this.authState.next(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); 
      } else {
        localStorage.removeItem('user'); 
      }
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable().pipe(map(user => !!user));
  }

  getCurrentUser(): Observable<User | null> {
    return this.authState.asObservable();
  }

  async register(email: string, password: string, displayName: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    this.authState.next(userCredential.user);
    localStorage.setItem('user', JSON.stringify(userCredential.user));
  }

  async login(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    this.authState.next(userCredential.user);
    localStorage.setItem('user', JSON.stringify(userCredential.user));
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.authState.next(null);
    localStorage.removeItem('user');
  }
}
