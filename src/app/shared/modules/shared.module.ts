import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurvivalStatusComponent } from '../component/survival-status/survival-status.component';
import { AppCustomMaterialModule } from './app-custom-material.module';
import { Obs1PlayerComponent } from '../component/obs1-player/obs1-player.component';
import { SurvivalStatusTop5Component } from '../component/survival-status-top5/survival-status-top5.component';
import { PlayerTop5Component } from '../component/player-top5/player-top5.component';
import { ZoneProgressbarComponent } from '../component/zone-progressbar/zone-progressbar.component';
import { AnnouncementBarComponent } from '../component/annoucement-bar/announcement-bar.component';
import { AnnoucementElimsComponent } from '../component/annoucement-elims/annoucement-elims.component';
import { MatchStandingComponent } from '../component/match-standing/match-standing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameStandingComponent } from '../component/game-standing/game-standing.component';
import { PlayerStatsComponent } from '../component/player-stats/player-stats.component';
import { PlayerMatchStatsComponent } from '../component/player-match-stats/player-match-stats.component';
import { LiveMapComponent } from '../component/live-map/live-map.component';
import { TotalMatchStandingComponent } from '../component/total-match-standing/total-match-standing.component';
import { CumulTeamStatsComponent } from '../component/cumul-team-stats/cumul-team-stats.component';
import { FirestoreStatsComponent } from '../component/firestore-stats/firestore-stats.component';
import { Obs2PlayerComponent } from '../component/obs2-player/obs2-player.component';
import { DashboardControlsComponent } from '../component/dashboard/dashboard-controls.component';

const components = [
  SurvivalStatusComponent,
  Obs1PlayerComponent,
  Obs2PlayerComponent,
  SurvivalStatusTop5Component,
  PlayerTop5Component,
  ZoneProgressbarComponent,
  AnnouncementBarComponent,
  AnnoucementElimsComponent,
  MatchStandingComponent,
  GameStandingComponent,
  PlayerStatsComponent,
  PlayerMatchStatsComponent,
  LiveMapComponent,
  TotalMatchStandingComponent,
  CumulTeamStatsComponent,
  FirestoreStatsComponent,
  DashboardControlsComponent,
];

const modules = [
  CommonModule,
  AppCustomMaterialModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [...components, ...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
