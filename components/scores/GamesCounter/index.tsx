import { HStack, Text } from "native-base";
import { colorScheme } from "../../../constants";
import React from "react";

const GamesCounter = ({ numOfGames }: { numOfGames: number }) => {
  return (
    <HStack justifyContent="center">
      <Text
        alignSelf="center"
        fontSize="lg"
        fontWeight={900}
        fontStyle="italic"
        mb={4}
        color={colorScheme.text}
      >
        {numOfGames}
      </Text>
      <Text
        alignSelf="center"
        fontSize="sm"
        fontWeight={700}
        fontStyle="italic"
        mb={4}
        color={colorScheme.foreground}
      >
        {numOfGames > 1 ? "  Games" : "  Game"}
      </Text>
    </HStack>
  );
};

export default GamesCounter;
