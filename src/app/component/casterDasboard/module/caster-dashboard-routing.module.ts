import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasterDashboardComponent } from '../caster-dashboard.component';

const routes: Routes = [{ component: CasterDashboardComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
