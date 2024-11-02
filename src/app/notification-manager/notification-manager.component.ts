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
  isSubscribed = false;
  message = '';

  constructor(private pushNotificationService: PushNotificationService) {}

  ngOnInit() {
    this.pushNotificationService.setupNotificationListener();
    this.pushNotificationService.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.pushNotificationService.subscribeToNotifications()
      .subscribe({
        next: ()=>{
          this.isSubscribed = true;
          this.message = 'Successfully subscribed to notifications!';
        },
        error: (err)=>{
          console.log(err.message);
        }
      });
  }

  triggerDummyNotification() {
    this.pushNotificationService.triggerDummyNotification();
  }
}
