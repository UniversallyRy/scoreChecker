import type { ScoreBoardType } from "../types";
import type { GameSummaryType } from "../types/gameSummary";

/**
 * API object constant
 * @property base - for summary-like teams json 
 * @property details - for more statistics and larger object return
 */

export const API_URL = {
  base: 'http://data.nba.net/prod/',
  details: 'https://data.nba.com/',
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
 * Method that returns an object for requested datewidth
 * @param date - format YYYYMMDD
 * @returns response object's json
 */

export const getGamesByDate = async (date: string | undefined) => {
  const response = await fetch(`${API_URL.base}v2/${date}/scoreboard.json`);
  const dataJson = await response.json();
  const { games }: { games: ScoreBoardType } = dataJson;
  return {
    data: games,
    status: response.status,
  };
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

