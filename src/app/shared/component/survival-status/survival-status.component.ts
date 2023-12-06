import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { LocalTeamInfo, TeamInfoList } from '../../models/teamInfo.model';
import { Observable, combineLatest, delay } from 'rxjs';
import { PlayerInfoList, PlayerStatus } from '../../models/playerInfo.model';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { SharedService } from '../../services/shared-service.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-survival-status',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  exportAs: 'appSurvivalStatus',
  templateUrl: './survival-status.component.html',
  styleUrls: ['./survival-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('slideInOutAnimationRight', [
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
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in')),
    ]),
  ],
})
export class SurvivalStatusComponent implements OnInit {
  displayedColumns: string[] = [
    'logoPicUrl',
    'teamTag',
    'killNum',
    'liveMemberNum',
  ];
  top5Columns: string[] = ['playerName', 'rank', 'damage'];
  dataSource: MatTableDataSource<TeamInfoList>;
  top5boolean: boolean;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.teamInfoList$.subscribe({
      next: (teamInfoList: TeamInfoList[]) => {
        this.dataSource = new MatTableDataSource(teamInfoList.slice(0, 16));
        this.filterTill5Teams(teamInfoList);
      },
    });
  }

  filterTill5Teams(teamInfoList: TeamInfoList[]): void {
    const filteredTeamInfoList = teamInfoList.filter(
      (teams) => teams.liveMemberNum > 0
    );
    this.top5boolean = filteredTeamInfoList.length > 5;
  }

  getRankCellBackgroundColor(element: any): string {
    return element.liveMemberNum < 1
      ? '#484849'
      : element.players.some(
          (player: { isOutsideBlueCircle: any }) => player.isOutsideBlueCircle
        ) && element.liveMemberNum > 1
      ? '#44bae9'
      : '#131213';
  }
}
