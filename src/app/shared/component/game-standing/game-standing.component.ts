import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { forkJoin } from 'rxjs';
import {
  MatchStandingInfo,
  OverallStandingInfo,
} from '../../models/matchStanding.model';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
    'wwcd',
    'killNum',
    'placementPoints',
    'totalPoints',
  ];
  dataSource: MatTableDataSource<OverallStandingInfo>;
  matchLengths: number[];
  isGameValid: boolean;
  casterDisabled: boolean = true;

  constructor(private service: PubgmDataService, private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/caster-dashboard') {
      this.casterDisabled = false;
    }
    this.getMatchCount();
    this.generateGameStanding();
  }

  generateGameStanding() {
    const matchStandingsObservables = [];
    for (let i = 1; i <= 12; i++) {
      matchStandingsObservables.push(this.service.getMatchStanding(i));
    }

    forkJoin(matchStandingsObservables).subscribe((matchStandings: any) => {
      const teamTotals: { [teamId: number]: OverallStandingInfo } = {};
      for (const matchStanding of matchStandings) {
        for (const team of matchStanding) {
          if (teamTotals[team.teamId]) {
            teamTotals[team.teamId].killNum += team.killNum;
            teamTotals[team.teamId].placementPoints += team.placementPoints;
            teamTotals[team.teamId].totalPoints += team.totalPoints;
            if (team.rank === 1) {
              teamTotals[team.teamId].wins += 1;
            }
          } else {
            teamTotals[team.teamId] = {
              ...team,
              wins: team.rank === 1 ? 1 : 0,
            };
          }
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

      // console.log(teams);
      this.dataSource = new MatTableDataSource(teams);
    });
  }

  getMatchCount() {
    const observables = [];
    for (let i = 1; i <= 12; i++) {
      observables.push(this.service.getMatchStanding(i));
    }

    forkJoin(observables).subscribe({
      next: (data) => {
        this.matchLengths = data.map((stats) => stats.length);
        this.isGameValid = data.every((match) => match.length > 0);
      },
      error: (error) => console.error(error),
    });
  }

  saveOverallStanding() {
    const overallStanding: OverallStandingInfo[] = this.dataSource.data;
    this.service.saveOverallStanding(overallStanding).subscribe({
      complete: () => {
        console.log('Data saved');
      },
    });
  }
}
