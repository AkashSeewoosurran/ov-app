import { NgModule } from '@angular/core';
import { OverallStandingRoutingModule } from './overall-standing-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { OverallStandingOverlayComponent } from '../overall-standing-overlay.component';

@NgModule({
  declarations: [OverallStandingOverlayComponent],
  imports: [SharedModule, OverallStandingRoutingModule],
})
export class OverallStandingModule {}
