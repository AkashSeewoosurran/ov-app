import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import {
  PlayerInfoList,
  PlayerStatus,
} from 'src/app/shared/models/playerInfo.model';
import {
  ExcelTeamInfo,
  LocalTeamInfo,
  TeamInfoList,
} from 'src/app/shared/models/teamInfo.model';
import { PubgmDataService } from 'src/app/shared/services/pubgm-data.service';
import { SharedService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-ss-overlay',
  templateUrl: './ss-overlay.component.html',
  styleUrls: ['./ss-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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
    trigger('slideInOutAnimationRight', [
      state(
        'in',
        style({
          transform: 'translateX(-100%)',
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
export class SsOverlayComponent implements OnInit {
  localTeamInfo: ExcelTeamInfo[] = [];
  teamInfoList: TeamInfoList[] = [];
  teamInfo: ExcelTeamInfo | undefined;
  top5boolean: boolean = false;

  lstTestArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private service: PubgmDataService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.service.getExcelTeamInfoList().subscribe((res) => {
      this.localTeamInfo = res;
    });

    combineLatest([
      this.service.getTeamInfoList(),
      this.service.getPlayerInfoList(),
    ]).subscribe(([teamInfoList, playerInfoList]) => {
      this.assignLogoToPlayersAndSort(playerInfoList, this.localTeamInfo);

      this.sharedService.AddPlayerStatusToTeamInfoList(
        this.assignLogoToTeamsAndSort(teamInfoList, this.localTeamInfo),
        playerInfoList
      );
    });
  }

  // ngOnInit(): void {
  //   this.service.getExcelTeamInfoList().subscribe((res) => {
  //     this.localTeamInfo = res;
  //   });

  //   combineLatest([
  //     this.service.getTeamInfoList(),
  //     this.service.getPlayerInfoList(),
  //   ]).subscribe(([teamInfoList, playerInfoList]) => {
  //     this.assignLogoToPlayersAndSort(
  //       playerInfoList.playerInfoList,
  //       this.localTeamInfo
  //     );

  //     this.sharedService.AddPlayerStatusToTeamInfoList(
  //       this.assignLogoToTeamsAndSort(
  //         teamInfoList.teamInfoList,
  //         this.localTeamInfo
  //       ),
  //       playerInfoList.playerInfoList
  //     );
  //   });
  // }

  assignLogoToPlayersAndSort(
    res: PlayerInfoList[],
    localTeamInfo: ExcelTeamInfo[]
  ): void {
    res.forEach((player: PlayerInfoList) => {
      this.teamInfo = localTeamInfo.find(
        (localTeam: ExcelTeamInfo) => localTeam.teamName === player.teamName
      );
      if (this.teamInfo) {
        player.picUrl = this.teamInfo.teamLogo64;
      }
    });
    this.sharedService.updatePlayerInfoList(res);
  }

  assignLogoToTeamsAndSort(
    res: TeamInfoList[],
    localTeamInfo: ExcelTeamInfo[]
  ): TeamInfoList[] {
    res.forEach((team: TeamInfoList) => {
      this.teamInfo = localTeamInfo.find(
        (localTeam: ExcelTeamInfo) =>
          localTeam.teamName === team.teamName ||
          localTeam.teamId === team.teamId
      );
      if (this.teamInfo) {
        team.teamTag = this.teamInfo.teamTag;
      } else {
        team.teamTag = team.teamName.slice(0, 4);
      }
      if (this.teamInfo) {
        team.logoPicUrl = `${this.teamInfo.teamLogo}`;
      }
    });
    return res.sort((a: any, b: any) => {
      if (a.liveMemberNum === 0 && b.liveMemberNum !== 0) {
        return 1;
      } else if (a.liveMemberNum !== 0 && b.liveMemberNum === 0) {
        return -1;
      } else {
        return b.killNum - a.killNum;
      }
    });
  }
}
