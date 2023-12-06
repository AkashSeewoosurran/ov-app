import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameStandingComponent } from './game-standing.component';

describe('GameStandingComponent', () => {
  let component: GameStandingComponent;
  let fixture: ComponentFixture<GameStandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GameStandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameStandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
