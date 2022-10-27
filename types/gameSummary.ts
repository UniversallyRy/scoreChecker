export type PlayerStatsType = {
  "ast": number
  "blk": number;
  "blka": number;
  "court": number;
  "dreb": number;
  "fbpts": number;
  "fbptsa": number;
  "fbptsm": number;
  "fga": number;
  "fgm": number;
  "fn": string;
  "fta": number;
  "ftm": number;
  "ln": string;
  "memo": string;
  "min": number;
  "num": string;
  "oreb": number;
  "pf": number;
  "pid": number;
  "pip": number;
  "pipa": number;
  "pipm": number;
  "pm": number;
  "pos": string;
  "pts": number;
  "reb": number;
  "sec": number;
  "status": string;
  "stl": number;
  "tf": number;
  "totsec": number;
  "tov": number;
  "tpa": number;
  "tpm": number;
}

export type TeamStatsType = {
  "ast": number;
  "ble": number;
  "blk": number;
  "bpts": number;
  "dreb": number;
  "fbpts": number;
  "fbptsa": number;
  "fbptsm": number;
  "fga": number;
  "fgm": number;
  "fta": number;
  "ftm": number;
  "oreb": number;
  "pf": number;
  "pip": number;
  "pipa": number;
  "pipm": number;
  "potov": number;
  "reb": number;
  "scp": number;
  "stl": number;
  "tf": number;
  "tmreb": number;
  "tmtov": number;
  "tov": number;
  "tpa": number;
  "tpm": number;
}

export type TeamInfoType = {
  "ftout": number;
  "q1": number;
  "q2": number;
  "q3": number;
  "q4": number;
  "ot1"?: number;
  "ot2"?: number;
  "ot3"?: number;
  "ot4"?: number;
  "s": number;
  "stout": number;
  "ta": string; // Team Abbrev
  "tn": string; // Team Name
  "tc": string // Team City
  "pstsg": PlayerStatsType[]
  "tstsg": TeamStatsType;
  "tid": number; // Team ID
}

export type ScoreAndTimeType = {
  "cl": string; // Clock
  "de": string; // Game Status
  "epid": string
  "etype": number;
  "evt": number;
  "hs": number; // Home Score
  "locX": number
  "locY": number
  "mtype": number
  "oftid": number;
  "opid": string;
  "opt1": number;
  "opt2": number;
  "opt3": number;
  "opt4": number;
  "pid": number;
  "pts": number;
  "tid": number;
  "vs": number; // Away Score
  "wallclk": string; // Date, not UTF
}

export type GameSummaryType = {
  "ac": string; // Arena City
  "an": string; // Arena Name
  "ar": number; // Arena attendance
  "as": string; // Arena State
  "at": number; // 
  "cl": string;
  "dur": string // Duration
  "etm": string;
  "mid": number;
  "htm": string;
  "vtm": string;
  "next": string // next game url
  "p": number // period numbers
  "st": number // status number
  "stt": string; // Game Status
  "gcode": string;
  "gdte": string;
  "gdtutc": string;
  "gid": string;
  "gsts": {
    "lc": number;
    "tt": number;
  };
  "lpla": ScoreAndTimeType | undefined;
  "hls": TeamInfoType;
  "vls": TeamInfoType;
  "utctm": string;
  "offs": { // Officials
    "off": string;
    "fn": string;
    "ln": string;
    "num": string;
  }[];
}
