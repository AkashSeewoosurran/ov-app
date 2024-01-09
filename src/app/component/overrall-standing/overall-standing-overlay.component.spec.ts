import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverallStandingOverlayComponent } from './overall-standing-overlay.component';

describe('OverallStandingOverlayComponent', () => {
  let component: OverallStandingOverlayComponent;
  let fixture: ComponentFixture<OverallStandingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallStandingOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallStandingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
