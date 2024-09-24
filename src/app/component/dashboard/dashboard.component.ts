import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelTeamInfo, teamColor } from 'src/app/shared/models/teamInfo.model';
import { PubgmDataService } from 'src/app/shared/services/pubgm-data.service';
import { WorkBook, WorkSheet, read, utils } from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  excelData: ExcelTeamInfo[] = [];
  displayedColumns: string[] = [
    'teamId',
    'teamLogo64',
    'teamName',
    'teamTag',
    'member1',
    'member2',
    'member3',
    'member4',
    'member5',
  ];
  dataSource: MatTableDataSource<ExcelTeamInfo>;
  localData: ExcelTeamInfo[] = [];
  showTop5Kills: boolean;
  showSurvivalStatus: boolean;
  showPlayerDetails: boolean;

  constructor(
    private service: PubgmDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.getDashboardData().subscribe((data) => {
      this.showTop5Kills = data[0].toggleValue;
      this.showSurvivalStatus = data[1].toggleValue;
      this.showPlayerDetails = data[2].toggleValue;
    });
    this.getExcelTeamInfoList();
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

  getExcelTeamInfoList() {
    this.service.getExcelTeamInfoList().subscribe({
      next: (res: ExcelTeamInfo[]) => {
        this.localData = res;
      },
      complete: () => {
        this.assignDataSource(this.localData);
      },
    });
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.excelData = utils.sheet_to_json<ExcelTeamInfo>(ws);

      console.log(this.excelData);
      this.excelData.forEach((team) => {
        team.teamColor =
          teamColor.find((t) => t.teamId === team.teamId)?.color ?? '';
        team.teamLogo = 'assets/Logo/' + team.teamId + '.png';
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveData() {
    this.service.saveExcelTeamInfoList(this.excelData).subscribe({
      complete: () => {
        this.getExcelTeamInfoList();
      },
    });
  }

  assignDataSource(res: ExcelTeamInfo[]) {
    this.dataSource = new MatTableDataSource<ExcelTeamInfo>();
    this.dataSource.data = res.sort((a, b) => a.teamId - b.teamId);
    this.cdr.detectChanges();
  }

  deleteExcelDataSequentially() {
    const teamIds: number[] = this.localData.map((team) => team.id);
    this.service.deleteTeamsSequentially(teamIds).subscribe({
      next: (res) => {
        console.log(res);
      },
      complete: () => {
        this.getExcelTeamInfoList();
      },
    });
  }
}
