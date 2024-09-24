import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerTop5Component } from './player-top5.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PlayerTop5Component', () => {
  let component: PlayerTop5Component;
  let fixture: ComponentFixture<PlayerTop5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlayerTop5Component,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerTop5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
