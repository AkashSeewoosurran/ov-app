export interface PlayerInfoList {
  uId: string;
  playerName: string;
  playerOpenId: string;
  picUrl: string;
  showPicUrl: boolean;
  teamId: number;
  teamName: string;
  character: string;
  isFiring: boolean;
  bHasDied: boolean;
  location: Location;
  health: number;
  healthMax: number;
  liveState: number;
  killNum: number;
  killNumBeforeDie: number;
  playerKey: number;
  gotAirDropNum: number;
  maxKillDistance: number;
  damage: number;
  killNumInVehicle: number;
  killNumByGrenade: number;
  rank: number;
  isOutsideBlueCircle: boolean;
  inDamage: number;
  heal: number;
  headShotNum: number;
  survivalTime: number;
  driveDistance: number;
  marchDistance: number;
  assists: number;
  outsideBlueCircleTime: number;
  knockouts: number;
  rescueTimes: number;
  useSmokeGrenadeNum: number;
  useFragGrenadeNum: number;
  useBurnGrenadeNum: number;
  useFlashGrenadeNum: number;
}

export interface lstPlayerInfo {
  playerInfoList: PlayerInfoList[];
}

export interface PlayerStatus {
  uId: string;
  teamName: string;
  playerName: string;
  isOutsideBlueCircle: boolean;
  health: number;
  liveState: number;
  rank: number;
}

export interface ObsPlayer {
  observingPlayer: { 0: string; GunADS: boolean };
}

export interface mvpPlayer {
  uId: string;
  playerName: string;
  teamName: string;
  damage: number;
  assists: number;
  survivalTime: string;
  inDamage: number;
  knockouts: number;
  killNum: number;
  rank: number;
  character: string;
  teamLogo: string;
}

export interface PlayerMatchInfo {
  playerName: string;
  teamLogo: string;
  damage: number;
  assists: number;
  inDamage: number;
  knockouts: number;
  killNum: number;
  rank: number;
}

export interface Location {
  x: number;
  y: number;
  z: number;
}
