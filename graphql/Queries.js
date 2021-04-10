import gql from "graphql-tag";
import moment from "moment";

let date = moment().format("L");
//make path take moment date in future

export const Scoreboard = gql`
  query {
    todayScoreboard
      @rest(type: "Scores", path: "/prod/v1/20210409/scoreboard.json") {
      games @type(name: "ID") {
        gameId
        gameUrlCode
        startTimeEastern
        isGameActivated
        clock
        period @type(name: "quarter") {
          current
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
