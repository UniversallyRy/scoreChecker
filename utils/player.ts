import NBA from "nba";
import { DEFAULT_PLAYER_INFO } from "../constants";
import type { ExtendedInfoType, PlayerResType, ACTIONTYPE } from "../types";

export const initialState = {
  // Obi Toppin as default profile
  playerInfo: DEFAULT_PLAYER_INFO,
};

export const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        playerInfo: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        playerInfo: {},
        error: "Something went wrong",
      };
    default:
      return state;
  }
};

const experience = (item: number) => {
  if (item < 1) return "Rookie";
  if (typeof item === "number" && item > 1) {
    return item + " Previous Seasons";
  } else return "1 Previous Season";
};

export const getPlayerInfo = (player: ExtendedInfoType) => {
  return {
    Team: player.teamCity + " " + player.teamName,
    Height: player.height,
    Weight: player.weight,
    PPG: player.pts,
    RPG: player.reb,
    APG: player.ast,
    Season: player.timeFrame,
    Experience: experience(player.seasonExp),
    Position: player.position,
    "Jersey #": player.jersey,
    College: player.school,
    "Draft Round": player.draftRound,
    "Draft Number": player.draftNumber,
    "Draft Year": player.draftYear,
    Country: player.country
  };
};

export const loadPlayerInfo = (playerName: string, dispatch: (value: ACTIONTYPE) => void) => {
  NBA.stats
    .playerInfo({ PlayerID: NBA.findPlayer(playerName).playerId })
    .then((res: PlayerResType) => {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: Object.assign(
          res.commonPlayerInfo[0],
          res.playerHeadlineStats[0]
        ),
      });
    })
    .catch((error: string) => {
      dispatch({ type: "FETCH_ERROR", payload: error });
    });
};
