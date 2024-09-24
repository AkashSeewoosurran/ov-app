import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MvpOverlayComponent } from '../mvp-overlay.component';

const routes: Routes = [{ component: MvpOverlayComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MvpOverlayRoutingModule {}
