import gql from "graphql-tag";

export const Player = gql`
  query {
    player @rest(name: "Stephen Curry", path: "/") {
      firstName
      lastName
      team {
        name
        city
        roster {
          firstName
          lastName
        }
      }
    }
  }
`;
