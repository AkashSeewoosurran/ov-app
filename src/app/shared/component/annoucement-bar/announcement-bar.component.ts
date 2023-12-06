import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerInfoList } from '../../models/playerInfo.model';
import { SharedService } from '../../services/shared-service.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-announcement-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement-bar.component.html',
  styleUrls: ['./announcement-bar.component.scss'],
  animations: [
    trigger('slideInOutAnimationRight', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in')),
    ]),
  ],
})
export class AnnouncementBarComponent implements OnInit {
  announcementMessage: string = '';
  player: PlayerInfoList;
  killNumAnnouncementMade: boolean = false;
  killNumByGrenadeAnnouncementMade: boolean = false;
  killNumInVehicleAnnouncementMade: boolean = false;
  slideAnnouncement: boolean = false;

  emptyPlayer: PlayerInfoList = {
    uId: '',
    playerName: '',
    playerOpenId: '',
    picUrl: '',
    showPicUrl: false,
    teamId: 0,
    teamName: '',
    character: '',
    isFiring: false,
    bHasDied: false,
    health: 0,
    healthMax: 0,
    liveState: 0,
    killNum: 0,
    killNumBeforeDie: 0,
    playerKey: 0,
    gotAirDropNum: 0,
    maxKillDistance: 0,
    damage: 0,
    killNumInVehicle: 0,
    killNumByGrenade: 0,
    rank: 0,
    isOutsideBlueCircle: false,
    inDamage: 0,
    heal: 0,
    headShotNum: 0,
    survivalTime: 0,
    driveDistance: 0,
    marchDistance: 0,
    assists: 0,
    outsideBlueCircleTime: 0,
    knockouts: 0,
    rescueTimes: 0,
    useSmokeGrenadeNum: 0,
    useFragGrenadeNum: 0,
    useBurnGrenadeNum: 0,
    useFlashGrenadeNum: 0,
  };

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.playerInfoList$.subscribe((playerInfoList) => {
      if (playerInfoList) {
        this.announceFirstBlood(playerInfoList);
      }
    });
  }

  announceFirstBlood(players: PlayerInfoList[]) {
    for (let player of players) {
      if (player.killNum === 1 && !this.killNumAnnouncementMade) {
        this.makeAnnouncement(player);
        this.killNumAnnouncementMade = true;
        this.announcementMessage = 'First Blood';
        this.slideAnnouncement = true;
      }
      if (
        player.killNumByGrenade === 1 &&
        !this.killNumByGrenadeAnnouncementMade
      ) {
        this.makeAnnouncement(player);
        this.killNumByGrenadeAnnouncementMade = true;
        this.announcementMessage = 'First Grenade Kill';
        this.slideAnnouncement = true;
      }
      if (
        player.killNumInVehicle === 1 &&
        !this.killNumInVehicleAnnouncementMade
      ) {
        this.makeAnnouncement(player);
        this.killNumInVehicleAnnouncementMade = true;
        this.announcementMessage = 'First Vehicle Kill';
        this.slideAnnouncement = true;
      }
    }
  }

  makeAnnouncement(player: PlayerInfoList) {
    this.player = player;
    setTimeout(() => {
      this.player = this.emptyPlayer;
      this.announcementMessage = '';
      this.slideAnnouncement = false;
    }, 5000); // announcement disappears after 5 seconds
  }
}
