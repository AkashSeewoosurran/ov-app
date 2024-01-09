import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';

import { DashboardRoutingModule } from './caster-dashboard-routing.module';
import { CasterDashboardComponent } from '../caster-dashboard.component';

@NgModule({
  declarations: [CasterDashboardComponent],
  imports: [DashboardRoutingModule, SharedModule],
})
export class CasterDashboardModule {}
