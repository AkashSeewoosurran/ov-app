import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveMapComponent } from './live-map.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LiveMapComponent', () => {
  let component: LiveMapComponent;
  let fixture: ComponentFixture<LiveMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveMapComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
