import { Injectable } from '@angular/core';
import { PushNotifications, Token, ActionPerformed, PushNotificationSchema } from '@capacitor/push-notifications';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
  private messaging = getMessaging(initializeApp(environment.firebaseConfig));

  constructor() {}

  async requestPermission(): Promise<void> {
    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        console.log('Permiso concedido para notificaciones');
        this.registerPush();
      } else {
        console.log('Permiso denegado');
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
    }
  }

  async registerPush(): Promise<void> {
    try {
      await PushNotifications.requestPermissions();
      await PushNotifications.register();

      PushNotifications.addListener('registration', (token: Token) => {
        
        localStorage.setItem('pushToken', token.value);
      });

      PushNotifications.addListener('registrationError', (error: any) => {
        
      });

      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        
        alert(`${notification.title}: ${notification.body}`);
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
        console.log('📌 Acción de notificación:', action);
      });

      this.getFirebaseToken();
    } catch (error) {
      console.error('Error en la configuración de push notifications:', error);
    }
  }

  async getFirebaseToken(): Promise<void> {
    try {
      const token = await getToken(this.messaging, { vapidKey: environment.firebaseConfig.vapidKey });
      if (token) {
        localStorage.setItem('pushToken', token);
      } else {
        console.warn('No se pudo obtener el token.');
      }
    } catch (error) {
      console.error('Error al obtener el token de Firebase:', error);
    }
  }
}
