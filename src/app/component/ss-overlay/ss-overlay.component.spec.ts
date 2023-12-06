import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsOverlayComponent } from './ss-overlay.component';

describe('SsOverlayComponent', () => {
  let component: SsOverlayComponent;
  let fixture: ComponentFixture<SsOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SsOverlayComponent]
    });
    fixture = TestBed.createComponent(SsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
