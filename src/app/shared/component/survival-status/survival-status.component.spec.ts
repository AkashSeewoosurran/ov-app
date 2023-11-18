import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurvivalStatusComponent } from './survival-status.component';

describe('SurvivalStatusComponent', () => {
  let component: SurvivalStatusComponent;
  let fixture: ComponentFixture<SurvivalStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SurvivalStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurvivalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
