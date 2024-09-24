import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasterDashboardComponent } from './caster-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatchStandingComponent } from 'src/app/shared/component/match-standing/match-standing.component';
import { GameStandingComponent } from 'src/app/shared/component/game-standing/game-standing.component';
import { PlayerStatsComponent } from 'src/app/shared/component/player-stats/player-stats.component';
import { PlayerMatchStatsComponent } from 'src/app/shared/component/player-match-stats/player-match-stats.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CasterDashboardComponent', () => {
  let component: CasterDashboardComponent;
  let fixture: ComponentFixture<CasterDashboardComponent>;

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
        NoopAnimationsModule,
      ],
      declarations: [CasterDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
