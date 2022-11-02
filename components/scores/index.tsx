import React from "react";
import { VStack, FlatList } from "native-base";
import ScoreCard from "./ScoreCard";
import ScoresLoading from "./ScoresLoading";
import { windowWidth } from "../../utils/dimensions";
import type { ScoreCardType } from "../../types/gameSummary";
import GamesCounter from "./GamesCounter";

const Scores = ({ games }: { games: ScoreCardType[] }) => {
  const numOfGames = Object.keys(games).length;
  const gameArray: Object[] = [];

  for (const game in games) {
    gameArray.push([games[game]]);
  }

  const renderGame = ({ item }) => (
    <ScoreCard key={item[0].gameId} game={item[0]} />
  );

  return (
    <VStack
      flex={1}
      w={windowWidth}
      alignSelf="center"
      justifyContent="center"
    >
      <VStack safeArea>
        {numOfGames >= 1 ? (
          <GamesCounter
            numOfGames={numOfGames}
          />
        ) : (
          <ScoresLoading />
        )}
        <FlatList
          data={gameArray}
          renderItem={renderGame}
          keyExtractor={(item) => item[0].gameId.toString()}
        />
      </VStack>
    </VStack>
  );
};

export default Scores;
