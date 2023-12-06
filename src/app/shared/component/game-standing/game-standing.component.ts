import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { forkJoin } from 'rxjs';
import { MatchStandingInfo } from '../../models/matchStanding.model';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-game-standing',
  standalone: true,
  imports: [CommonModule, AppCustomMaterialModule],
  templateUrl: './game-standing.component.html',
  styleUrls: ['./game-standing.component.scss'],
})
export class GameStandingComponent implements OnInit {
  displayedColumns: string[] = [
    'rank',
    'teamLogo',
    'teamName',
    'killNum',
    'placementPoints',
    'totalPoints',
  ];
  dataSource: MatTableDataSource<MatchStandingInfo>;

  constructor(private service: PubgmDataService) {}

  ngOnInit(): void {}

  generateGameStanding() {
    const matchStandingsObservables = [];
    for (let i = 1; i <= 8; i++) {
      matchStandingsObservables.push(this.service.getMatchStanding(i));
    }

    forkJoin(matchStandingsObservables).subscribe((matchStandings: any) => {
      const teamTotals: { [teamName: string]: MatchStandingInfo } = {};
      for (const matchStanding of matchStandings) {
        for (const teamName in matchStanding) {
          const team = matchStanding[teamName];
          if (!teamTotals[teamName]) {
            teamTotals[teamName] = {
              teamName: team['teamName'],
              rank: 0,
              killNum: 0,
              placementPoints: 0,
              totalPoints: 0,
              teamLogo: team['teamLogo'],
            } as unknown as MatchStandingInfo;
          }
          teamTotals[teamName]['killNum'] += team['killNum'];
          teamTotals[teamName]['placementPoints'] += team['placementPoints'];
          teamTotals[teamName]['totalPoints'] += team['totalPoints'];
        }
      }
      // Create an array of teams and sort it by total points
      const teams: any = Object.values(teamTotals);
      teams.sort(
        (a: { totalPoints: number }, b: { totalPoints: number }) =>
          b.totalPoints - a.totalPoints
      );

      // Assign ranks based on the order in the array
      for (let i = 0; i < teams.length; i++) {
        teams[i].rank = i + 1;
      }

      console.log(teams);
      this.dataSource = new MatTableDataSource(teams);
    });
  }
}
