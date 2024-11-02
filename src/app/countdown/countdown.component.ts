import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() weddingDate: string = '2024-12-06T00:00:00';
  timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private timer: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    this.stopCountdown();
  }

  private startCountdown() {
    this.calculateTimeLeft();
    this.timer = setInterval(() => this.calculateTimeLeft(), 1000);
  }

  private stopCountdown() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private calculateTimeLeft() {
    const targetDate = new Date(this.weddingDate).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      this.timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    } else {
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      this.stopCountdown();
    }
  }
}
