import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamInfoList } from '../models/teamInfo.model';
import { PlayerInfoList } from '../models/playerInfo.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
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
}
