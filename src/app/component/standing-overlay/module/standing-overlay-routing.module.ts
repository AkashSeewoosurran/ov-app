import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingOverlayComponent } from '../standing-overlay.component';

const routes: Routes = [{ component: StandingOverlayComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandingOverlayRoutingModule {}
