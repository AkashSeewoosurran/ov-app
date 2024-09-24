import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Obs1PlayerComponent } from './obs1-player.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ObsPlayerComponent', () => {
  let component: Obs1PlayerComponent;
  let fixture: ComponentFixture<Obs1PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Obs1PlayerComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Obs1PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
