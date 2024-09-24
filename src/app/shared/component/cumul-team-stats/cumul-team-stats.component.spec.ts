import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CumulTeamStatsComponent } from './cumul-team-stats.component';

describe('CumulTeamStatsComponent', () => {
  let component: CumulTeamStatsComponent;
  let fixture: ComponentFixture<CumulTeamStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CumulTeamStatsComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CumulTeamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
