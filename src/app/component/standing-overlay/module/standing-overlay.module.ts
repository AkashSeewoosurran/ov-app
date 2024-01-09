import { NgModule } from '@angular/core';
import { StandingOverlayRoutingModule } from './standing-overlay-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { StandingOverlayComponent } from '../standing-overlay.component';

@NgModule({
  declarations: [StandingOverlayComponent],
  imports: [SharedModule, StandingOverlayRoutingModule],
})
export class StandingOverlayModule {}
