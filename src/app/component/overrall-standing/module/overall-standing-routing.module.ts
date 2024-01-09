import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverallStandingOverlayComponent } from '../overall-standing-overlay.component';

const routes: Routes = [
  { component: OverallStandingOverlayComponent, path: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverallStandingRoutingModule {}
