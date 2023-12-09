import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { PlayerInfoList, mvpPlayer } from '../../models/playerInfo.model';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';

@Component({
  selector: 'app-player-stats',
  standalone: true,
  imports: [CommonModule, AppCustomMaterialModule],
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
})
export class PlayerStatsComponent implements OnInit, AfterViewInit {
  playerInfoList$: PlayerInfoList[] = [];
  mvpPlayer: mvpPlayer = {
    uId: '',
    playerName: '',
    teamName: '',
    damage: 0,
    assists: 0,
    survivalTime: 0,
    inDamage: 0,
    knockouts: 0,
    killNum: 0,
    rank: 0,
  };

  constructor(private service: PubgmDataService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.service.getPlayerInfoList().subscribe({
      next: (data) => {
        this.playerInfoList$ = data;
      },
    });
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
      survivalTime: highestStatsPlayer.survivalTime / 60,
      inDamage: highestStatsPlayer.inDamage,
      knockouts: highestStatsPlayer.knockouts,
      killNum: highestStatsPlayer.killNum,
      rank: highestStatsPlayer.rank,
    };

    console.log(mvpPlayer);
    this.mvpPlayer = mvpPlayer;
  }
}
