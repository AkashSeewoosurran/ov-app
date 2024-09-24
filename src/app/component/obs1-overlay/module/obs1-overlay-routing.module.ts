import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Obs1OverlayComponent } from '../obs1-overlay.component';

const routes: Routes = [{ component: Obs1OverlayComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Obs1OverlayRoutingModule {}
