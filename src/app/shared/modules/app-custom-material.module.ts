import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// Import other Angular Material modules here

const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatProgressBarModule,
  MatTabsModule,
  MatCardModule,
  MatToolbarModule,
  MatSelectModule,
  MatListModule,
  MatSlideToggleModule,
  MatBadgeModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class AppCustomMaterialModule {}
