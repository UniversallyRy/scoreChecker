import { ApolloClient, createHttpLink } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: "free-nba.p.rapidapi.com",
  headers: {
    Authorization: "45f39269e3msh09e384327c9ebf3p1eccfbjsna51b9a9e6a21",
  },
});

export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});
