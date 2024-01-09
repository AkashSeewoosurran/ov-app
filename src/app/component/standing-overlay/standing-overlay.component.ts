import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { concat, concatAll, map, switchMap } from 'rxjs';
import { MatchStandingInfo } from 'src/app/shared/models/matchStanding.model';
import { PubgmDataService } from 'src/app/shared/services/pubgm-data.service';

@Component({
  selector: 'app-standing-overlay',
  templateUrl: './standing-overlay.component.html',
  styleUrls: ['./standing-overlay.component.scss'],
})
export class StandingOverlayComponent implements OnInit {
  dataSourceLeft: MatTableDataSource<MatchStandingInfo>;
  dataSourceRight: MatTableDataSource<MatchStandingInfo>;
  displayedColumns: string[] = [
    'rank',
    'teamLogo',
    'teamName',
    'placement',
    'elims',
    'total',
  ];

  constructor(private service: PubgmDataService) {}

  ngOnInit(): void {
    this.service
      .getDashboardData()
      .pipe(
        map((data) => {
          console.log(data);
          return data[3].matchStanding;
        }),
        switchMap((matchStanding) =>
          this.service.getMatchStanding(matchStanding)
        )
      )
      .subscribe((res: MatchStandingInfo[]) => {
        this.dataSourceLeft = new MatTableDataSource(res.slice(0, 8));
        this.dataSourceRight = new MatTableDataSource(res.slice(8, 16));
      });
  }

  handleImgError(event: any) {
    console.log(event);
    event.target.src = '';
  }
}
