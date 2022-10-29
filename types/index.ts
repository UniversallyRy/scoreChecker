import type { GameType } from "./scores";

export type FindPLayerType = {
  "error": "",
  "playerInfo": {
    "pl": {
      "ca": {
        "ast": 0.8,
        "blk": 0.36,
        "dreb": 2.32,
        "fgp": 0.521,
        "ftp": 0.753,
        "gp": 134,
        "gs": 10,
        "min": 14.3,
        "oreb": 0.71,
        "pf": 1.17,
        "pts": 6.7,
        "reb": 3.03,
        "sa": {
          "ast": 0.5,
          "blk": 0.24,
          "dreb": 1.8,
          "fgp": 0.498,
          "ftp": 0.731,
          "gp": 62,
          "gs": 0,
          "min": 11,
          "oreb": 0.4,
          "pf": 0.89,
          "pts": 4.1,
          "reb": 2.2,
          "spl": [],
          "stl": 0.27,
          "ta": "NYK",
          "tc": "New York",
          "tid": 1610612752,
          "tn": "Knicks",
          "tov": 0.37,
          "tpp": 0.306,
          "val": "2020-21",
        }[]
        "spl": [],
        "stl": 0.31,
        "tov": 0.59,
        "tpp": 0.307,
      },
      "ct": {
        "ast": 106,
        "blk": 48,
        "dreb": 311,
        "fga": 682,
        "fgm": 355,
        "fta": 150,
        "ftm": 113,
        "gp": 134,
        "gs": 10,
        "min": 1913,
        "oreb": 95,
        "pf": 157,
        "pts": 901,
        "reb": 406,
        "spl": [],
        "st": {
          "ast": 29,
          "blk": 15,
          "dreb": 112,
          "fga": 209,
          "fgm": 104,
          "fta": 26,
          "ftm": 19,
          "gp": 62,
          "gs": 0,
          "min": 683,
          "oreb": 26,
          "pf": 55,
          "pts": 253,
          "reb": 138,
          "spl": [],
          "stl": 17,
          "ta": "NYK",
          "tc": "New York",
          "tid": 1610612752,
          "tn": "Knicks",
          "tov": 23,
          "tpa": 85,
          "tpm": 26,
          "val": "2020-21",
        }[]
        "stl": 42,
        "tov": 79,
        "tpa": 254,
        "tpm": 78,
      },
      "dob": "1998-03-04",
      "dy": "2020",
      "fn": "Obi",
      "gls": {
        "glt": [],
      },
      "hcc": "Dayton/USA",
      "ht": "6-9",
      "ln": "Toppin",
      "ng": {
        "etm": "2022-10-19T19:30:00",
        "gdte": "2022-10-19",
        "gid": "0022200009",
        "ota": "MEM",
        "otc": "Memphis",
        "otid": 1610612763,
        "otn": "Grizzlies",
      },
      "num": "1",
      "pc": "obi_toppin",
      "pid": 1630167,
      "pos": "F",
      "ta": "NYK",
      "tc": "New York",
      "tid": 1610612752,
      "tn": "Knicks",
      "wt": 220,
      "y": 2,
    },
  },
}

export type ACTIONTYPE =
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_ERROR"; payload: string };

export type PlayerProfileType = {
  playerName?: string;
  playerId: number;
  fullname: string;
  teamCity?: string
  teamName?: string;
  teamAbbreviation: string;
  height?: string;
  weight?: string;
  pts?: string;
  ast?: string;
  reb?: string;
}

export type ExtendedInfoType = {
  teamCity: string
  teamName: string;
  teamAbbreviation: string;
  height: string;
  weight: string;
  pts: number;
  ast: number;
  reb: number;
  position: string;
  seasonExp: number;
  timeFrame: string;
  jersey: number;
  school: string;
  draftNumber: string;
  draftRound: string;
  draftYear: string;
  country: string;
}

export type PlayerInfoType = {
  "birthdate": string;
  "country": string;
  "displayFiLast": string;
  "displayFirstLast": string;
  "displayLastCommaFirst": string;
  "dleagueFlag": string;
  "draftNumber": string;
  "draftRound": string;
  "draftYear": string;
  "firstName": string;
  "fromYear": number;
  "gamesPlayedCurrentSeasonFlag": string;
  "gamesPlayedFlag": string;
  "greatest75Flag": string;
  "height": string;
  "jersey": string;
  "lastAffiliation": string;
  "lastName": string;
  "nbaFlag": string;
  "personId": number;
  "playerSlug": string;
  "playercode": string;
  "position": string;
  "rosterstatus": string;
  "school": string;
  "seasonExp": number;
  "teamAbbreviation": string;
  "teamCity": string;
  "teamCode": string;
  "teamId": number;
  "teamName": string;
  "toYear": number;
  "weight": string;
}[]

export type PlayerStatsType = {
  "ast": number;
  "pie": number;
  "playerId": number;
  "playerName": string;
  "pts": number;
  "reb": number;
  "timeFrame": string;
}

export type PlayerResType = {
  "availableSeasons"?:
  {
    "seasonId": string;
  }[],
  "commonPlayerInfo"?: PlayerInfoType
  "playerHeadlineStats"?: PlayerStatsType
}

export type ExtendedStatsType = {
  "key": string;
  "name": string;
  "params": {
    "playerInfo": {
      "ast": number;
      "birthdate": string;
      "country": string;
      "displayFiLast": string;
      "displayFirstLast": string;
      "displayLastCommaFirst": string;
      "dleagueFlag": string;
      "draftNumber": string;
      "draftRound": string;
      "draftYear": string;
      "firstName": string;
      "fromYear": number;
      "gamesPlayedCurrentSeasonFlag": string
      "gamesPlayedFlag": string;
      "greatest75Flag": string;
      "height": string;
      "jersey": number;
      "lastAffiliation": string;
      "lastName": string;
      "nbaFlag": string;
      "personId": number;
      "pie": number;
      "playerId": number;
      "playerName": string;
      "playerSlug": string;
      "playercode": string;
      "position": string;
      "pts": number;
      "reb": number;
      "rosterstatus": string;
      "school": string;
      "seasonExp": number;
      "teamAbbreviation": string;
      "teamCity": string;
      "teamCode": string;
      "teamId": number;
      "teamName": string;
      "timeFrame": string;
      "toYear": number;
      "weight": string;
    },
  },
  "path": undefined,
}

export type GameRouteType = {
  "key": string;
  "name": string;
  "params": {
    "itemId": string;
    "scoreInfo": GameType
  },
  "path": undefined
}

export type ScoreBoardType = {
  "available": [],
  "eastConfStandingsByDay": {
    "conference": string;
    "g": number;
    "homeRecord": string;
    "l": number;
    "leagueId": string;
    "roadRecord": string;
    "seasonId": string;
    "standingsdate": string;
    "team": string;
    "teamId": number;
    "w": number;
    "wPct": number;
  }[]
  "gameHeader": [],
  "lastMeeting": [],
  "lineScore": [],
  "seriesStandings": [],
  "westConfStandingsByDay": {
    "conference": string;
    "g": number;
    "homeRecord": string;
    "l": number;
    "leagueId": string;
    "roadRecord": string;
    "seasonId": string;
    "standingsdate": string;
    "team": string;
    "teamId": number;
    "w": number;
    "wPct": number;
  }[]
}

