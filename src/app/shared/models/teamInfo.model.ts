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

export interface LocalTeamInfo {
  teamId: number;
  teamName: string;
  teamLogo: string;
  teamTag: string;
}

export interface ExcelTeamInfo {
  teamId: number;
  teamName: string;
  teamLogo64: string;
  teamLogo128: string;
  teamLogo256: string;
  teamTag: string;
  id: number;
}
