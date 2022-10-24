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
    "scoreInfo": {
      "gameDateEst": string;
      "gameId": string;
      "gameSequence": number;
      "gameStatusId": number;
      "gameStatusText": string;
      "gamecode": string;
      "homeTeamId": number;
      "livePcTime": string;
      "livePeriod": number;
      "livePeriodTimeBcast": string;
      "natlTvBroadcasterAbbreviation": string;
      "season": string;
      "visitorTeamId": number;
      "whStatus": number,
    },
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

export type GameType = {
  "gameDateEst"?: string | undefined;
  "gameId"?: string;
  "gameSequence"?: number;
  "gameStatusId"?: number;
  "gameStatusText"?: string;
  "gamecode"?: string;
  "homeTeamId"?: number;
  "livePcTime"?: string;
  "livePeriod"?: number;
  "livePeriodTimeBcast"?: string;
  "natlTvBroadcasterAbbreviation"?: null;
  "season"?: "string";
  "visitorTeamId"?: number;
  "whStatus"?: number;
  "length"?: number;
}
