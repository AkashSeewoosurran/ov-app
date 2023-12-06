import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PlayerInfoList } from '../../models/playerInfo.model';
import { SharedService } from '../../services/shared-service.service';

@Component({
  selector: 'app-player-top5',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './player-top5.component.html',
  styleUrls: ['./player-top5.component.scss'],
})
export class PlayerTop5Component implements OnInit {
  top5Columns: string[] = ['playerName', 'rank', 'damage'];
  top5playersDamage: MatTableDataSource<PlayerInfoList>;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.playerInfoList$.subscribe({
      next: (playerInfoList: PlayerInfoList[]) => {
        this.top5playersDamage = new MatTableDataSource(
          playerInfoList.sort((a, b) => b.damage - a.damage).slice(0, 5)
        );
      },
    });
  }
}
