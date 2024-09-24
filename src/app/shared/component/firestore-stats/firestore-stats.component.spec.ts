import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FirestoreStatsComponent } from './firestore-stats.component';

describe('FirestoreStatsComponent', () => {
  let component: FirestoreStatsComponent;
  let fixture: ComponentFixture<FirestoreStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FirestoreStatsComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FirestoreStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
