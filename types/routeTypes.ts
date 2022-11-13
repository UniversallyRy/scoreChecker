import type { GameType } from "./scoreTypes";
import type { PlayerInfoType } from "./playerTypes";


export type ACTIONTYPE =
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_ERROR"; payload: string };

export type GameRouteType = {
  "key": string;
  "name": string;
  "params": {
    "gameId": string;
    "scoreInfo": GameType
  },
  "path": undefined
}


export type StatsRouteType = {
  "key": string;
  "name": string;
  "params": {
    playerId: string
    playerInfo: PlayerInfoType
  },
  "path": undefined;
}
