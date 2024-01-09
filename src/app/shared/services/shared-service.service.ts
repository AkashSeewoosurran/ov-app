import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamInfoList } from '../models/teamInfo.model';
import { PlayerInfoList, PlayerStatus } from '../models/playerInfo.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private teamInfoListSource = new BehaviorSubject<TeamInfoList[]>([]);
  public teamInfoList$ = this.teamInfoListSource.asObservable();

  private playerInfoListSource = new BehaviorSubject<PlayerInfoList[]>([]);
  public playerInfoList$ = this.playerInfoListSource.asObservable();

  updateTeamInfoList(teamInfoList: TeamInfoList[]): void {
    this.teamInfoListSource.next(teamInfoList);
  }

  updatePlayerInfoList(playerInfoList: PlayerInfoList[]): void {
    this.playerInfoListSource.next(playerInfoList);
  }

  AddPlayerStatusToTeamInfoList(
    teamInfoList: TeamInfoList[],
    playerInfoList: PlayerInfoList[]
  ): TeamInfoList[] {
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
    this.updateTeamInfoList(teamInfoList.slice(0, 16));
    return teamInfoList;
  }
}
