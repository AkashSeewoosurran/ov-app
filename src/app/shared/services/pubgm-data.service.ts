import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  forkJoin,
  from,
  interval,
  map,
  of,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  LocalTeamInfo,
  TeamInfoList,
  ExcelTeamInfo,
  lstTeamInfo,
} from '../models/teamInfo.model';
import {
  ObsPlayer,
  PlayerInfoList,
  lstPlayerInfo,
} from '../models/playerInfo.model';
import { CircleZone } from '../models/circleInfo.model';
import { MatchStandingInfo } from '../models/matchStanding.model';

@Injectable({
  providedIn: 'root',
})
export class PubgmDataService {
  private service = environment.apiUrl;
  private localService = environment.localUrl;
  private matchService = environment.matchUrl;

  constructor(public http: HttpClient) {}

  getTeamInfoList(): Observable<TeamInfoList[]> {
    return interval(1000).pipe(
      switchMap(() => {
        return forkJoin({
          teamInfoListArray: this.http.get<TeamInfoList[]>(
            `${this.localService}/getteaminfolist`
          ),
          localTeamInfo: this.http.get<LocalTeamInfo[]>(
            `${this.localService}/getteaminfo`
          ),
        });
      }),
      map(({ teamInfoListArray, localTeamInfo }) => {
        return teamInfoListArray.map((teamInfoList) => {
          const matchingTeam = localTeamInfo.find(
            (team) => team.teamName === teamInfoList.teamName
          );

          if (matchingTeam) {
            teamInfoList.logoPicUrl = matchingTeam.teamLogo;
          }

          return teamInfoList;
        });
      })
    );
  }

  // getTeamInfoList(): Observable<lstTeamInfo> {
  //   return interval(1000).pipe(
  //     switchMap(() => {
  //       return this.http.get<lstTeamInfo>(
  //         `${this.service}/getteaminfolist`
  //       );
  //     })
  //   );
  // }

  //local use without api
  getPlayerInfoList(): Observable<PlayerInfoList[]> {
    return interval(1000).pipe(
      switchMap(() => {
        return forkJoin({
          playerInfoListArray: this.http.get<PlayerInfoList[]>(
            `${this.localService}/gettotalplayerlist`
          ),
          localTeamInfo: this.http.get<LocalTeamInfo[]>(
            `${this.localService}/getteaminfo`
          ),
        });
      }),
      map(({ playerInfoListArray, localTeamInfo }) => {
        return playerInfoListArray.map((playerInfoList) => {
          // Assign a default value to an attribute
          playerInfoList.character = 'assets/players/default.png';
          // Add the localteamInfo.teamLogo to the playerInfoList.picUrl
          const matchingTeam = localTeamInfo.find(
            (team) => team.teamName === playerInfoList.teamName
          );

          if (matchingTeam) {
            playerInfoList.picUrl = matchingTeam.teamLogo;
          }

          return playerInfoList;
        });
      })
    );
  }

  // getPlayerInfoList(): Observable<lstPlayerInfo> {
  //   return interval(1000).pipe(
  //     switchMap(() => {
  //       return this.http.get<lstPlayerInfo>(
  //         `${this.localService}/gettotalplayerlist`
  //       );
  //     }),
  //     map((lstPlayerInfo: lstPlayerInfo) => {
  //       lstPlayerInfo.playerInfoList = lstPlayerInfo.playerInfoList.map(playerInfoList => {
  //         // Assign a default value to an attribute
  //         playerInfoList.character = 'assets/players/transparent.png';
  //         return playerInfoList;
  //       });
  //       return lstPlayerInfo;
  //     })
  //   );
  // }

  getLocalTeamInfo(): Observable<LocalTeamInfo[]> {
    return this.http.get<LocalTeamInfo[]>(`${this.localService}/getteaminfo`);
  }

  getObservingPlayer(): Observable<ObsPlayer> {
    return interval(1000).pipe(
      switchMap(() => {
        return this.http.get<ObsPlayer>(
          `${this.localService}/getobservingplayer`
        );
      })
    );
  }

  getCircleInfo(): Observable<CircleZone> {
    return interval(1000).pipe(
      switchMap(() => {
        return this.http.get<CircleZone>(`${this.service}/getcircleinfo`);
      })
    );
  }

  corsTest(): Observable<TeamInfoList[]> {
    return interval(1000).pipe(
      switchMap(() => {
        return this.http.get<TeamInfoList[]>(`${this.service}/getteaminfolist`);
      })
    );
  }

  saveExcelTeamInfoList(excelData: ExcelTeamInfo[]) {
    return from(excelData).pipe(
      concatMap((team) =>
        this.http.post(`${this.localService}/localteaminfo`, team)
      )
    );
  }

  getExcelTeamInfoList(): Observable<ExcelTeamInfo[]> {
    return this.http.get<ExcelTeamInfo[]>(`${this.localService}/localteaminfo`);
  }

  // Function to delete a team by its ID
  deleteTeam(teamId: number): Observable<any> {
    const url = `${this.localService}/localteaminfo/${teamId}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error(`Error deleting team with ID ${teamId}:`, error);
        return of(null);
      })
    );
  }

  // Function to delete multiple teams by their IDs sequentially
  deleteTeamsSequentially(teamIds: number[]): Observable<any> {
    return of(null).pipe(concatMap(() => this.deleteTeamsRecursively(teamIds)));
  }

  private deleteTeamsRecursively(teamIds: number[]): Observable<any> {
    if (teamIds.length === 0) {
      return of(null); // No more teams to delete
    }

    const teamId = teamIds.shift(); // Take the first teamId and remove it from the array
    if (teamId === undefined) {
      return of(null); // Handle the case when teamId is undefined
    }

    return this.deleteTeam(teamId).pipe(
      concatMap(() => this.deleteTeamsRecursively(teamIds))
    );
  }

  saveMatchStanding(matchStanding: MatchStandingInfo[], matchId: number) {
    return from(matchStanding).pipe(
      concatMap((team) =>
        this.http.post(`${this.matchService}/matchstanding${matchId}`, team)
      )
    );
  }

  getMatchStanding(matchId: number): Observable<MatchStandingInfo[]> {
    return this.http.get<MatchStandingInfo[]>(
      `${this.matchService}/matchstanding${matchId}?_sort=totalPoints&_order=desc`
    );
  }
}
