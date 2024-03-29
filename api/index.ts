import type { ACTIONTYPE } from "../types/routeTypes";
import type { GameSummaryType } from "../types/scoreTypes";

/**
 * API object constant
 * @property base - for summary-like teams json
 * @property details - for more statistics and larger object return
 */

export const API_URL = {
  base: 'http://data.nba.net/prod/',
  details: 'https://data.nba.com/',
  player: 'http://data.nba.net/data/10s/prod/v2/2022/players.json',
  playerDetails: 'http://data.nba.net/v2015/json/mobile_teams/nba/2022/players'
};

export const getPlayer = async () => {
  const response = await fetch(API_URL.player);
  const data = await response.json();
  return {
    data: data.league.standard,
    status: response.status
  };
};

/**
 * Method that fetches data from nba's apis, dispatch function sends data to connected state object
 * @param playerObj - playerobj containing basic player data
 * @param dispatch - second parameter in reducer HOC, accepts obj with type and payload props
 * @dispatches fetched api data to state playerObj
 */

export const findPlayer = async (playerObj: any, dispatch: (_value: ACTIONTYPE) => void) => {
  if (Object.prototype.hasOwnProperty.call(playerObj, 'personId')) {
    playerObj.pid = playerObj.personId;
  }
  const response = await fetch(`${API_URL.playerDetails}/playercard_${playerObj.pid}_02.json`);
  const data = await response.json();
  dispatch({
    type: "FETCH_SUCCESS",
    payload: { ...data }
  });
  return {
    data,
    status: response.status,
  };
  //playercard_2544_02.json
  //return firstName + lastName;
};

/**
 * Method that returns teams standing object
 * @returns response object's json
 */

export const getStandings = async () => {
  const response = await fetch(`${API_URL.base}v1/current/standings_all.json`);
  const data = await response.json();
  return {
    data,
    status: response.status,
  };
};

/**
 * Method that fetches data and dispatches it to state object
 * @param date - format YYYYMMDD
 * @param dispatch - dispatch function from useDispatch
 * @returns response object's json
 */

export const getGamesByDate = async (date: string, dispatch: any) => {
  const response = await fetch(`${API_URL.base}v2/${date}/scoreboard.json`);
  const data = await response.json();
  const res = response.status
  const { games }: { games: GameSummaryType[] } = data;

  if (res == 200 && games != undefined) {
    dispatch({
      type: "FETCH_SUCCESS",
      payload: { ...games }
    })
  } else {
    dispatch({
      type: "FETCH_ERROR"
    })
  }
};

/**
 * Method that fetches more game data than base api's url
 * @param year - year of requested game
 * @param gameId - ID string of requested game
 * @returns object with data and response properties
 */

export const getGameDetails = async (
  year: string | undefined,
  gameId: string | undefined,
) => {
  const response = await fetch(
    `${API_URL.details}/data/10s/v2015/json/mobile_teams/nba/${year}/scores/gamedetail/${gameId}_gamedetail.json`,
  );
  const data = await response.json();
  return {
    data,
    status: response.status,
  };
};
