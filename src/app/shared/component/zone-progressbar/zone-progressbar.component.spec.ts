import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoneProgressbarComponent } from './zone-progressbar.component';

describe('ZoneProgressbarComponent', () => {
  let component: ZoneProgressbarComponent;
  let fixture: ComponentFixture<ZoneProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ZoneProgressbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
