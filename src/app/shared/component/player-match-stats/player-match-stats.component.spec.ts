import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerMatchStatsComponent } from './player-match-stats.component';

describe('PlayerMatchStatsComponent', () => {
  let component: PlayerMatchStatsComponent;
  let fixture: ComponentFixture<PlayerMatchStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PlayerMatchStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerMatchStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
