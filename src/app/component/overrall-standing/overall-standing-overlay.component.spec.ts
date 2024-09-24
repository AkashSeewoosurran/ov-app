import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverallStandingOverlayComponent } from './overall-standing-overlay.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';

describe('OverallStandingOverlayComponent', () => {
  let component: OverallStandingOverlayComponent;
  let fixture: ComponentFixture<OverallStandingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule],
      declarations: [OverallStandingOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverallStandingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
