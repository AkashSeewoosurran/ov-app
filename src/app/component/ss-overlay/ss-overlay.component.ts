import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest} from 'rxjs';
import {
  PlayerInfoList,
  PlayerStatus,
} from 'src/app/shared/models/playerInfo.model';
import {
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
  localTeamInfo: LocalTeamInfo[] = [];
  teamInfoList: TeamInfoList[] = [];
  teamInfo: LocalTeamInfo | undefined;
  top5boolean: boolean = false;

  lstTestArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private service: PubgmDataService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.service.getLocalTeamInfo().subscribe((res) => {
      this.localTeamInfo = res;
    });

    // interval(2000).subscribe(() => {
    //   this.testFilter();
    // });

    combineLatest([
      this.service.getTeamInfoList(),
      this.service.getPlayerInfoList(),
    ]).subscribe(([teamInfoList, playerInfoList]) => {
      this.filterTill5Teams(teamInfoList);
      this.assignLogoToPlayersAndSort(playerInfoList, this.localTeamInfo);
      this.AddPlayerStatusToTeamInfoList(
        this.assignLogoToTeamsAndSort(teamInfoList, this.localTeamInfo),
        playerInfoList
      );
    });
  }

  assignLogoToPlayersAndSort(
    res: PlayerInfoList[],
    localTeamInfo: LocalTeamInfo[]
  ): void {
    res.forEach((player: PlayerInfoList) => {
      this.teamInfo = localTeamInfo.find(
        (localTeam: LocalTeamInfo) => localTeam.teamName === player.teamName
      );
      player.picUrl = `assets/Logo/${player.teamName}.png`;
    });
    this.sharedService.updatePlayerInfoList(res);
  }

  filterTill5Teams(teamInfoList: TeamInfoList[]): void {
    const filteredTeamInfoList = teamInfoList.filter(
      (teams) => teams.liveMemberNum > 0
    );
    this.top5boolean = filteredTeamInfoList.length > 5;
  }

  assignLogoToTeamsAndSort(
    res: TeamInfoList[],
    localTeamInfo: LocalTeamInfo[]
  ): TeamInfoList[] {
    res.forEach((team: TeamInfoList) => {
      this.teamInfo = localTeamInfo.find(
        (localTeam: LocalTeamInfo) =>
          localTeam.teamName === team.teamName ||
          localTeam.teamId === team.teamId
      );
      if (this.teamInfo) {
        team.teamTag = this.teamInfo.teamTag;
      } else {
        team.teamTag = team.teamName.slice(0, 4);
      }
      team.logoPicUrl = `${this.teamInfo?.teamLogo}`;
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

  AddPlayerStatusToTeamInfoList(
    teamInfoList: TeamInfoList[],
    playerInfoList: PlayerInfoList[]
  ): void {
    teamInfoList.forEach((team: TeamInfoList) => {
      team.players = [];
      playerInfoList.forEach((player: PlayerInfoList) => {
        const playerStatus: PlayerStatus = {
          playerName: player.playerName,
          teamName: player.teamName,
          uId: player.uId,
          rank: player.rank,
          isFiring: player.isFiring,
          liveState: player.liveState,
          isOutsideBlueCircle: player.isOutsideBlueCircle,
        };
        if (player.teamId === team.teamId) {
          team.players.push(playerStatus);
        }
      });
      team.players = team.players.slice(0, 5);
    });
    this.sharedService.updateTeamInfoList(teamInfoList.slice(0, 16));
  }
}
