import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasterDashboardComponent } from './caster-dashboard.component';

describe('CasterDashboardComponent', () => {
  let component: CasterDashboardComponent;
  let fixture: ComponentFixture<CasterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasterDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
