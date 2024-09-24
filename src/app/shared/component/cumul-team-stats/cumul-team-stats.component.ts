import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import { forkJoin, Subscription } from 'rxjs';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { PlayerInfoList } from '../../models/playerInfo.model';

@Component({
  selector: 'app-cumul-team-stats',
  standalone: true,
  imports: [CommonModule, AppCustomMaterialModule],
  templateUrl: './cumul-team-stats.component.html',
  styleUrls: ['./cumul-team-stats.component.scss'],
})
export class CumulTeamStatsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private playerStats: PlayerInfoList[][] = [];
  private teamStats: { [teamId: string]: any } = {};
  teamStatsArray: any[] = [];
  public displayedColumns: string[] = [
    'teamName',
    'killNum',
    'damage',
    'useSmokeGrenadeNum',
    'useFragGrenadeNum',
    'useBurnGrenadeNum',
    'useFlashGrenadeNum',
    'killNumInVehicle',
    'killNumByGrenade',
    'knockouts',
  ];
  public columnsToDisplay: string[] = [
    'teamName',
    'killNum',
    'damage',
    'knockouts',
  ];
  public selectedChips: string[] = [];

  constructor(private service: PubgmDataService) {}

  ngOnInit(): void {
    this.getPlayerStats();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getPlayerStats() {
    const observables = [];
    for (let i = 1; i <= 8; i++) {
      observables.push(this.service.getPlayerMatchStats(i));
    }

    forkJoin(observables).subscribe({
      next: (data) => {
        this.playerStats = data;
        console.log('playerStats', this.playerStats);
        this.getTeamStats(data);
      },
      error: (error) => console.error(error),
    });
  }

  getTeamStats(data: PlayerInfoList[][]): void {
    const teamStats: { [teamId: string]: any } = {};

    data.forEach((match) => {
      match.forEach((player) => {
        const teamId = player.teamId;
        if (!teamStats[teamId]) {
          teamStats[teamId] = {
            teamId: teamId,
            teamName: player.teamName,
            teamLogo: player.picUrl,
            killNum: 0,
            damage: 0,
            useSmokeGrenadeNum: 0,
            useFragGrenadeNum: 0,
            useBurnGrenadeNum: 0,
            useFlashGrenadeNum: 0,
            knockouts: 0,
            inDamage: 0,
            killNumInVehicle: 0,
            killNumByGrenade: 0,
            // Initialize other stats here
          };
        }
        teamStats[teamId].killNum += player.killNum;
        teamStats[teamId].damage += player.damage;
        teamStats[teamId].useSmokeGrenadeNum += player.useSmokeGrenadeNum;
        teamStats[teamId].useFragGrenadeNum += player.useFragGrenadeNum;
        teamStats[teamId].useBurnGrenadeNum += player.useBurnGrenadeNum;
        teamStats[teamId].useFlashGrenadeNum += player.useFlashGrenadeNum;
        teamStats[teamId].knockouts += player.knockouts;
        teamStats[teamId].inDamage += player.inDamage;
        teamStats[teamId].killNumInVehicle += player.killNumInVehicle;
        teamStats[teamId].killNumByGrenade += player.killNumByGrenade;
        // Aggregate other stats here
      });
    });

    this.teamStats = teamStats;
    console.log('teamStats', this.teamStats);
    this.teamStatsArray = Object.values(teamStats).sort(
      (a, b) => b.killNum - a.killNum
    );
  }

  updateColumns() {
    this.columnsToDisplay = ['teamName', 'killNum', 'damage', 'knockouts'];
    if (this.selectedChips.includes('Smoke')) {
      this.columnsToDisplay.push('useSmokeGrenadeNum');
    }
    if (this.selectedChips.includes('Frag')) {
      this.columnsToDisplay.push('useFragGrenadeNum');
    }
    if (this.selectedChips.includes('Molotov')) {
      this.columnsToDisplay.push('useBurnGrenadeNum');
    }
    if (this.selectedChips.includes('Flash')) {
      this.columnsToDisplay.push('useFlashGrenadeNum');
    }
    if (this.selectedChips.includes('Vehicle')) {
      this.columnsToDisplay.push('killNumInVehicle');
    }
    if (this.selectedChips.includes('Grenade')) {
      this.columnsToDisplay.push('killNumByGrenade');
    }
  }
}
