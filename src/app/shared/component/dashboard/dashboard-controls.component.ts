import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import { TeamInfoList } from '../../models/teamInfo.model';

@Component({
  selector: 'app-dashboard-controls',
  standalone: true,
  imports: [CommonModule, AppCustomMaterialModule],
  templateUrl: './dashboard-controls.component.html',
  styleUrls: ['./dashboard-controls.component.scss'],
})
export class DashboardControlsComponent implements OnInit {
  showTop5Kills: boolean;
  showSurvivalStatus: boolean;
  showPlayerDetails: boolean;
  teamInfoList: TeamInfoList[];

  constructor(private service: PubgmDataService) {}

  ngOnInit(): void {
    this.service.getTeamInfoList().subscribe((data: TeamInfoList[]) => {
      console.log(data);
      this.teamInfoList = data;
    });

    this.service.getDashboardData().subscribe((data) => {
      this.showTop5Kills = data[0].toggleValue;
      this.showSurvivalStatus = data[1].toggleValue;
      this.showPlayerDetails = data[2].toggleValue;
    });
  }

  onToggleChange(
    event: MatSlideToggleChange,
    toggleId: number,
    toggleName: string
  ) {
    const toggleValue = event.checked;
    const toggleData = {
      toggleName: toggleName,
      toggleValue: toggleValue,
    };
    this.service.updateDashboardData(toggleData, toggleId).subscribe();
  }
}
