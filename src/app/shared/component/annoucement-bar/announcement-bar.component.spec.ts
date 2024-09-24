import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnouncementBarComponent } from './announcement-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AnnouncementBarComponent', () => {
  let component: AnnouncementBarComponent;
  let fixture: ComponentFixture<AnnouncementBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AnnouncementBarComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncementBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
