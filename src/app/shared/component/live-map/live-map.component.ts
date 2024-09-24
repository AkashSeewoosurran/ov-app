import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCustomMaterialModule } from '../../modules/app-custom-material.module';
import { PubgmDataService } from '../../services/pubgm-data.service';
import { PlayerInfoList } from '../../models/playerInfo.model';

import {
  GameGlobalInfo,
  GameGlobalSizeInfo,
} from '../../models/circleInfo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { teamColor } from '../../models/teamInfo.model';

export interface Result {
  teamId: number;
  closestTeamId: number;
  distanceKm: number;
  isFiring: boolean;
  isOtherFiring: boolean;
  playerFiring: string;
}

@Component({
  selector: 'app-live-map',
  standalone: true,
  imports: [CommonModule, AppCustomMaterialModule],
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.scss'],
})
export class LiveMapComponent implements OnInit {
  selectedMap: string = 'assets/erangel.jpg';
  scaleFactor = 175;
  playerStatsList: PlayerInfoList[];
  closestTeams: any[] = [];
  circleInfoData: GameGlobalSizeInfo;
  currentSnackbarTeamId: any;
  currentSnackbarRef: any;
  snackBarData: Result;

  constructor(
    private service: PubgmDataService,
    private snackBar: MatSnackBar
  ) {}

  // ngOnInit(): void {
  //   this.service.getPlayerInfoList().subscribe({
  //     next: (data) => {
  //       this.playerStatsList = data.playerInfoList;
  //       console.log('players : ', this.playerStatsList);
  //       this.calculateClosestTeams();
  //     },
  //   });

  //   this.service.getCircleSizeInfo().subscribe({
  //     next: (data) => {
  //       this.circleInfoData = data;
  //       console.log('circle : ', data);
  //     },
  //   });
  // }

  ngOnInit(): void {
    console.log('live-map.component.ts');
    this.service.getPlayerInfoList().subscribe({
      next: (data) => {
        this.playerStatsList = data;
        // console.log('players : ', this.playerStatsList);
        this.calculateClosestTeams();
      },
    });

    this.service.getCircleSizeInfo().subscribe({
      next: (data) => {
        this.circleInfoData = data;
      },
    });
  }

  getTeamColor(teamId: number): string {
    const team = teamColor.find((t) => t.teamId === teamId);
    return team ? team.color : '#000000b3'; // Default to white if no color is found
  }

  getPlayerPosition(coord: number): number {
    // Convert cm to km
    const km = coord * 0.00001;
    // Apply scaling to map coordinates to pixel coordinates
    // console.log(Math.round(km * this.scaleFactor));
    return Math.round(km * this.scaleFactor);
  }

  // Calculate the Euclidean distance between two points
  private calculateDistance(
    point1: { x: number; y: number; z: number },
    point2: { x: number; y: number; z: number }
  ): number {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) +
        Math.pow(point1.y - point2.y, 2) +
        Math.pow(point1.z - point2.z, 2)
    );
  }

  // Group players by their teamId
  private groupByTeamId(players: any[]): any {
    return players.reduce((teams, player) => {
      // Only consider players who are alive
      if (!(player.health == 0)) {
        const teamId = player.teamId;
        if (!teams[teamId]) {
          teams[teamId] = [];
        }
        teams[teamId].push(player);
      }
      return teams;
    }, {});
  }

  // Calculate the centroid of a team
  private getTeamCentroid(team: any[]): { x: number; y: number; z: number } {
    const sum = team.reduce(
      (acc, player) => {
        acc.x += player.location.x;
        acc.y += player.location.y;
        acc.z += player.location.z;
        return acc;
      },
      { x: 0, y: 0, z: 0 }
    );

    const count = team.length;

    return {
      x: sum.x / count,
      y: sum.y / count,
      z: sum.z / count,
    };
  }

  // Calculate the closest teams
  private calculateClosestTeams() {
    const teams = this.groupByTeamId(this.playerStatsList);
    const centroids = Object.keys(teams).map((teamId) => ({
      teamId: parseInt(teamId, 10),
      centroid: this.getTeamCentroid(teams[teamId]),
      isFiring: teams[teamId].some(
        (player: { isFiring: any }) => player.isFiring
      ),
    }));

    this.closestTeams = centroids.map((team) => {
      let closestTeam: number = 0;
      let isOtherFiring: boolean = false;
      let minDistance = Number.MAX_VALUE;

      centroids.forEach((otherTeam) => {
        if (team.teamId !== otherTeam.teamId) {
          const distance = this.calculateDistance(
            team.centroid,
            otherTeam.centroid
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestTeam = otherTeam.teamId;
          }
          if (otherTeam.isFiring) {
            isOtherFiring = true;
          }
        }
      });

      const result: Result = {
        teamId: team.teamId,
        closestTeamId: closestTeam,
        distanceKm: this.convertDistanceToKm(minDistance),
        isFiring: team.isFiring,
        isOtherFiring: isOtherFiring,
        playerFiring:
          this.playerStatsList.find(
            (player) => player.teamId === team.teamId && player.isFiring
          )?.playerName || '',
      };

      return result;
    });

    const defaultTeam: Result = {
      teamId: 0,
      closestTeamId: 0,
      distanceKm: 0,
      isFiring: false,
      isOtherFiring: false,
      playerFiring: '',
    };

    this.closestTeams.sort((a, b) => a.distanceKm - b.distanceKm);

    this.snackBarData =
      this.closestTeams.find(
        (team) => team.distanceKm < 100 && team.isFiring
      ) || defaultTeam;
  }

  // Convert distance from cm to kilometers
  private convertDistanceToKm(distance: number): number {
    return distance * 0.01; // Convert cm to km
  }

  // Get circle size in pixels
  getCircleSize(size: string): number {
    const km = parseFloat(size) * 0.00001;
    return Math.round(km * this.scaleFactor);
  }

  // Get circle position (centered)
  getCirclePosition(coord: string): number {
    const position = this.getPlayerPosition(parseFloat(coord));
    const size = this.getCircleSize(coord);
    return position - size / 2; // Center the circle
  }

  getCircleDiameter(size: string): number {
    const km = parseFloat(size) * 0.00001;
    return Math.round(2 * km * this.scaleFactor); // Diameter = 2 * Radius
  }

  // Get the circle's X position (centered)
  getCirclePositionX(xCoord: string, size: string): number {
    const xPos = this.getPlayerPosition(parseFloat(xCoord));
    const radius = this.getCircleDiameter(size) / 2;
    return xPos - radius; // Center the circle
  }

  // Get the circle's Y position (centered)
  getCirclePositionY(yCoord: string, size: string): number {
    const yPos = this.getPlayerPosition(parseFloat(yCoord));
    const radius = this.getCircleDiameter(size) / 2;
    return yPos - radius; // Center the circle
  }

  getPositionX(coord: string): number {
    const km = parseFloat(coord) * 0.00001;
    return Math.round(km * this.scaleFactor);
  }

  getPositionY(coord: string): number {
    const km = parseFloat(coord) * 0.00001;
    return Math.round(km * this.scaleFactor);
  }

  getPlanePathLength(
    startX: string,
    startY: string,
    stopX: string,
    stopY: string
  ): number {
    const x1 = this.getPositionX(startX);
    const y1 = this.getPositionY(startY);
    const x2 = this.getPositionX(stopX);
    const y2 = this.getPositionY(stopY);

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  getPlanePathRotation(
    startX: string,
    startY: string,
    stopX: string,
    stopY: string
  ): string {
    const x1 = this.getPositionX(startX);
    const y1 = this.getPositionY(startY);
    const x2 = this.getPositionX(stopX);
    const y2 = this.getPositionY(stopY);

    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    return `rotate(${angle}deg)`;
  }

  private handleSnackbar(result: any): void {
    // Check if the snackbar should be shown or updated
    if (result.distanceKm < 100 && result.isFiring) {
      // Check if the snackbar is already showing for this team
      if (this.currentSnackbarTeamId !== result.teamId) {
        // Close the previous snackbar if it exists
        if (this.currentSnackbarRef) {
          this.currentSnackbarRef.dismiss();
        }

        // Show a new snackbar
        this.currentSnackbarRef = this.snackBar.open(
          `Team ${result.teamId} is firing and very close to another team!`,
          'Close'
        );

        // Update the current snackbar state
        this.currentSnackbarTeamId = result.teamId;
      }
    } else {
      // Close the snackbar if distance >= 100 or not firing
      if (this.currentSnackbarRef) {
        this.currentSnackbarRef.dismiss();
        this.currentSnackbarRef = null;
        this.currentSnackbarTeamId = null;
      }
    }
  }
}
