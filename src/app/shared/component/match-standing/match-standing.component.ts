import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared-service.service';
import { PlayerInfoList } from '../../models/playerInfo.model';
import {
  MatchStanding,
  MatchStandingInfo,
} from '../../models/matchStanding.model';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { LocalTeamInfo, TeamInfoList } from '../../models/teamInfo.model';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import { Subject, combineLatest, take, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface Matches {
  id: number;
  name: string;
}

@Component({
  selector: 'app-match-standing',
  standalone: true,
  imports: [
    CommonModule,
    AppCustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './match-standing.component.html',
  styleUrls: ['./match-standing.component.scss'],
})
export class MatchStandingComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  localTeamInfo: LocalTeamInfo[] = [];
  playerInfoList: PlayerInfoList[] = [];
  teamInfoList: TeamInfoList[] = [];
  private destroy$ = new Subject<void>();
  matchForm: FormGroup;

  MATCHES: Matches[] = [
    { id: 1, name: 'Match 1' },
    { id: 2, name: 'Match 2' },
    { id: 3, name: 'Match 3' },
    { id: 4, name: 'Match 4' },
    { id: 5, name: 'Match 5' },
    { id: 6, name: 'Match 6' },
    { id: 7, name: 'Match 7' },
    { id: 8, name: 'Match 8' },
  ];

  dataSource: MatTableDataSource<MatchStandingInfo>;
  displayedColumns: string[] = [
    'rank',
    'teamLogo',
    'teamName',
    'killNum',
    'placementPoints',
    'totalPoints',
  ];

  constructor(private service: PubgmDataService) {}

  ngAfterViewInit(): void {
    combineLatest([
      this.service.getLocalTeamInfo(),
      this.service.getPlayerInfoList(),
      this.service.getTeamInfoList(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([localTeamInfo, playerInfoList, teamInfoList]) => {
        console.log('afterviewinit');
        this.localTeamInfo = localTeamInfo;
        this.playerInfoList = playerInfoList.playerInfoList;
        this.teamInfoList = teamInfoList.teamInfoList;
      });
  }

  ngOnInit(): void {
    console.log('MatchStandingComponent');
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.matchForm = new FormGroup({
      match: new FormControl('', Validators.required),
    });
  }

  getMatchStanding(): void {
    const accumulator: MatchStandingInfo = {};

    this.playerInfoList.forEach((player) => {
      const teamName = player.teamName;
      const rank = player.rank;
      const localTeam = this.localTeamInfo.find(
        (team: LocalTeamInfo) =>
          team.teamName === player.teamName || team.teamId === player.teamId
      );
      let teamLogo;
      if (localTeam === undefined) {
        teamLogo = 'assets/Logo/default.png';
      } else {
        teamLogo = `assets/Logo/${localTeam.teamLogo}`;
      }
      // If the team doesn't exist in the accumulator yet, create it
      if (!accumulator[rank]) {
        accumulator[rank] = {
          teamName: teamName,
          rank: 0,
          killNum: 0,
          placementPoints: 0,
          totalPoints: 0,
          teamLogo: teamLogo,
        };
      }

      // Accumulate the killNum for the team
      accumulator[rank].killNum += player.killNum;
    });

    // Sort teams by total killNum
    const teamStats = Object.values(accumulator).sort(
      (a, b) => a.rank - b.rank
    );

    // Assign ranks and placement points
    teamStats.forEach((team, index) => {
      team.rank = index + 1;
      if (team.rank === 1) {
        team.placementPoints = 10;
      } else if (team.rank === 2) {
        team.placementPoints = 6;
      } else if (team.rank === 3) {
        team.placementPoints = 5;
      } else if (team.rank === 4) {
        team.placementPoints = 4;
      } else if (team.rank === 5) {
        team.placementPoints = 3;
      } else if (team.rank === 6) {
        team.placementPoints = 2;
      } else if (team.rank >= 7 && team.rank <= 8) {
        team.placementPoints = 1;
      } else {
        team.placementPoints = 0;
      }
      team.totalPoints = team.killNum + team.placementPoints;
    });

    const teamStats$ = teamStats.sort((a, b) => b.totalPoints - a.totalPoints);

    this.onSaveTeamStatsClick(teamStats$);
    console.log(teamStats$);
  }

  getMatchStandingTest(): void {
    const matchStandings: MatchStanding[] = [];
    this.teamInfoList.forEach((teamInfo: TeamInfoList) => {
      const localTeam = this.localTeamInfo.find(
        (team: LocalTeamInfo) =>
          teamInfo.teamName === team.teamName && teamInfo.teamId === team.teamId
      );

      const player = this.playerInfoList.find((player: PlayerInfoList) => {
        return (
          teamInfo.teamName === player.teamName &&
          teamInfo.teamId === player.teamId
        );
      });

      console.log(player?.rank);

      const team: MatchStanding = {
        teamName: teamInfo.teamName,
        rank: player?.rank,
        killNum: teamInfo.killNum,
        placementPoints: 0,
        totalPoints: 0,
        teamLogo: localTeam?.teamLogo,
      };

      if (player?.rank === 1) {
        team.placementPoints = 10;
      } else if (player?.rank === 2) {
        team.placementPoints = 6;
      } else if (player?.rank === 3) {
        team.placementPoints = 5;
      } else if (player?.rank === 4) {
        team.placementPoints = 4;
      } else if (player?.rank === 5) {
        team.placementPoints = 3;
      } else if (player?.rank === 6) {
        team.placementPoints = 2;
      } else if ((player?.rank ?? 0) >= 7 && (player?.rank ?? 0) <= 8) {
        team.placementPoints = 1;
      } else {
        team.placementPoints = 0;
      }

      team.totalPoints = teamInfo.killNum + team.placementPoints;

      matchStandings.push(team);
    });

    const teamStats$ = matchStandings.sort(
      (a, b) => b.totalPoints - a.totalPoints
    );

    console.log(teamStats$);
  }

  onSaveTeamStatsClick(teamStats: any) {
    if (this.matchForm.valid) {
      const matchId = this.matchForm.get('match')?.value;
      this.service.saveMatchStanding(teamStats, matchId).subscribe({
        next: (res) => {
          console.log(res);
        },
        complete: () => {
          this.onMatchSelected(matchId);
        },
      });
    }
  }

  onMatchSelected(matchId: number) {
    if (matchId) {
      this.service.getMatchStanding(matchId).subscribe((res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource<MatchStandingInfo>(res);
      });
    }
  }
}
