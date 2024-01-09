import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerInfoList, PlayerMatchInfo } from '../../models/playerInfo.model';
import { forkJoin } from 'rxjs';
import { MATCHES } from '../../models/matchStanding.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-match-stats',
  standalone: true,
  imports: [
    CommonModule,
    AppCustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './player-match-stats.component.html',
  styleUrls: ['./player-match-stats.component.scss'],
})
export class PlayerMatchStatsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  matchForm: FormGroup;
  dataSource: MatTableDataSource<PlayerInfoList>;
  displayedColumns: string[] = [
    'rank',
    'playerName',
    'teamLogo',
    'killNum',
    'damage',
    'assists',
    'knockouts',
    'inDamage',
  ];

  playerInfoList: PlayerInfoList[] = [];
  playerStatsLenght: number = 0;

  MATCHES = MATCHES;
  playerStatsLengths: number[];
  casterDisabled: boolean = true;

  constructor(
    private service: PubgmDataService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/caster-dashboard') {
      this.casterDisabled = false;
    }
    this.getPlayersStatsCount();
    this.initForm();
  }

  initForm() {
    this.matchForm = new FormGroup({
      match: new FormControl('', Validators.required),
    });
  }

  getPlayerMatchStats() {
    this.service.getPlayerInfoList().subscribe({
      next: (data) => {
        console.log(data);
        this.playerInfoList = data;
        this.playerStatsLenght = this.playerInfoList.length;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // getPlayerMatchStats() {
  //   this.service.getPlayerInfoList().subscribe({
  //     next: (data) => {
  //       console.log(data.playerInfoList);
  //       this.playerInfoList = data.playerInfoList;
  //       this.playerStatsLenght = this.playerInfoList.length;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  getPlayersStatsCount() {
    const observables = [];
    for (let i = 1; i <= 12; i++) {
      observables.push(this.service.getPlayerMatchStats(i));
    }

    forkJoin(observables).subscribe({
      next: (data) => {
        console.log(data);
        this.playerStatsLengths = data.map((stats) => stats.length);
        console.log(this.playerStatsLengths);
      },
      error: (error) => console.error(error),
    });
  }

  onMatchSelected(matchId: number) {
    if (matchId) {
      this.service.getPlayerMatchStats(matchId).subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource<PlayerInfoList>(res);
        },
        complete: () => {
          this.cdr.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      });
    }
  }

  savePlayerStats() {
    if (this.matchForm.valid && this.playerInfoList.length > 0) {
      const matchId = this.matchForm.get('match')?.value;
      this.service
        .savePlayerMatchStats(this.playerInfoList, matchId)
        .subscribe({
          next: () => {
            this.cdr.detectChanges();
          },
        });
    }
  }
}
