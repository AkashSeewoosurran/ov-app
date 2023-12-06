import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObsPlayerComponent } from './obs-player.component';

describe('ObsPlayerComponent', () => {
  let component: ObsPlayerComponent;
  let fixture: ComponentFixture<ObsPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ObsPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
