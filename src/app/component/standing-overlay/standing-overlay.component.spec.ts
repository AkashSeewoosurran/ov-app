import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingOverlayComponent } from './standing-overlay.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';

describe('StandingOverlayComponent', () => {
  let component: StandingOverlayComponent;
  let fixture: ComponentFixture<StandingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule],
      declarations: [StandingOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StandingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
