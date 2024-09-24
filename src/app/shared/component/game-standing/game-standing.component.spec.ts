import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameStandingComponent } from './game-standing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameStandingComponent', () => {
  let component: GameStandingComponent;
  let fixture: ComponentFixture<GameStandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameStandingComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GameStandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
