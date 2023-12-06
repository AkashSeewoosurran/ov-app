import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ssoverlay',
    loadChildren: () =>
      import('./component/ss-overlay/module/ss-overlay.module').then(
        (m) => m.SsOverlayModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./component/dashboard/module/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
