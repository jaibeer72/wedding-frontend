import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})
export class PushNotificationService {
    private hubConnection: signalR.HubConnection;

    constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5034/notificationHub') // Update with your backend URL
            .build();
    }

    setupNotificationListener(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.hubConnection.on('ReceiveNotification', (message) => {
                console.log('Notification received:', message);
                this.showNotification(message.title, message.message);
            });

            this.hubConnection.start()
                .then(() => {
                    console.log('Connected to SignalR hub');
                    this.requestNotificationPermission();
                    resolve();
                })
                .catch(err => {
                    console.error('Error connecting to SignalR hub:', err);
                    reject(err);
                });
        });
    }

    private requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                } else {
                    console.log('Notification permission denied.');
                }
            });
        }
    }

    private showNotification(title: string, message: string) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, { body: message });
        }
    }
}