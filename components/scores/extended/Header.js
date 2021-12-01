import React from "react";
import { ActivityIndicator } from "react-native";
import { HStack, Image, Text, VStack } from "native-base";

const Header = ({
  gameData,
  awayTeam,
  awayLogo,
  awayScore,
  homeTeam,
  homeLogo,
  homeScore,
}) => {
  return (
    <VStack alignItems="center">
      <HStack alignItems="center" alignSelf="center" m={5} mb={5}>
        <VStack>
          <Text mb={5} bold>
            {awayTeam} - {awayScore}
          </Text>
          <Image
            accessibilityLabel={awayTeam}
            source={awayLogo}
            w={50}
            h={50}
            m={2}
            PlaceholderContent={<ActivityIndicator />}
            alt="Away Team Logo"
          />
        </VStack>

        <Text justifyContent="center" ml={5} mr={5} bold>
          @
        </Text>

        <VStack>
          <Text mb={5} bold>
            {homeTeam} - {homeScore}{" "}
          </Text>
          <Image
            accessibilityLabel={homeTeam}
            source={homeLogo}
            w={50}
            h={50}
            m={2}
            PlaceholderContent={<ActivityIndicator />}
            alt="Home Team Logo"
          />
        </VStack>
      </HStack>
      <Text m={1}>Arena: {gameData.arena}</Text>
      <Text mb={3}>
        City: {gameData.city}, {gameData.country}
      </Text>
    </VStack>
  );
};

export default Header;
