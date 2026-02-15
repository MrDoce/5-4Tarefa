import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  notifications = signal<Notification[]>([]);
  showToast = signal(false);
  toastMessage = signal<Notification | null>(null);

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(notifs => {
      this.notifications.set(notifs);
      if (notifs.length > 0) {
        this.toastMessage.set(notifs[0]);
        this.showToast.set(true);
        setTimeout(() => this.showToast.set(false), 3000);
      }
    });
  }

  testNotification() {
    const types = ['info', 'success', 'warning', 'error'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    this.notificationService.sendNotification(
      `Notificação ${randomType}`,
      `Esta é uma mensagem de teste do tipo ${randomType}`,
      randomType
    );
  }
}
