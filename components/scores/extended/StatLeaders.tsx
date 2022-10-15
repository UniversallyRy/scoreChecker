import React from "react";
import { Box, VStack, HStack, Heading, Text, Image } from "native-base";
import { Dimensions } from "react-native";
import { colorScheme } from "../../../constants";
import DropDown from "./DropDown";

type Props = {
  awayLeadValue: {
    StatValue: number;
  }
  awayPic: string;
  awayPlayer: string;
  homePlayer: string;
  homeLeadValue: {
    StatValue: number;
  }
  homePic: string;
  statState: string;
  changeStats: (stat: any) => void;
}

const { width: windowWidth } = Dimensions.get("window");

const StatLeaders = ({
  awayLeadValue,
  awayPic,
  awayPlayer,
  homePlayer,
  homeLeadValue,
  homePic,
  statState,
  changeStats,
}: Props) => {
  const leaderHeading = statState.slice(0, -1);

  return (
    <VStack w={windowWidth} alignItems="center" justifyContent="center">
      <DropDown changeStats={changeStats} />
      <Box
        justifyContent="center"
        alignItems="center"
        borderRadius={3}
        mb={1}
        p={2.2}
        w={windowWidth * 0.45}
        h={25}
        bg={colorScheme.foreground}
        shadow="3"
      >
        <Heading color={colorScheme.text} fontSize="lg" fontWeight={600}>
          {leaderHeading} Leaders
        </Heading>
      </Box>
      <HStack mb={1} alignItems="center" justifyContent="center" m={2}>
        <VStack alignItems="center" m={2} bg="transparent">
          <Heading color={colorScheme.text} size="sm" fontWeight={300}>
            Away
          </Heading>
          <Image
            height={65}
            width={65}
            borderColor={colorScheme.divider}
            borderWidth={0.6}
            borderRadius={50}
            source={{ uri: awayPic }}
            key={awayPlayer + "_img"}
            alt="Away Player"
          />
          <Heading color={colorScheme.text} size="md" fontWeight={700}>
            {awayPlayer}
          </Heading>
          <Text
            color={colorScheme.text}
            fontSize="md"
            fontWeight={300}
            fontStyle="italic"
          >
            {awayLeadValue.StatValue} {statState}
          </Text>
        </VStack>
        <VStack alignItems="center" m={2} bg="transparent">
          <Heading color={colorScheme.text} size="sm" fontWeight={300}>
            Home
          </Heading>
          <Image
            height={65}
            width={65}
            borderColor={colorScheme.divider}
            borderWidth={0.6}
            borderRadius={50}
            source={{ uri: homePic }}
            key={homePlayer + "_img"}
            alt="Home Player"
          />
          <Heading size="md" color={colorScheme.text} fontWeight={700}>
            {homePlayer}
          </Heading>

          <Text
            fontSize="md"
            color={colorScheme.text}
            fontWeight={300}
            fontStyle="italic"
          >
            {homeLeadValue.StatValue} {statState}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default StatLeaders;
