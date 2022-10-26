import { createContext } from "react";

interface ContextInterface {
  players: [
    awayPlayer: Object,
    homePlayer: Object
  ]
}

const players = [
  {},
  {}
];

export const ScoreLeaderContext = createContext<ContextInterface | null>(players);
