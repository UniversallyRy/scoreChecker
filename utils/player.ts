import { findPlayer } from "../api";
import { NBARoster } from "./playerList";
import { DEFAULT_PLAYER_INFO } from "../constants";
import type { ACTIONTYPE } from "../types/routeTypes";

/**
 * initialState object with playerInfo default id/name as Obi Toppin's
 * @property playerInfo
 */

export const initialState = {
  // Obi Toppin as default profile
  playerInfo: DEFAULT_PLAYER_INFO,
};

const gameInitialState = {
  games: [],
};
/**
 * useReducer reducer method that finds dipatch's action.type that mamtches switch case
 * @param state - initial state object
 * @param action - object containing type and payload
 * @returns switch statement returns success, error or default state
 */

export const gamesReducer = (state: typeof gameInitialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        games: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        games: {},
        error: "Something went wrong",
      };
    default:
      return state;
  }
};

/**
 * useReducer reducer method that finds dipatch's action.type that mamtches switch case
 * @param state - initial state object
 * @param action - object containing type and payload
 * @returns switch statement returns success, error or default state
 */

export const playerReducer = (state: typeof initialState, action: ACTIONTYPE) => {
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

export const getPlayerInfo = (player: any) => {
  return {
    Team: player.tc + " " + player.tn,
    Height: player.ht,
    Weight: player.wt,
    PPG: player.ca.pts,
    RPG: player.ca.reb,
    APG: player.ca.ast,
    Experience: experience(player.y),
    Position: player.pos,
    "Jersey #": player.num,
    College: player.hcc,
    //   "Draft Round": player.dr,
    //   "Draft Number": player.dn,
    "Draft Year": player.dy,
    //   Country: player.country
  };
};

/**
 * Method that handles form input, checks if player string is found and sends value to loadPlayerInfo method
 * @param item - object containing player name to player prop
 * @param dispatch - dispatch hook
 * @returns a call to loadPlayerInfo if input is found else sends an alert to user
 */

export const handleInput = (item: { player: string }, dispatch: (_value: ACTIONTYPE) => void) => {
  // regex to test if 2 words were submitted
  const regNameTest = /^[a-zA-Z]+ [a-zA-Z]+$/;
  let trimmedInput = item.player.trim();
  let [firstName, lastName] = item.player.split(" ");
  const playerSearch = NBARoster.find(item => {
    if (item.firstName == firstName && item.lastName == lastName) {
      return item;
    } else {
      return undefined;
    }
  });

  if (!regNameTest.test(trimmedInput)) {
    alert("Please enter the full name of the player.");
    return false;
  } else {
    if (playerSearch != undefined) {
      findPlayer(playerSearch, dispatch);
    } else {
      alert("Player not found, Try again.");
    }
  }
};
