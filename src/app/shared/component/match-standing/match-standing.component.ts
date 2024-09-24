import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerInfoList } from '../../models/playerInfo.model';
import {
  MATCHES,
  MatchStandingInfo,
  OverallStandingInfo,
} from '../../models/matchStanding.model';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { LocalTeamInfo, TeamInfoList } from '../../models/teamInfo.model';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CollectionReference, Firestore } from '@angular/fire/firestore';

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
  implements AfterViewInit, OnInit, OnDestroy, AfterViewInit
{
  localTeamInfo: LocalTeamInfo[] = [];
  playerInfoList: PlayerInfoList[] = [];
  teamInfoList: TeamInfoList[] = [];
  private destroy$ = new Subject<void>();
  matchForm: FormGroup;

  dataSource: MatTableDataSource<MatchStandingInfo>;
  displayedColumns: string[] = [
    'rank',
    'teamId',
    'teamLogo',
    'teamName',
    'killNum',
    'placementPoints',
    'totalPoints',
  ];
  matchLengths: number[];
  matchTeamsLength: number = 0;
  MATCHES = MATCHES;
  selectedMatch: number = 1;
  casterDisabled: boolean = true;
  private fireStore: Firestore = inject(Firestore);
  tournamentCollection: CollectionReference;

  constructor(private service: PubgmDataService, private router: Router) {}

  ngAfterViewInit(): void {
    if (this.router.url === '/dashboard') {
      this.getDashBoardMatchStanding();
    }

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
  //   if (this.router.url === '/dashboard') {
  //     this.getDashBoardMatchStanding();
  //   }
  //   this.getDashBoardMatchStanding();
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

  getDashBoardMatchStanding() {
    this.service
      .getDashboardData()
      .pipe(
        switchMap((res) => {
          this.selectedMatch = res[3].matchStanding;
          return this.service.getMatchStanding(this.selectedMatch);
        })
      )
      .subscribe((res: MatchStandingInfo[]) => {
        this.dataSource = new MatTableDataSource<MatchStandingInfo>(res);
      });
  }

  getMatchStanding(): void {
    const accumulator: MatchStandingInfo = {};

    this.playerInfoList.forEach((player) => {
      const teamName = player.teamName;
      const rank = player.rank;

      // If the team doesn't exist in the accumulator yet, create it
      if (!accumulator[rank]) {
        accumulator[rank] = {
          teamName: teamName,
          rank: 0,
          killNum: 0,
          placementPoints: 0,
          totalPoints: 0,
          teamLogo: player.picUrl,
          teamId: player.teamId,
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
    this.matchTeamsLength = teamStats.length;

    this.onSaveTeamStatsClick(teamStats$);
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
        this.dataSource = new MatTableDataSource<MatchStandingInfo>(res);
      });

      const data = {
        id: 4,
        matchStanding: matchId,
      };

      if (this.router.url === '/dashboard') {
        this.service.updateDashboardData(data, 4).subscribe({
          next: (res) => {
            console.log(res);
          },
        });
      }
    }
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
      },
      error: (error) => console.error(error),
    });
  }

  canUpload() {
    // Check if this.matchLengths is defined and is an array
    if (Array.isArray(this.matchLengths) && this.matchLengths.length > 0) {
      // Check if this.selectedMatch is defined and within the range of matchLengths
      if (
        this.selectedMatch &&
        this.selectedMatch > 0 &&
        this.selectedMatch <= this.matchLengths.length
      ) {
        return this.matchLengths[this.selectedMatch - 1] > 0;
      }
    }
    return false;
  }
}
