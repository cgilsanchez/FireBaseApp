import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// 🔥 Pipes


// 🔥 Firebase y Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { environment } from '../environments/environment';

// Inicialización de Firebase
const app = initializeApp(environment.firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: Firestore, useValue: db }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
