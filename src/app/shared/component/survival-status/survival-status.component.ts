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
import { TeamInfoList } from '../../models/teamInfo.model';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { SharedService } from '../../services/shared-service.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';

@Component({
  selector: 'app-survival-status',
  standalone: true,
  imports: [MatTableModule, CommonModule, AppCustomMaterialModule],
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
  showSurvivalStatus: boolean;

  constructor(
    private service: PubgmDataService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.service.getDashboardData().subscribe((data) => {
      this.showSurvivalStatus = data[1].toggleValue;
    });

    this.sharedService.teamInfoList$.subscribe({
      next: (teamInfoList: TeamInfoList[]) => {
        // teamInfoList.sort((a: any, b: any) => {
        //   if (a.liveMemberNum === 0 && b.liveMemberNum !== 0) {
        //     return 1;
        //   }
        //   if (a.liveMemberNum !== 0 && b.liveMemberNum === 0) {
        //     return -1;
        //   }
        //   // If both teams have liveMemberNum > 0 or both have liveMemberNum = 0, sort by killNum
        //   return b.killNum - a.killNum;
        // });
        this.dataSource = new MatTableDataSource(teamInfoList.slice(0, 16));

        this.filterTill5Teams(teamInfoList);
      },
    });
  }

  filterTill5Teams(teamInfoList: TeamInfoList[]): void {
    const filteredTeamInfoList = teamInfoList.filter(
      (teams) => teams.liveMemberNum > 0
    );
    this.showSurvivalStatus = filteredTeamInfoList.length > 10;
    console.log('showSurvivalStatus', this.showSurvivalStatus);
  }

  // getRankCellBackgroundColor(element: TeamInfoList): string {
  //   return element.liveMemberNum < 1
  //     ? '#484849'
  //     : element.players.some(
  //         (player: { isOutsideBlueCircle: boolean }) =>
  //           player.isOutsideBlueCircle
  //       ) && element.liveMemberNum > 1
  //     ? '#44bae9'
  //     : '#0a0c12';
  // }

  getRankCellClass(element: TeamInfoList): string {
    if (element.liveMemberNum < 1) {
      return 'eliminated';
    } else if (
      element.players.some(
        (player: { isOutsideBlueCircle: boolean; liveState: number }) =>
          player.isOutsideBlueCircle && player.liveState == 0
      ) &&
      element.liveMemberNum > 1
    ) {
      return 'outside-zone';
    } else {
      return 'normal';
    }
  }

  // getPlayerColor(player: any): string {
  //   if (player.liveState == 5) {
  //     return '#808080';
  //   } else if (player.liveState == 4) {
  //     return '#ff0000';
  //   } else {
  //     if (player.health > 70) {
  //       return '#008000';
  //     } else if (player.health > 40 && player.health <= 70) {
  //       return '#ffff00';
  //     } else if (player.health > 0 && player.health <= 39) {
  //       return '#ff0000';
  //     }
  //   }
  //   return '#ff0000'; // Default color if none of the conditions match
  // }

  getPlayerClass(player: any): string {
    if (player.liveState === 5) {
      return 'black-bar';
    } else if (player.liveState === 4) {
      return 'red-bar';
    } else if (player.health > 70) {
      return 'green';
    } else if (player.health > 40 && player.health <= 70) {
      return 'yellow';
    } else if (player.health > 0 && player.health <= 40) {
      return 'red';
    } else {
      return ''; // Default or no class if no conditions are met
    }
  }
}
