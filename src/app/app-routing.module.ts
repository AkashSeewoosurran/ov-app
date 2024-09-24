import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ssov',
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
  {
    path: 'mapov',
    loadChildren: () =>
      import('./component/map-overlay/module/map-overlay.module').then(
        (m) => m.MapOverlayModule
      ),
  },
  {
    path: 'stov',
    loadChildren: () =>
      import(
        './component/standing-overlay/module/standing-overlay.module'
      ).then((m) => m.StandingOverlayModule),
  },

  {
    path: 'osov',
    loadChildren: () =>
      import(
        './component/overrall-standing/module/overall-standing.module'
      ).then((m) => m.OverallStandingModule),
  },
  {
    path: 'mvpov',
    loadChildren: () =>
      import('./component/mvp-overlay/module/mvp-overlay.module').then(
        (m) => m.MvpOverlayModule
      ),
  },
  {
    path: 'obs1',
    loadChildren: () =>
      import('./component/obs1-overlay/module/obs1-overlay.module').then(
        (m) => m.Obs1OverlayModule
      ),
  },
  {
    path: 'obs2',
    loadChildren: () =>
      import('./component/obs2-overlay/module/obs2-overlay.module').then(
        (m) => m.Obs2OverlayModule
      ),
  },
  {
    path: 'caster-dashboard',
    loadChildren: () =>
      import('./component/casterDasboard/module/caster-dashboard.module').then(
        (m) => m.CasterDashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
