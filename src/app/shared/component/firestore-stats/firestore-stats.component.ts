import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import { forkJoin, Subscription } from 'rxjs';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { PlayerInfoList } from '../../models/playerInfo.model';
import { FirestoreStatsService } from '../../services/firestore-stats.service';

@Component({
  selector: 'app-firestore-stats',
  standalone: true,
  imports: [CommonModule, AppCustomMaterialModule],
  templateUrl: './firestore-stats.component.html',
  styleUrls: ['./firestore-stats.component.scss'],
})
export class FirestoreStatsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(private fs: FirestoreStatsService) {}

  ngOnInit(): void {
    this.fs.getTournamentCollection().subscribe((data: any) => {
      console.log(data);
    });

    // this.fs
    //   .createRobot('name', 'color', 'age')
    //   .then((data: any) => {
    //     console.log(data);
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //   });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
