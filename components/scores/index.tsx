import React from "react";
import { VStack, FlatList, Text } from "native-base";
import ScoreCard from "./ScoreCard";
import ScoresLoading from "./ScoresLoading";
import { colorScheme } from "../../constants";
import { windowWidth } from "../../utils/dimensions";
import { ScoreCardType } from "../../types/gameSummary";

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
          <Text
            alignSelf="center"
            fontSize="md"
            fontWeight={100}
            fontStyle="italic"
            mb={4}
            color={colorScheme.text}
          >
            {numOfGames + " Games"}
          </Text>
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
