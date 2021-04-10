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
    todayScoreboard {
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
