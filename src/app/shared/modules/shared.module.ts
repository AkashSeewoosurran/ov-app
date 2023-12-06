import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurvivalStatusComponent } from '../component/survival-status/survival-status.component';
import { AppCustomMaterialModule } from './app-custom-material.module';
import { ObsPlayerComponent } from '../component/obs-player/obs-player.component';
import { SurvivalStatusTop5Component } from '../component/survival-status-top5/survival-status-top5.component';
import { PlayerTop5Component } from '../component/player-top5/player-top5.component';
import { ZoneProgressbarComponent } from '../component/zone-progressbar/zone-progressbar.component';
import { AnnouncementBarComponent } from '../component/annoucement-bar/announcement-bar.component';
import { AnnoucementElimsComponent } from '../component/annoucement-elims/annoucement-elims.component';
import { MatchStandingComponent } from '../component/match-standing/match-standing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameStandingComponent } from '../component/game-standing/game-standing.component';

const components = [
  SurvivalStatusComponent,
  ObsPlayerComponent,
  SurvivalStatusTop5Component,
  PlayerTop5Component,
  ZoneProgressbarComponent,
  AnnouncementBarComponent,
  AnnoucementElimsComponent,
  MatchStandingComponent,
  GameStandingComponent,
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
