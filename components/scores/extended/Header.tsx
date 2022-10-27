import React from "react";
import { HStack, Image, Text, VStack, Heading } from "native-base";
import type { ImageSourcePropType } from "react-native";
import { colorScheme } from "../../../constants";

type Props = {
  arenaName: string;
  arenaCity: string;
  arenaState: string;
  awayTeam: string;
  awayLogo: ImageSourcePropType;
  awayScore: number;
  homeTeam: string;
  homeLogo: ImageSourcePropType;
  homeScore: number;
  gameId: string;
}

const Header = ({
  arenaName,
  arenaCity,
  arenaState,
  awayTeam,
  awayLogo,
  awayScore,
  homeTeam,
  homeLogo,
  homeScore,
}: Props) => {
  return (
    <VStack mb={2}>
      <HStack alignItems="center" alignSelf="center" m={2}>
        <VStack alignItems="center">
          <Text
            color={colorScheme.text}
            mb={2}
            fontSize="lg"
            fontWeight={900}
          >
            {awayTeam} - {awayScore}
          </Text>
          <Image
            accessibilityLabel={awayTeam}
            source={awayLogo}
            w={50}
            h={50}
            m={2}
            alt="Away Team Logo"
          />
        </VStack>

        <Text
          color={colorScheme.text}
          justifyContent="center"
          ml={5}
          mr={5}
          fontWeight={700}
        >
          @
        </Text>

        <VStack alignItems="center">
          <Text
            color={colorScheme.text}
            mb={2}
            fontSize="lg"
            fontWeight={900}
          >
            {homeTeam} - {homeScore}{" "}
          </Text>
          <Image
            accessibilityLabel={homeTeam}
            source={homeLogo}
            w={50}
            h={50}
            m={2}
            alt="Home Team Logo"
          />
        </VStack>
      </HStack>
      <HStack alignItems="center" ml={5}>
        <Heading
          fontSize="lg"
          fontStyle="italic"
          color={colorScheme.title}
          fontWeight={400}
        >
          Arena:{" "}
        </Heading>
        <Text
          color={colorScheme.text}
          m={0}
          fontWeight={400}
          fontStyle="italic"
        >
          {arenaName}
        </Text>
      </HStack>
      <HStack alignItems="center" ml={5}>
        <Heading
          fontSize="lg"
          fontWeight={400}
          fontStyle="italic"
          color={colorScheme.title}
        >
          City:{" "}
        </Heading>
        <Text color={colorScheme.text} fontWeight={400} fontStyle="italic">
          {arenaCity}, {arenaState}
        </Text>
      </HStack>
    </VStack>
  );
};

export default Header;
