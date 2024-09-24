import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerInfoList } from '../../models/playerInfo.model';
import { MATCHES, MatchStandingInfo } from '../../models/matchStanding.model';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { LocalTeamInfo, TeamInfoList } from '../../models/teamInfo.model';
import {
  Subject,
  combineLatest,
  forkJoin,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';

@Component({
  selector: 'app-total-match-standing',
  standalone: true,
  imports: [CommonModule, AppCustomMaterialModule],
  templateUrl: './total-match-standing.component.html',
  styleUrls: ['./total-match-standing.component.scss'],
})
export class TotalMatchStandingComponent
  implements AfterViewInit, OnInit, OnDestroy, AfterViewInit
{
  localTeamInfo: LocalTeamInfo[] = [];
  playerInfoList: PlayerInfoList[] = [];
  teamInfoList: TeamInfoList[] = [];
  private destroy$ = new Subject<void>();
  matchForm: FormGroup;

  dataSource: MatTableDataSource<MatchStandingInfo>;
  displayedColumns: string[] = [
    'teamLogo',
    'teamName',
    'killNum',
    'placementPoints',
    'totalPoints',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  matchLengths: number[];
  matchTeamsLength: number = 0;
  MATCHES = MATCHES;
  selectedMatch: number = 1;
  casterDisabled: boolean = true;

  constructor(private service: PubgmDataService, private router: Router) {}

  ngAfterViewInit(): void {
    // if (this.router.url === '/dashboard') {
    //   this.getDashBoardMatchStanding();
    // }

    combineLatest([
      this.service.getLocalTeamInfo(),
      this.service.getPlayerInfoList(),
      this.service.getTeamInfoList(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([localTeamInfo, playerInfoList, teamInfoList]) => {
        this.localTeamInfo = localTeamInfo;
        this.playerInfoList = playerInfoList;
        this.teamInfoList = teamInfoList;
      });
  }

  // ngAfterViewInit(): void {
  //   // if (this.router.url === '/dashboard') {
  //   //   this.getDashBoardMatchStanding();
  //   // }
  //   // this.getDashBoardMatchStanding();
  //   combineLatest([
  //     this.service.getLocalTeamInfo(),
  //     this.service.getPlayerInfoList(),
  //     this.service.getTeamInfoList(),
  //   ])
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(([localTeamInfo, playerInfoList, teamInfoList]) => {
  //       this.localTeamInfo = localTeamInfo;
  //       this.playerInfoList = playerInfoList.playerInfoList;
  //       this.teamInfoList = teamInfoList.teamInfoList;
  //     });
  // }

  ngOnInit(): void {
    if (this.router.url === '/caster-dashboard') {
      this.casterDisabled = false;
    }
    this.getMatchCount();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMatchCount() {
    const observables = [];
    for (let i = 1; i <= 12; i++) {
      observables.push(this.service.getMatchStanding(i));
    }

    forkJoin(observables).subscribe({
      next: (data) => {
        console.log(data);
        this.matchLengths = data.map((stats) => stats.length);
        console.log(this.matchLengths);
        this.createDataSet(data);
      },
      error: (error) => console.error(error),
    });
  }

  createDataSet(data: any[][]) {
    const teamMap = new Map<string, any>();
    let countMatch: number[] = [];

    for (let i = 0; i < data.length; i++) {
      const matchStats = data[i];
      if (matchStats.length > 0) {
        countMatch.push(i + 1);
      }
      for (let j = 0; j < matchStats.length; j++) {
        const team = matchStats[j];
        const teamId = team.teamId;

        if (!teamMap.has(teamId)) {
          teamMap.set(teamId, {
            rank: team.rank,
            teamId: team.teamId,
            teamLogo: team.teamLogo,
            teamName: team.teamName,
            totalPoints: 0,
          });
        }

        const aggregatedTeam = teamMap.get(teamId);
        aggregatedTeam[`elimsM${i + 1}`] = team.killNum;
        aggregatedTeam[`plcM${i + 1}`] = team.placementPoints;
        aggregatedTeam.totalPoints += team.killNum + team.placementPoints;
      }
    }

    const dataSet = Array.from(teamMap.values());
    console.log('dataSet', dataSet);
    this.updateColumnsToDisplay(countMatch);
    this.dataSource = new MatTableDataSource(
      dataSet.sort((a, b) => b.totalPoints - a.totalPoints)
    );
  }

  updateColumnsToDisplay(countMatch: number[]) {
    this.columnsToDisplay = ['teamLogo', 'teamName']; // Reset to default columns
    for (let i = 1; i <= countMatch.length; i++) {
      this.columnsToDisplay.push(`elimsM${countMatch[i - 1]}`);
      this.columnsToDisplay.push(`plcM${countMatch[i - 1]}`);
    }
    this.columnsToDisplay.push('totalPoints');
    console.log('columnsToDisplay', this.columnsToDisplay);
  }

  getCellClass(column: string): string {
    let suffix = column.slice(-1); // Get the last character of the column name
    switch (suffix) {
      case '1':
        return 'highlight-group-1';
      case '2':
        return 'highlight-group-2';
      case '3':
        return 'highlight-group-3';
      case '4':
        return 'highlight-group-4';
      case '5':
        return 'highlight-group-5';
      case '6':
        return 'highlight-group-6';
      case '7':
        return 'highlight-group-7';
      case '8':
        return 'highlight-group-8';
      case '9':
        return 'highlight-group-9';
      case '10':
        return 'highlight-group-10';
      case '11':
        return 'highlight-group-11';
      case '12':
        return 'highlight-group-12';
      default:
        return '';
    }
  }
}
