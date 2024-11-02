import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NotificationManagerComponent} from "./notification-manager/notification-manager.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'wedding-frontend';

  ngOnInit(): void {
  }


}
