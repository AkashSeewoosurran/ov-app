import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurvivalStatusTop5Component } from './survival-status-top5.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SurvivalStatusTop5Component', () => {
  let component: SurvivalStatusTop5Component;
  let fixture: ComponentFixture<SurvivalStatusTop5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SurvivalStatusTop5Component,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SurvivalStatusTop5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
