import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurvivalStatusComponent } from './survival-status.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SurvivalStatusComponent', () => {
  let component: SurvivalStatusComponent;
  let fixture: ComponentFixture<SurvivalStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SurvivalStatusComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SurvivalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
