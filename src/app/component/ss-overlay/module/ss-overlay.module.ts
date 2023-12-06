import { NgModule } from '@angular/core';
import { SsOverlayRoutingModule } from './ss-overlay-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { SsOverlayComponent } from '../ss-overlay.component';

@NgModule({
  declarations: [SsOverlayComponent],
  imports: [SsOverlayRoutingModule, SharedModule],
})
export class SsOverlayModule {}
