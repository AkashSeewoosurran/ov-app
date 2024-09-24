import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { PlayerInfoList, mvpPlayer } from '../../models/playerInfo.model';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import { LocalTeamInfo } from '../../models/teamInfo.model';
import { forkJoin } from 'rxjs';
import { MATCHES } from '../../models/matchStanding.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-stats',
  standalone: true,
  imports: [CommonModule, AppCustomMaterialModule],
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
})
export class PlayerStatsComponent implements OnInit, AfterViewInit {
  playerInfoList$: PlayerInfoList[] = [];
  mvpPlayer: mvpPlayer;
  head2head: mvpPlayer[] = [];
  top4GunslingersList: mvpPlayer[] = [];

  MATCHES = MATCHES;
  localTeamInfo: LocalTeamInfo[] = [];
  playerPath: string = 'C:/';
  casterDisabled: boolean = true;

  constructor(private service: PubgmDataService, private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/caster-dashboard') {
      this.casterDisabled = false;
    }
    console.log(this.head2head.length);
    this.service.getLocalTeamInfo().subscribe({
      next: (data) => {
        this.localTeamInfo = data;
      },
    });
  }

  // ngAfterViewInit(): void {
  //   this.service.getPlayerInfoList().subscribe({
  //     next: (data) => {
  //       this.playerInfoList$ = data.playerInfoList;
  //     },
  //   });
  // }

  ngAfterViewInit(): void {
    this.service.getPlayerInfoList().subscribe({
      next: (data) => {
        this.playerInfoList$ = data;
      },
    });
  }

  generatePlayerStats(): void {
    this.getMvpPlayer();
    this.getheadToHead();
    this.gettop4Gunslingers();
  }

  savePlayerStats(): void {
    console.log(this.head2head.length);
    console.log(this.mvpPlayer);
    console.log(this.top4GunslingersList.length);
  }

  getMvpPlayer(): void {
    const highestStatsPlayer = this.playerInfoList$.reduce((acc, curr) => {
      const currSurvivalTimeInMins =
        Math.floor(curr.survivalTime / 60) +
        ':' +
        (curr.survivalTime % 60).toString().padStart(2, '0');
      const accSurvivalTimeInMins =
        Math.floor(acc.survivalTime / 60) +
        ':' +
        (acc.survivalTime % 60).toString().padStart(2, '0');
      if (
        curr.killNum > acc.killNum ||
        (curr.killNum === acc.killNum &&
          currSurvivalTimeInMins > accSurvivalTimeInMins)
      ) {
        return curr;
      }
      return acc;
    });

    const mvpPlayer: mvpPlayer = {
      uId: highestStatsPlayer.uId,
      playerName: highestStatsPlayer.playerName,
      teamName: highestStatsPlayer.teamName,
      damage: highestStatsPlayer.damage,
      assists: highestStatsPlayer.assists,
      survivalTime:
        Math.floor(highestStatsPlayer.survivalTime / 60) +
        ':' +
        (highestStatsPlayer.survivalTime % 60).toString().padStart(2, '0'),
      inDamage: highestStatsPlayer.inDamage,
      knockouts: highestStatsPlayer.knockouts,
      killNum: highestStatsPlayer.killNum,
      rank: highestStatsPlayer.rank,
      character: this.playerPath + highestStatsPlayer.character,
      teamLogo: this.playerPath + highestStatsPlayer.picUrl,
    };

    this.mvpPlayer = mvpPlayer;
  }

  getheadToHead(): void {
    const headToHead = this.playerInfoList$
      .sort((a, b) => {
        return b.killNum - a.killNum;
      })
      .map((player) => {
        return {
          playerName: player.playerName,
          killNum: player.killNum,
          character: this.playerPath + player.character,
          rank: player.rank,
          teamName: player.teamName,
          teamLogo: this.playerPath + player.picUrl,
          knockouts: player.knockouts,
          damage: player.damage,
          inDamage: player.inDamage,
          assists: player.assists,
          survivalTime:
            Math.floor(player.survivalTime / 60) +
            ':' +
            (player.survivalTime % 60).toString().padStart(2, '0'),
        };
      })
      .slice(0, 2);

    this.head2head = headToHead as mvpPlayer[];
  }

  gettop4Gunslingers(): void {
    const top4Gunslingers = this.playerInfoList$
      .sort((a, b) => {
        return b.damage - a.damage;
      })
      .map((player) => {
        return {
          playerName: player.playerName,
          damage: player.damage,
          killNum: player.killNum,
          character: this.playerPath + player.character,
          rank: player.rank,
          teamName: player.teamName,
          teamLogo: this.playerPath + player.picUrl,
        };
      })
      .slice(0, 4);

    this.top4GunslingersList = top4Gunslingers as mvpPlayer[];
  }

  saveAllPlayerStats(): void {
    if (
      this.head2head.length > 0 &&
      this.top4GunslingersList.length > 0 &&
      this.mvpPlayer != null
    ) {
      this.service.saveAllPlayerData(
        this.mvpPlayer,
        this.head2head,
        this.top4GunslingersList
      );
    }
  }

  onMatchSelected(matchId: number) {
    if (matchId) {
      forkJoin({
        mvpPlayer: this.service.getMvpPlayer(matchId),
        head2head: this.service.getHead2Head(matchId),
        top4GunslingersList: this.service.getTop4GunSlingers(matchId),
      }).subscribe({
        next: ({ mvpPlayer, head2head, top4GunslingersList }) => {
          this.mvpPlayer = mvpPlayer[0];
          this.head2head = head2head;
          this.top4GunslingersList = top4GunslingersList;
        },
      });
    }
  }
}
