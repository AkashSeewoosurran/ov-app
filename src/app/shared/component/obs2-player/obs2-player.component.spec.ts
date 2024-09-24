import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Obs2PlayerComponent } from './obs2-player.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Obs2PlayerComponent', () => {
  let component: Obs2PlayerComponent;
  let fixture: ComponentFixture<Obs2PlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Obs2PlayerComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Obs2PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
