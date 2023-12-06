import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerTop5Component } from './player-top5.component';

describe('PlayerTop5Component', () => {
  let component: PlayerTop5Component;
  let fixture: ComponentFixture<PlayerTop5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PlayerTop5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerTop5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
