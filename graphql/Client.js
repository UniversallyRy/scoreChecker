import { ApolloClient, createHttpLink } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import apiKey from "../.expo/apiKey";

const restLink = new RestLink({
  uri: "free-nba.p.rapidapi.com",
  headers: {
    Authorization: apiKey,
  },
});

export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});
