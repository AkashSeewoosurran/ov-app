import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamInfoList } from '../../models/teamInfo.model';
import { EliminationBug } from '../../models/eliminationBug.model';
import { SharedService } from '../../services/shared-service.service';
import {
  trigger,
  transition,
  style,
  animate,
  AnimationEvent,
} from '@angular/animations';

@Component({
  selector: 'app-annoucement-elims',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './annoucement-elims.component.html',
  styleUrls: ['./annoucement-elims.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AnnoucementElimsComponent implements OnInit {
  teamAnnouncedMap: { [teamId: string]: boolean } = {};
  private announcementsQueue: EliminationBug[] = [];
  private isAnnouncing = false;
  announcement: EliminationBug | undefined | null;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.teamInfoList$.subscribe((teamInfoList) => {
      this.handleTeamInfoList(teamInfoList);
    });
  }

  handleTeamInfoList(teamInfoList: TeamInfoList[]) {
    for (const team of teamInfoList) {
      const teamId = team.teamId;
      if (team.liveMemberNum === 0 && !this.teamAnnouncedMap[teamId]) {
        // Team has been eliminated and not yet announced
        for (const player of team.players) {
          if (player.rank > 0) {
            // Player has a rank, add announcement to queue
            this.announcementsQueue.push({
              teamName: team.teamName,
              rank: player.rank,
              killNum: team.killNum,
              teamId: team.teamId,
              logoPicUrl: team.logoPicUrl,
            });

            // Mark team as announced
            this.teamAnnouncedMap[teamId] = true;

            // Announce next if not already announcing
            this.announceNext();
            break;
          }
        }
      }
    }
  }

  announceNext() {
    if (this.isAnnouncing) {
      return;
    }
    if (this.announcementsQueue.length > 0) {
      this.isAnnouncing = true;
      this.announcement = this.announcementsQueue.shift();
      setTimeout(() => {
        this.announcement = null;
        this.isAnnouncing = false;
        this.announceNext();
      }, 3000);
    }
  }
}
