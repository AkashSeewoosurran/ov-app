import { PlayerStatus } from './playerInfo.model';

export interface TeamInfoList {
  teamId: number;
  teamName: string;
  isShowLogo: boolean;
  logoPicUrl: string;
  killNum: number;
  liveMemberNum: number;
  teamTag: string;
  players: PlayerStatus[];
}

export interface lstTeamInfo {
  teamInfoList: TeamInfoList[];
  gameStartTime: number;
  fightingStartTime: number;
  finishedStartTime: number;
  gameId: string;
  currentTime: string;
}

export interface LocalTeamInfo {
  teamId: number;
  teamName: string;
  teamLogo: string;
  teamTag: string;
  teamLogo64: string;
  teamLogo128: string;
  teamLogo256: string;
}

export interface ExcelTeamInfo {
  teamId: number;
  teamName: string;
  teamLogo64: string;
  teamLogo128: string;
  teamLogo256: string;
  teamTag: string;
  teamLogo: string;
  teamColor: string;
  id: number;
}

export interface TeamBackPackInfo {
  teamBackPackList: TeamBackPackList[];
}

interface TeamBackPackList {
  mainWeapon1Id: number;
  mainWeapon1AmmoNumInClip: number;
  mainWeapon2Id: number;
  mainWeapon2AmmoNumInClip: number;
  items: ItemCounts;
  teamId: number;
  playerKey: string;
}

interface ItemCounts {
  firstAidKit: number;
  bandage: number;
  medKit: number;
  energyDrink: number;
  painkiller: number;
  adrenaline: number;
  grenade: number;
  flashbang: number;
  smokeGrenade: number;
  molotovCocktail: number;
}

export const teamColor: { teamId: number; color: string }[] = [
  { teamId: 1, color: 'rgba(255, 0, 0, 0.9)' }, // Red
  { teamId: 2, color: 'rgba(0, 255, 0, 0.9)' }, // Green
  { teamId: 3, color: 'rgba(0, 0, 255, 0.9)' }, // Blue
  { teamId: 4, color: 'rgba(255, 255, 0, 0.9)' }, // Yellow
  { teamId: 5, color: 'rgba(255, 0, 255, 0.9)' }, // Magenta
  { teamId: 6, color: 'rgba(0, 255, 255, 0.9)' }, // Cyan
  { teamId: 7, color: 'rgba(255, 165, 0, 0.9)' }, // Orange
  { teamId: 8, color: 'rgba(128, 0, 128, 0.9)' }, // Purple
  { teamId: 9, color: 'rgba(0, 128, 0, 0.9)' }, // Dark Green
  { teamId: 10, color: '#850E3D' }, // Maroon
  { teamId: 11, color: '#CFA613' }, // Teal
  { teamId: 12, color: '#42A5A3' }, // Navy
  { teamId: 13, color: '#6D7E89' }, // Olive
  { teamId: 14, color: '#FF9B00' }, // Gray
  { teamId: 15, color: '#3B3F49' }, // Silver
  { teamId: 16, color: '#E86F8D' }, // Black
  { teamId: 17, color: '#015057' }, // Pink
  { teamId: 18, color: '#7A4008' }, // Indigo
  { teamId: 19, color: '#7F9B0F' }, // Red-Orange
  { teamId: 20, color: '#774E90' }, // Spring Green
  { teamId: 21, color: '#31796B' }, // Deep Pink
  { teamId: 22, color: '#6B758D' }, // Light Sea Green
  { teamId: 23, color: '#A46B5A' }, // Medium Orchid
  { teamId: 24, color: '#23224E' }, // Gold
  { teamId: 25, color: '#76771D' }, // Dark Cyan
];
