import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { ObsPlayer, PlayerInfoList } from '../../models/playerInfo.model';
import { CommonModule } from '@angular/common';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { Observable, combineLatest, of, switchMap, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-obs-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './obs-player.component.html',
  styleUrls: ['./obs-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ObsPlayerComponent implements OnInit {
  currentPlayerInfo?: PlayerInfoList;

  constructor(private service: PubgmDataService , private cdr : ChangeDetectorRef) {}


  ngOnInit(): void {
    combineLatest([
      this.service.getPlayerInfoList(),
      this.service.getObservingPlayer(),
    ]).subscribe(([playerInfoList, currentPlayer]) => {
      this.assignDataToCurrentPlayer(playerInfoList , currentPlayer);
    }
    );

  }



  assignDataToCurrentPlayer(playersList : PlayerInfoList[] , currentPlayer : ObsPlayer): void {
        this.currentPlayerInfo = playersList.find(player => player.uId == currentPlayer.observingPlayer[0]);
        const playerPath = `assets/players/${this.currentPlayerInfo?.uId}.jpg`;
        this.checkImageExists(playerPath)
          .then(() => {
            this.currentPlayerInfo!.character = playerPath; // Remove optional chaining and nullish coalescing operator
          })
          .catch(() => {
            this.currentPlayerInfo!.character = 'assets/players/default.png'; // Update the property assignment
          });
        console.log("currentPlayerInfo: ", this.currentPlayerInfo);
  }

  private checkImageExists(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  }
}
