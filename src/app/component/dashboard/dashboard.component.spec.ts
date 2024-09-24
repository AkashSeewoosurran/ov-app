import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatchStandingComponent } from 'src/app/shared/component/match-standing/match-standing.component';
import { OverallStandingOverlayComponent } from '../overrall-standing/overall-standing-overlay.component';
import { GameStandingComponent } from 'src/app/shared/component/game-standing/game-standing.component';
import { PlayerStatsComponent } from 'src/app/shared/component/player-stats/player-stats.component';
import { PlayerMatchStatsComponent } from 'src/app/shared/component/player-match-stats/player-match-stats.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LiveMapComponent } from 'src/app/shared/component/live-map/live-map.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatToolbarModule,
        MatTabsModule,
        MatCardModule,
        MatListModule,
        MatchStandingComponent,
        GameStandingComponent,
        PlayerStatsComponent,
        PlayerMatchStatsComponent,
        MatSlideToggleModule,
        LiveMapComponent,
        NoopAnimationsModule,
      ],
      declarations: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
