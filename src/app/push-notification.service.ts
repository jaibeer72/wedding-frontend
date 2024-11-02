import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private readonly VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY_HERE';
  private readonly API_ENDPOINT = 'https://your-spring-boot-api.com/subscribe';

  constructor(
    private swPush: SwPush,
    private http: HttpClient
  ) {}

  // Subscribe to push notifications and send the subscription to the backend
  subscribeToNotifications(): Observable<any> {
    return new Observable(observer => {
      if (!this.swPush.isEnabled) {
        observer.error(new Error('Notifications are not enabled'));
        return;
      }

      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => this.sendSubscriptionToServer(sub))  // Send subscription to backend
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          console.error('Subscription failed:', error);
          observer.error(error);
        });
    });
  }

  // Send the subscription object to your backend
  private sendSubscriptionToServer(subscription: PushSubscription): Promise<any> {
    return this.http.post(this.API_ENDPOINT, subscription).toPromise();
  }

  // Listen for incoming push notifications
  setupNotificationListener() {
    // Listen for push messages
    this.swPush.messages.subscribe((message: any) => {
      console.log('Received push notification:', message);
      this.showNotification(message);  // Display the notification
    });

    // Handle notification clicks
    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      console.log('Notification clicked:', action, notification);
      // Navigate or handle click event
    });
  }

  // Show a notification (used when handling received messages)
  private showNotification(message: any) {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        try {
          if (permission === 'granted') {
            const noti = new Notification(message.title, {
              body: message.body,
              icon: 'https://placehold.co/128x128.png',
              badge:'https://placehold.co/128x128.png'
            });
          }
        }
        catch (ex){
          console.log(ex)
        }
      });
    }
  }

  // Manually trigger a dummy notification for testing purposes
  triggerDummyNotification() {
    const dummyMessage = {
      title: 'Test Notification',
      body: 'This is a test notification'
    };
    this.showNotification(dummyMessage);
  }
}
