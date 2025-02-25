import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Firestore, collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';

export interface CollectionChange<T> {
  type: 'added' | 'modified' | 'removed';
  id: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreSubscriptionService<T> implements OnDestroy {
  private subscriptions: Map<string, Subject<CollectionChange<T>>> = new Map();
  private unsubscribeFunctions: Map<string, () => void> = new Map();

  constructor(@Inject(Firestore) private firestore: Firestore) {}

  subscribeToCollection(collectionName: string): Observable<CollectionChange<T>> {
    if (this.subscriptions.has(collectionName)) {
      return this.subscriptions.get(collectionName)!.asObservable();
    }

    const subject = new Subject<CollectionChange<T>>();
    this.subscriptions.set(collectionName, subject);

    const colRef = collection(this.firestore, collectionName);

    // ✅ Suscribirse a Firestore en tiempo real
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        snapshot.docChanges().forEach(change => {
          const changeData: CollectionChange<T> = {
            type: change.type as 'added' | 'modified' | 'removed',
            id: change.doc.id
          };

          if (change.type !== 'removed') {
            changeData.data = { id: change.doc.id, ...change.doc.data() } as T;
          }

          // 📌 Emitir cambios en una nueva referencia para que Angular lo detecte
          subject.next({ ...changeData });
        });
      },
      error => {
        console.error(`Error en la suscripción a ${collectionName}:`, error);
        subject.error(error);
      }
    );

    this.unsubscribeFunctions.set(collectionName, unsubscribe);
    return subject.asObservable();
  }

  unsubscribeFromCollection(collectionName: string): void {
    if (this.unsubscribeFunctions.has(collectionName)) {
      this.unsubscribeFunctions.get(collectionName)!();
      this.unsubscribeFunctions.delete(collectionName);
    }

    if (this.subscriptions.has(collectionName)) {
      this.subscriptions.get(collectionName)!.complete();
      this.subscriptions.delete(collectionName);
    }
  }

  ngOnDestroy() {
    this.unsubscribeFunctions.forEach(unsub => unsub());
    this.subscriptions.forEach(subject => subject.complete());
    this.unsubscribeFunctions.clear();
    this.subscriptions.clear();
  }
}
