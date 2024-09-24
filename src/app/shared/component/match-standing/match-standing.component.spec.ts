import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchStandingComponent } from './match-standing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MatchStandingComponent', () => {
  let component: MatchStandingComponent;
  let fixture: ComponentFixture<MatchStandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatchStandingComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchStandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
