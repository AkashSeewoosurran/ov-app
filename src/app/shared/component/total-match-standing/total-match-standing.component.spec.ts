import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalMatchStandingComponent } from './total-match-standing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TotalMatchStandingComponent', () => {
  let component: TotalMatchStandingComponent;
  let fixture: ComponentFixture<TotalMatchStandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TotalMatchStandingComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalMatchStandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
