import { Text } from "native-base";
import { colorScheme } from "../../../constants";
import React from "react";

const GamesCounter = ({ numOfGames }: { numOfGames: number }) => {
  return (
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
  );
};

export default GamesCounter;
