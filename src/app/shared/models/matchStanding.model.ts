export interface MatchStandingInfo {
  [teamName: string]: {
    teamName: string;
    rank: number;
    killNum: number;
    placementPoints: number;
    totalPoints: number;
    teamLogo: string | undefined;
    teamId: number;
  };
}

export interface OverallStandingInfo {
  teamName: string;
  rank: number;
  killNum: number;
  placementPoints: number;
  teamId: number;
  totalPoints: number;
  teamLogo: string | undefined;
  wins: number;
}

export interface MatchStanding {
  teamName: string;
  rank?: number;
  killNum?: number;
  placementPoints: number;
  totalPoints: number;
  teamLogo?: string;
}

export interface Matches {
  id: number;
  name: string;
}

export const MATCHES: Matches[] = [
  { id: 1, name: 'Match 1' },
  { id: 2, name: 'Match 2' },
  { id: 3, name: 'Match 3' },
  { id: 4, name: 'Match 4' },
  { id: 5, name: 'Match 5' },
  { id: 6, name: 'Match 6' },
  { id: 7, name: 'Match 7' },
  { id: 8, name: 'Match 8' },
  { id: 9, name: 'Match 9' },
  { id: 10, name: 'Match 10' },
  { id: 11, name: 'Match 11' },
  { id: 12, name: 'Match 12' },
];
