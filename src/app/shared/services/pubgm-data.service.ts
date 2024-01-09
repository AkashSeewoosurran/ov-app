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
  tap,
  toArray,
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
  mvpPlayer,
} from '../models/playerInfo.model';
import { CircleZone } from '../models/circleInfo.model';
import {
  MatchStandingInfo,
  OverallStandingInfo,
} from '../models/matchStanding.model';

@Injectable({
  providedIn: 'root',
})
export class PubgmDataService {
  private service = environment.apiUrl;
  private localService = environment.localUrl;
  private matchService = environment.matchUrl;
  private playerService = environment.playerUrl;

  constructor(public http: HttpClient) {}

  //use with dummy data
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
            (team) =>
              team.teamId === teamInfoList.teamId ||
              team.teamName === teamInfoList.teamName
          );

          if (matchingTeam) {
            teamInfoList.logoPicUrl = matchingTeam.teamLogo;
          }

          return teamInfoList;
        });
      })
    );
  }

  //use with live data from api
  // getTeamInfoList(): Observable<lstTeamInfo> {
  //   return interval(1000).pipe(
  //     switchMap(() => {
  //       return forkJoin({
  //         teamInfoListArray: this.http.get<lstTeamInfo>(
  //           `${this.service}/getteaminfolist`
  //         ),
  //         localTeamInfo: this.http.get<LocalTeamInfo[]>(
  //           `${this.localService}/getteaminfo`
  //         ),
  //       });
  //     }),
  //     map(({ teamInfoListArray, localTeamInfo }) => {
  //       return {
  //         teamInfoList: teamInfoListArray.teamInfoList.map((teamInfoList) => {
  //           const matchingTeam = localTeamInfo.find(
  //             (team) =>
  //               team.teamId === teamInfoList.teamId ||
  //               team.teamName === teamInfoList.teamName
  //           );

  //           if (matchingTeam) {
  //             teamInfoList.logoPicUrl = matchingTeam.teamLogo;
  //           }

  //           return teamInfoList;
  //         }),
  //       };
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
        const playerInfoList = playerInfoListArray.map((playerInfoList) => {
          // Assign a default value to an attribute
          //playerInfoList.character = 'assets/players/default.png';
          // const playerPath = `assets/players/${playerInfoList.uId}.png`;

          // this.checkImageExists(playerPath)
          //   .then(() => {
          //     playerInfoList.character = playerPath; // Remove optional chaining and nullish coalescing operator
          //   })
          //   .catch(() => {
          //     playerInfoList.character = 'assets/players/default.png'; // Update the property assignment
          //   });

          // Add the localteamInfo.teamLogo to the playerInfoList.picUrl
          const matchingTeam = localTeamInfo.find(
            (team) => team.teamId === playerInfoList.teamId
          );

          if (matchingTeam) {
            playerInfoList.picUrl = matchingTeam.teamLogo;
          }

          return playerInfoList;
        });

        return playerInfoList;
      })
    );
  }

  // getPlayerInfoList(): Observable<lstPlayerInfo> {
  //   return interval(1000).pipe(
  //     switchMap(() => {
  //       return forkJoin({
  //         playerInfoListArray: this.http.get<lstPlayerInfo>(
  //           `${this.localService}/gettotalplayerlist`
  //         ),
  //         localTeamInfo: this.http.get<LocalTeamInfo[]>(
  //           `${this.localService}/getteaminfo`
  //         ),
  //       });
  //     }),
  //     map(({ playerInfoListArray, localTeamInfo }) => {
  //       return {
  //         playerInfoList: playerInfoListArray.playerInfoList.map(
  //           (playerInfoList) => {
  //             // Assign a default value to an attribute
  //             //playerInfoList.character = 'assets/players/default.png';
  //             const playerPath = `assets/players/${playerInfoList.uId}.png`;

  //             this.checkImageExists(playerPath)
  //               .then(() => {
  //                 playerInfoList.character = playerPath; // Remove optional chaining and nullish coalescing operator
  //               })
  //               .catch(() => {
  //                 playerInfoList.character = 'assets/players/default.png'; // Update the property assignment
  //               });

  //             // Add the localteamInfo.teamLogo to the playerInfoList.picUrl
  //             const matchingTeam = localTeamInfo.find(
  //               (team) => team.teamId === playerInfoList.teamId
  //             );

  //             if (matchingTeam) {
  //               playerInfoList.picUrl = matchingTeam.teamLogo;
  //             }

  //             return playerInfoList;
  //           }
  //         ),
  //       };
  //     })
  //   );
  // }

  private checkImageExists(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  }

  getLocalTeamInfo(): Observable<LocalTeamInfo[]> {
    return this.http.get<LocalTeamInfo[]>(`${this.localService}/getteaminfo`);
  }

  getObservingPlayer(): Observable<ObsPlayer> {
    return interval(1000).pipe(
      switchMap(() => {
        return this.http.get<ObsPlayer>(`${this.service}/getobservingplayer`);
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

  getPlayerMatchStats(matchId: number): Observable<PlayerInfoList[]> {
    return this.http.get<PlayerInfoList[]>(
      `${this.playerService}/playerstats${matchId}?_sort=damage&_order=desc`
    );
  }

  savePlayerMatchStats(playerInfo: PlayerInfoList[], matchId: number) {
    return from(playerInfo).pipe(
      concatMap((players) =>
        this.http.post(`${this.playerService}/playerstats${matchId}`, players)
      )
    );
  }

  getDashboardData(): Observable<any> {
    return interval(1000).pipe(
      switchMap(() => {
        return this.http.get<any>(`${this.localService}/dashboarddata`);
      })
    );
  }

  updateDashboardData(data: any, id: number) {
    return this.http.put(`${this.localService}/dashboarddata/${id}`, data);
  }

  saveMvpPlayer(mvpPlayer: mvpPlayer) {
    return this.http.post(`${this.playerService}/mvpplayer`, mvpPlayer);
  }

  getMvpPlayer(matchId: number): Observable<mvpPlayer[]> {
    return this.http.get<mvpPlayer[]>(
      `${this.playerService}/mvpplayer?id=${matchId}`
    );
  }

  getHead2Head(matchId: number): Observable<mvpPlayer[]> {
    return this.http.get<mvpPlayer[]>(
      `${this.playerService}/mvpplayer?id=${matchId}`
    );
  }

  getTop4GunSlingers(matchId: number): Observable<mvpPlayer[]> {
    return this.http.get<mvpPlayer[]>(
      `${this.playerService}/mvpplayer?id=${matchId}`
    );
  }

  saveAllPlayerData(
    mvpPlayer: mvpPlayer,
    h2h: mvpPlayer[],
    top4gun: mvpPlayer[]
  ): void {
    from([
      { api: `${this.playerService}/mvpplayer`, data: [mvpPlayer] },
      { api: `${this.playerService}/head2head`, data: h2h },
      { api: `${this.playerService}/top4gunslingers`, data: top4gun },
    ])
      .pipe(
        concatMap(({ api, data }) =>
          this.http.get<Object[]>(api).pipe(
            concatMap((items: Object[]) => from(items)),
            concatMap((item: any) => this.http.delete(`${api}/${item.id}`)),
            toArray(),
            tap(() => console.log(`Data deleted from ${api}`)),
            concatMap(() =>
              from(data).pipe(concatMap((item) => this.http.post(api, item)))
            )
          )
        )
      )
      .subscribe({
        complete: () => {
          console.log('Data saved');
        },
      });
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

  saveOverallStanding(overallStanding: OverallStandingInfo[]) {
    return from(overallStanding).pipe(
      concatMap((team) =>
        this.http.post(`${this.matchService}/overallstanding`, team)
      )
    );
  }

  getOverallStanding(): Observable<OverallStandingInfo[]> {
    return this.http.get<OverallStandingInfo[]>(
      `${this.matchService}/overallstanding?_sort=totalPoints&_order=desc`
    );
  }
}
