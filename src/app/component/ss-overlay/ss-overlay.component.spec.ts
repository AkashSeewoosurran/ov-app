import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsOverlayComponent } from './ss-overlay.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlayerTop5Component } from 'src/app/shared/component/player-top5/player-top5.component';
import { SurvivalStatusTop5Component } from 'src/app/shared/component/survival-status-top5/survival-status-top5.component';
import { AnnoucementElimsComponent } from 'src/app/shared/component/annoucement-elims/annoucement-elims.component';
import { ZoneProgressbarComponent } from 'src/app/shared/component/zone-progressbar/zone-progressbar.component';
import { AnnouncementBarComponent } from 'src/app/shared/component/annoucement-bar/announcement-bar.component';
import { SurvivalStatusComponent } from 'src/app/shared/component/survival-status/survival-status.component';

describe('SsOverlayComponent', () => {
  let component: SsOverlayComponent;
  let fixture: ComponentFixture<SsOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        PlayerTop5Component,
        SurvivalStatusTop5Component,
        AnnoucementElimsComponent,
        ZoneProgressbarComponent,
        AnnouncementBarComponent,
        SurvivalStatusComponent,
      ],
      declarations: [SsOverlayComponent],
    });
    fixture = TestBed.createComponent(SsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
