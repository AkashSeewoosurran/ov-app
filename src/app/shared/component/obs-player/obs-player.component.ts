import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { ObsPlayer, PlayerInfoList } from '../../models/playerInfo.model';
import { CommonModule } from '@angular/common';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { Observable, combineLatest, of, switchMap, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-obs-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './obs-player.component.html',
  styleUrls: ['./obs-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('slideDownUp', [
      state(
        'up',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'down',
        style({
          opacity: 0,
          transform: 'translateY(100%)',
        })
      ),
      transition('up <=> down', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class ObsPlayerComponent implements OnInit {
  currentPlayerInfo?: PlayerInfoList;
  showPlayerDetails: boolean;

  constructor(private service: PubgmDataService) {}

  ngOnInit(): void {
    this.service.getDashboardData().subscribe((data) => {
      this.showPlayerDetails = data[2].toggleValue;
    });
    combineLatest([
      this.service.getPlayerInfoList(),
      this.service.getObservingPlayer(),
    ]).subscribe(([playerInfoList, currentPlayer]) => {
      this.assignDataToCurrentPlayer(playerInfoList, currentPlayer);
    });
  }

  // ngOnInit(): void {
  //   this.service.getDashboardData().subscribe((data) => {
  //     this.showPlayerDetails = data[2].toggleValue;
  //   });
  //   combineLatest([
  //     this.service.getPlayerInfoList(),
  //     this.service.getObservingPlayer(),
  //   ]).subscribe(([playerInfoList, currentPlayer]) => {
  //     this.assignDataToCurrentPlayer(
  //       playerInfoList.playerInfoList,
  //       currentPlayer
  //     );
  //   });
  // }

  assignDataToCurrentPlayer(
    playersList: PlayerInfoList[],
    currentPlayer: ObsPlayer
  ): void {
    this.currentPlayerInfo = playersList.find(
      (player) => player.uId == currentPlayer.observingPlayer[0]
    );
    // const playerPath = `assets/players/${this.currentPlayerInfo?.uId}.png`;
    // // this.currentPlayerInfo!.character = playerPath;
    // this.checkImageExists(playerPath)
    //   .then(() => {
    //     this.currentPlayerInfo!.character = playerPath; // Remove optional chaining and nullish coalescing operator
    //   })
    //   .catch(() => {
    //     this.currentPlayerInfo!.character = 'assets/players/default.png'; // Update the property assignment
    //   });
  }

  // private checkImageExists(url: string): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.onload = () => resolve(true);
  //     img.onerror = () => reject(false);
  //     img.src = url;
  //   });
  // }
}
