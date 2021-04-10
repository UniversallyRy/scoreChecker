import gql from "graphql-tag";
import moment from "moment";

const gameDate = moment().format("YYYYMMDD");
const newPath = `/prod/v1/${gameDate}/scoreboard.json`;
console.log(newPath);

//make path take moment date in future

export const Scoreboard = gql`
  query {
    todayScoreboard @rest(type: "Scores", path: newPath) {
      numGames: Int
      games @type(name: "ID") {
        gameId
        gameUrlCode
        startTimeEastern
        isGameActivated
        clock
        arena @type(name: "arena") {
          name
          city
          stateAbbr
          country
        }
        period @type(name: "quarter") {
          current
          isHalftime
        }
        vTeam @type(name: "score") {
          score
        }
        hTeam @type(name: "score") {
          score
        }
      }
    }
  }
`;

export const Player = gql`
  query {
    Player
      @rest(type: "Player", path: "/prod/v1/2020/players/201935_profile.json") {
      league @type(name: "league") {
        standard @type(name: "stan") {
          teamId: Int
          stats @type(name: "stats") {
            latest @type(name: "latest") {
              ppg
              apg
              rpg
              mpg
              spg
              topg
              fgp
              ftp
              points
              assists
              blocks
              steals
              turnovers
              offReb
              defReb
              totReb
              fgm
              fga
              tpm
              tpa
              ftm
              fta
              gamesPlayed
              gamesStarted
              min
              dd2
              td3
            }
          }
        }
      }
    }
  }
`;
