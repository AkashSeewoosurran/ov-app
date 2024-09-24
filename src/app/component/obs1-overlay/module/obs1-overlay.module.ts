import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Obs1OverlayRoutingModule } from './obs1-overlay-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { Obs1OverlayComponent } from '../obs1-overlay.component';

@NgModule({
  declarations: [Obs1OverlayComponent],
  imports: [SharedModule, Obs1OverlayRoutingModule],
})
export class Obs1OverlayModule {}
