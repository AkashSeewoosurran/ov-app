import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Obs2OverlayComponent } from '../obs2-overlay.component';

const routes: Routes = [{ component: Obs2OverlayComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Obs2OverlayRoutingModule {}
