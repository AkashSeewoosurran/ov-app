import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PlayerInfoList } from '../../models/playerInfo.model';
import { SharedService } from '../../services/shared-service.service';
import { PubgmDataService } from '../../services/pubgm-data.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-player-top5',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './player-top5.component.html',
  styleUrls: ['./player-top5.component.scss'],
  animations: [
    trigger('slideInOutAnimationLeft', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in')),
    ]),
  ],
})
export class PlayerTop5Component implements OnInit {
  top5Columns: string[] = ['playerName', 'rank', 'damage'];
  top5playersDamage: MatTableDataSource<PlayerInfoList>;
  showTop5: boolean = true;
  circleIndex = 0;
  maxTime = 30;
  counter = 0;
  showTop5Kills: boolean;

  constructor(
    private sharedService: SharedService,
    private service: PubgmDataService
  ) {}

  ngOnInit(): void {
    this.service.getDashboardData().subscribe((data) => {
      this.showTop5Kills = data[0].toggleValue;
    });
    this.service.getCircleInfo().subscribe((circleInfo) => {
      if (
        circleInfo.circleInfo.CircleIndex > 5 &&
        circleInfo.circleInfo.MaxTime - circleInfo.circleInfo.Counter == 20 &&
        circleInfo.circleInfo.CircleIndex !== this.circleIndex
      ) {
        this.circleIndex = circleInfo.circleInfo.CircleIndex;
        this.showTop5 = true;
        setTimeout(() => {
          this.showTop5 = false;
        }, 10000);
      }
    });

    this.sharedService.playerInfoList$.subscribe({
      next: (playerInfoList: PlayerInfoList[]) => {
        // console.log('playerinfo', playerInfoList);
        this.top5playersDamage = new MatTableDataSource(
          playerInfoList.sort((a, b) => b.damage - a.damage).slice(0, 5)
        );
      },
    });
  }

  // getCircleInfo() {
  //   return interval(1000).pipe(
  //     map(() => {
  //       this.counter++;
  //       if (this.counter % 10 === 0) {
  //         this.circleIndex++;
  //       }
  //       if (this.counter > this.maxTime) {
  //         this.counter = 0;
  //       }
  //       return {
  //         circleInfo: {
  //           CircleIndex: this.circleIndex,
  //           MaxTime: this.maxTime,
  //           Counter: this.counter,
  //         },
  //       };
  //     })
  //   );
  // }
}
