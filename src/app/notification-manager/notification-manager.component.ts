import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from '../push-notification.service';

@Component({
  selector: 'app-notification-manager',
  standalone: true,
  imports: [],
  templateUrl: './notification-manager.component.html',
  styleUrl: './notification-manager.component.css'
})
export class NotificationManagerComponent implements OnInit {
  constructor(private pushNotificationService: PushNotificationService) {}

  ngOnInit() {
    this.pushNotificationService.setupNotificationListener()
        .then(() => {
          console.log('Notification listener set up');
        })
        .catch(err => {
          console.error('Error setting up notification listener:', err);
        });
  }
}