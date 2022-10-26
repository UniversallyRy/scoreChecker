export type GameType = {
  "arena": {
    "city": string;
    "country": string;
    "isDomestic": boolean;
    "name": string;
    "stateAbbr": string;
  };
  "attendance": string;
  "clock": string;
  "extendedStatusNum": number;
  "gameDuration": {
    "hours": string;
    "minutes": string;
  };
  "gameId": string;
  "gameUrlCode": string;
  "hTeam": {
    "linescore": [],
    "loss": string | number;
    "score": string;
    "seriesLoss": string;
    "seriesWin": string;
    "teamId": string;
    "triCode": string;
    "win": string | number,
  };
  "hasGameBookPdf": boolean;
  "homeStartDate": string;
  "homeStartTime": string;
  "isBuzzerBeater": boolean;
  "isGameActivated": boolean;
  "isNeutralVenue": boolean;
  "isPreviewArticleAvail": boolean;
  "isRecapArticleAvail": boolean;
  "isStartTimeTBD": boolean;
  "leagueName": string;
  "nugget": {
    "text": string;
  };
  "period": {
    "current": number;
    "isEndOfPeriod": boolean;
    "isHalftime": boolean;
    "maxRegular": number;
    "type": number;
  };
  "seasonStageId": number;
  "seasonYear": string;
  "startDateEastern": string;
  "startTimeEastern": string;
  "startTimeUTC": string;
  "statusNum": number;
  "tickets": {
    "desktopWeb": string;
    "leagGameInfo": string;
    "leagTix": string;
    "mobileApp": string;
    "mobileWeb": string;
  };
  "vTeam": {
    "linescore": [];
    "loss": string | number
    "score": string;
    "seriesLoss": string;
    "seriesWin": string;
    "teamId": string;
    "triCode": string;
    "win": string | number;
  };
  "visitorStartDate": string;
  "visitorStartTime": string;
  "watch": {
    "broadcast": {
      "audio": {
        "hTeam": {
          "broadcasters": {
            "longName": string;
            "shortName": string;
          }[],
          "streams": {
            "isOnAir": boolean;
            "language": string;
            "streamId": string;
          }[]
        },
        "national": {
          "broadcasters": [];
          "streams": {
            "isOnAir": boolean;
            "language": string;
            "streamId": string;
          }[]
        },
        "vTeam": {
          "broadcasters": {
            "longName": string;
            "shortName": string;
          }[]
          "streams": {
            "isOnAir": boolean;
            "language": string
            "streamId": string;
          }[]
        },
      },
      "broadcasters": {
        "canadian": [];
        "hTeam": {
          "longName": string;
          "shortName": string;
        }[]
        "national": [];
        "spanish_hTeam": [],
        "spanish_national": [],
        "spanish_vTeam": [],
        "vTeam": {
          "longName": string;
          "shortName": string;
        }[];
      },
      "video": {
        "canPurchase": boolean;
        "deepLink": [];
        "isLeaguePass": boolean;
        "isMagicLeap": boolean;
        "isNBAOnTNTVR": boolean;
        "isNationalBlackout": boolean;
        "isNextVR": boolean;
        "isOculusVenues": boolean;
        "isTNTOT": boolean;
        "isVR": boolean;
        "regionalBlackoutCodes": string;
        "streams": {
          "doesArchiveExist": boolean;
          "duration": number;
          "isArchiveAvailToWatch": boolean;
          "isOnAir": boolean;
          "streamId": string;
          "streamType": string;
        }[];
        "tntotIsOnAir": boolean;
      },
    },
  }
}
