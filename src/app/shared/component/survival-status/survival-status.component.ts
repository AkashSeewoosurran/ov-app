import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survival-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survival-status.component.html',
  styleUrls: ['./survival-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurvivalStatusComponent {}
