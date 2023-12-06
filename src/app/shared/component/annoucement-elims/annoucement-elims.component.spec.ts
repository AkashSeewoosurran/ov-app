import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnoucementElimsComponent } from './annoucement-elims.component';

describe('AnnoucementElimsComponent', () => {
  let component: AnnoucementElimsComponent;
  let fixture: ComponentFixture<AnnoucementElimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AnnoucementElimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoucementElimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
