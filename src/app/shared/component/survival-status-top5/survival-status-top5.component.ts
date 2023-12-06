import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { SharedService } from '../../services/shared-service.service';
import { TeamInfoList } from '../../models/teamInfo.model';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-survival-status-top5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survival-status-top5.component.html',
  styleUrls: ['./survival-status-top5.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [animate('0.5s ease', style({ opacity: 0 }))]),
    ]),
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
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('up => down', animate('0.5s ease-out')),
      transition('down => up', animate('0.5s ease-in')),
    ]),
  ],
})
export class SurvivalStatusTop5Component implements OnInit {
  lstTop5Teams: TeamInfoList[] = [];
  top5boolean: boolean;

  constructor(
    private service: PubgmDataService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.teamInfoList$.subscribe((teamInfoList) => {
      this.lstTop5Teams = teamInfoList
        .sort((a, b) => b.killNum - a.killNum)
        .filter((teams) => teams.liveMemberNum > 0)
        .slice(0, 5);
      setTimeout(() => {
        this.filterTill5Teams(teamInfoList);
      }, 500);
    });
  }

  trackByFn(index: number, item: TeamInfoList): number {
    return item.teamId; // a unique identifier property name
  }

  filterTill5Teams(teamInfoList: TeamInfoList[]): void {
    const filteredTeamInfoList = teamInfoList.filter(
      (teams) => teams.liveMemberNum > 0
    );
    this.top5boolean = filteredTeamInfoList.length > 5;
  }
}
