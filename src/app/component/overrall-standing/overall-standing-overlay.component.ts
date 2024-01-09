import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OverallStandingInfo } from 'src/app/shared/models/matchStanding.model';
import { PubgmDataService } from 'src/app/shared/services/pubgm-data.service';

@Component({
  selector: 'app-overall-standing-overlay',
  templateUrl: './overall-standing-overlay.component.html',
  styleUrls: ['./overall-standing-overlay.component.scss'],
})
export class OverallStandingOverlayComponent implements OnInit {
  dataSourceLeft: MatTableDataSource<OverallStandingInfo>;
  dataSourceRight: MatTableDataSource<OverallStandingInfo>;
  displayedColumnsLeft: string[] = [
    'lrank',
    'lteamLogo',
    'lteamName',
    'lwins',
    'lplacement',
    'lelims',
    'ltotal',
  ];
  displayedColumnsRight: string[] = [
    'rrank',
    'rteamLogo',
    'rteamName',
    'rwins',
    'rplacement',
    'relims',
    'rtotal',
  ];

  constructor(private service: PubgmDataService) {}

  ngOnInit(): void {
    this.service
      .getOverallStanding()
      .subscribe((res: OverallStandingInfo[]) => {
        this.dataSourceLeft = new MatTableDataSource(res.slice(0, 5));
        this.dataSourceRight = new MatTableDataSource(res.slice(5, 16));
      });
  }
}
