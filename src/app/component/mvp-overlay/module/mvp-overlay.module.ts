import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MvpOverlayRoutingModule } from './mvp-overlay-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MvpOverlayComponent } from '../mvp-overlay.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [MvpOverlayComponent],
  imports: [
    SharedModule,
    MvpOverlayRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class MvpOverlayModule {}
