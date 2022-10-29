import NBA from "nba";
import { DEFAULT_PLAYER_INFO } from "../constants";
import type { ExtendedInfoType, PlayerResType, ACTIONTYPE } from "../types";

/**
 * initialState object with playerInfo default id/name as Obi Toppin's 
 * @property playerInfo
 */

export const initialState = {
  // Obi Toppin as default profile
  playerInfo: DEFAULT_PLAYER_INFO,
};

/**
 * Method that returns an object for requested datewidth
 * @param state - initial state object
 * @param action - object containing type and payload
 * @returns switch statement returns success, error or default state
 */

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


/**
 * Method that checks singular/plural years of experience and returns Rookie if none found
 * @param item - years in nba number value
 * @returns string based on years in NBA
 */

const experience = (item: number) => {
  if (item < 1) return "Rookie";
  if (typeof item === "number" && item > 1) {
    return item + " Previous Seasons";
  } else return "1 Previous Season";
};


/**
 * Method that checks if college property contains HS in it's string value
 * @param key - college property name
 * @param value - college property value 
 * @returns 'High School' if 'HS' is found, else returns prop as is
 */

export const collegeCheck = (key: string, value: string | number) => {
  if (
    !value ||
    (typeof value === "string" && value.includes("HS"))
  ) {
    return "High School";
  } else return key;
};


/**
 * Method that grabs param properties and returns new implicit object
 * @param player - college property name
 * @returns object containing selected properties from param
 */

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


/**
 * Method that loads player info from NBA api 
 * @param playerName - First and Last name
 * @param dispatch - dispatch hook
 * @returns a fetched object
 */

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

/**
 * Method that handles form input, checks if player string is found and sends value to loadPlayerInfo method  
 * @param item - object containing player name to player prop
 * @param dispatch - dispatch hook
 * @returns a call to loadPlayerInfo if input is found else sends an alert to user
 */

export const handleInput = (item: { player: string }, dispatch: (value: ACTIONTYPE) => void) => {
  // regex to test if 2 words were submitted
  const regNameTest = /^[a-zA-Z]+ [a-zA-Z]+$/;
  let trimmedInput = item.player.trim();
  let newPlayer = NBA.findPlayer(trimmedInput);

  if (!regNameTest.test(trimmedInput)) {
    alert("Please enter the full name of the player.");
    return false;
  } else {
    if (newPlayer != undefined) {
      loadPlayerInfo(trimmedInput, dispatch);
    } else {
      alert("Player not found, Try again.");
    }
  }
};
