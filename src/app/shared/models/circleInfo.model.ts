export interface CircleInfo {
  GameTime: number;
  CircleStatus: number;
  CircleIndex: number;
  Counter: number;
  MaxTime: number;
}

export interface CircleZone {
  GameTime?: number;
  circleInfo: CircleInfo;
}
