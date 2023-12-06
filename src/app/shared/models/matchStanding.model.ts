export interface MatchStandingInfo {
  [teamName: string]: {
    teamName: string;
    rank: number;
    killNum: number;
    placementPoints: number;
    totalPoints: number;
    teamLogo: string | undefined;
  };
}

export interface MatchStanding {
  teamName: string;
  rank?: number;
  killNum?: number;
  placementPoints: number;
  totalPoints: number;
  teamLogo?: string;
}
