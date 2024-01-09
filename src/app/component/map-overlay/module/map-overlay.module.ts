import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MapOverlayComponent } from '../map-overlay.component';
import { MapOverlayRoutingModule } from './map-overlay-routing.module';

@NgModule({
  declarations: [MapOverlayComponent],
  imports: [MapOverlayRoutingModule, SharedModule],
})
export class MapOverlayModule {}
