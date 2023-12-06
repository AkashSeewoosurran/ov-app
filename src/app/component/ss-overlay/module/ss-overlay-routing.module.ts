import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SsOverlayComponent } from '../ss-overlay.component';

const routes: Routes = [{ component: SsOverlayComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SsOverlayRoutingModule {}
