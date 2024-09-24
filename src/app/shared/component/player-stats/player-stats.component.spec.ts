import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerStatsComponent } from './player-stats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlayerStatsComponent', () => {
  let component: PlayerStatsComponent;
  let fixture: ComponentFixture<PlayerStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerStatsComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
