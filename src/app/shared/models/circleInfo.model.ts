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

interface Circle {
  X: string;
  Y: string;
  Size: string;
}

export interface GameGlobalInfo {
  CircleArray: Circle[];
  PlaneStartLocX: string;
  PlaneStartLocY: string;
  PlaneStopLocX: string;
  PlaneStopLocY: string;
}

export interface GameGlobalSizeInfo {
  gameGlobalInfo: GameGlobalInfo;
}
