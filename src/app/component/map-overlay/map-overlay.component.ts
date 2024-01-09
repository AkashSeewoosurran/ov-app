import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CircleZone } from 'src/app/shared/models/circleInfo.model';
import { PlayerInfoList } from 'src/app/shared/models/playerInfo.model';
import { TeamInfoList } from 'src/app/shared/models/teamInfo.model';
import { PubgmDataService } from 'src/app/shared/services/pubgm-data.service';
import { SharedService } from 'src/app/shared/services/shared-service.service';

@Component({
  selector: 'app-map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.scss'],
})
export class MapOverlayComponent implements OnInit {
  teamInfoList: TeamInfoList[] = [];
  leftTeamInfoList: TeamInfoList[] = [];
  rightTeamInfoList: TeamInfoList[] = [];
  playerInfoList: PlayerInfoList[] = [];
  circleInfo: CircleZone;

  constructor(
    private service: PubgmDataService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.service.getTeamInfoList(),
      this.service.getPlayerInfoList(),
      // this.service.getCircleInfo(),
    ]).subscribe(([teamInfoList, playerInfoList]) => {
      this.teamInfoList = this.sharedService.AddPlayerStatusToTeamInfoList(
        teamInfoList,
        playerInfoList
      );
      // this.circleInfo = circleInfo;
      this.playerInfoList = playerInfoList;
      this.leftTeamInfoList = this.teamInfoList.slice(0, 8);
      this.rightTeamInfoList = this.teamInfoList.slice(8, 16);
    });
  }

  // ngOnInit(): void {
  //   combineLatest([
  //     this.service.getTeamInfoList(),
  //     this.service.getPlayerInfoList(),
  //     // this.service.getCircleInfo(),
  //   ]).subscribe(([teamInfoList, playerInfoList]) => {
  //     this.teamInfoList = this.sharedService.AddPlayerStatusToTeamInfoList(
  //       teamInfoList.teamInfoList,
  //       playerInfoList.playerInfoList
  //     );
  //     // this.circleInfo = circleInfo;
  //     this.playerInfoList = playerInfoList.playerInfoList;
  //     this.leftTeamInfoList = this.teamInfoList.slice(0, 8);
  //     this.rightTeamInfoList = this.teamInfoList.slice(8, 16);
  //   });
  // }

  getTeamsAliveCount(): number {
    return this.teamInfoList.filter((team) => team.liveMemberNum > 0).length;
  }

  getPlayersAliveCount(): number {
    return this.playerInfoList.filter(
      (player) => player.liveState !== 5 && player.liveState !== 6
    ).length;
  }

  getCircleStage(): number {
    return this.circleInfo.circleInfo.CircleIndex
      ? this.circleInfo.circleInfo.CircleIndex
      : 0;
  }
}
