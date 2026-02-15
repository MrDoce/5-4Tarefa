import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  
  constructor() {
    this.socket = io('http://localhost:3000');
    
    this.socket.on('notification', (notification: Notification) => {
      const current = this.notifications$.value;
      this.notifications$.next([notification, ...current]);
    });
  }
  
  getNotifications(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }
  
  sendNotification(title: string, message: string, type: string = 'info') {
    fetch('http://localhost:3000/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, message, type })
    });
  }
}
