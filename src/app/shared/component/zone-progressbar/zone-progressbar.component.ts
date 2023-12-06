import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  interval,
  of,
  takeWhile,
  timer,
} from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { CircleInfo } from '../../models/circleInfo.model';

@Component({
  selector: 'app-zone-progressbar',
  standalone: true,
  imports: [CommonModule, AppCustomMaterialModule],
  templateUrl: './zone-progressbar.component.html',
  styleUrls: ['./zone-progressbar.component.scss'],
  animations: [
    trigger('slideUpDown', [
      state(
        'up',
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'down',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('up <=> down', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class ZoneProgressbarComponent implements OnInit, OnDestroy {
  value: number = 100;
  timeLeft: number = 0;
  private subscription: Subscription;
  circleInfo: CircleInfo;
  currentCircleInfo: CircleInfo = {
    GameTime: 160,
    CircleStatus: 0,
    CircleIndex: 0,
    Counter: 0,
    MaxTime: 0,
  };

  progressBoolean: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  timerStarted: boolean = false;
  private alive: boolean = true;

  constructor(private service: PubgmDataService) {}

  ngOnInit(): void {
    this.service.getCircleInfo().subscribe({
      next: (circleInfo: CircleInfo) => {
        this.circleInfo = circleInfo;
      },
    });

    interval(1000).subscribe(() => {
      console.log(this.circleInfo.GameTime);
      this.currentCircleInfo.GameTime = this.circleInfo.GameTime++;
      switch (true) {
        case this.currentCircleInfo.GameTime >= 170 &&
          this.currentCircleInfo.GameTime <= 185:
          this.currentCircleInfo.CircleIndex = 1;
          this.progressBoolean.next(true);
          break;
        case this.currentCircleInfo.GameTime >= 190 &&
          this.currentCircleInfo.GameTime <= 205:
          this.currentCircleInfo.CircleIndex = 2;
          this.progressBoolean.next(true);
          break;
        case this.currentCircleInfo.GameTime <= 650:
          this.currentCircleInfo.CircleIndex = 3;
          break;
        case this.currentCircleInfo.GameTime <= 770:
          this.currentCircleInfo.CircleIndex = 4;
          break;
        case this.currentCircleInfo.GameTime <= 890:
          this.currentCircleInfo.CircleIndex = 5;
          break;
        case this.currentCircleInfo.GameTime <= 980:
          this.currentCircleInfo.CircleIndex = 6;
          break;
        case this.currentCircleInfo.GameTime <= 1070:
          this.currentCircleInfo.CircleIndex = 7;
          break;
        case this.currentCircleInfo.GameTime <= 1130:
          this.currentCircleInfo.CircleIndex = 8;
          break;
      }
    });

    this.progressBoolean
      .pipe(takeWhile(() => this.alive))
      .subscribe((progress) => {
        if (progress && !this.timerStarted) {
          this.startTimer();
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startTimer() {
    this.timerStarted = true;
    const timerObservable = timer(0, 150);
    this.subscription = timerObservable.subscribe((val: number) => {
      this.value = 100 - val;
      this.timeLeft = Math.round(15 - (val * 150) / 1000); // round off
      if (val == 100) {
        // after 15 seconds (100 * 150ms = 15s), val will be 100
        this.timerStarted = false;
        this.progressBoolean.next(false); // emit false
        this.subscription.unsubscribe();
        setTimeout(() => {
          this.value = 100; // reset this.value to 100 after a delay
        }, 500); // adjust this delay as needed
      }
    });
  }
}
