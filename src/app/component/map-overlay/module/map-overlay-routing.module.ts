import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapOverlayComponent } from '../map-overlay.component';

const routes: Routes = [{ component: MapOverlayComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapOverlayRoutingModule {}
