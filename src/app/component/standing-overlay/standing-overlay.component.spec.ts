import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingOverlayComponent } from './standing-overlay.component';

describe('StandingOverlayComponent', () => {
  let component: StandingOverlayComponent;
  let fixture: ComponentFixture<StandingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
