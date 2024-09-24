import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Obs2OverlayRoutingModule } from './obs2-overlay-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { Obs2OverlayComponent } from '../obs2-overlay.component';

@NgModule({
  declarations: [Obs2OverlayComponent],
  imports: [SharedModule, Obs2OverlayRoutingModule],
})
export class Obs2OverlayModule {}
