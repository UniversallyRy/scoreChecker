import React, { useContext, useEffect } from "react";
import { Box, VStack, HStack, Heading, Text, Image } from "native-base";
import DropDown from "./DropDown";
import { colorScheme } from "../../../constants";
import { windowWidth } from "../../../utils/dimensions";
import { ScoreLeaderContext } from "../../../LeaderContext";

type Props = {
  awayPic: string;
  homePic: string;
  statState: string;
  changeStats: (stat: any) => void;
}

const StatLeaders = ({
  awayPic,
  homePic,
  statState,
  changeStats,
}: Props) => {

  const { players } = useContext(ScoreLeaderContext);
  const leaderHeading = statState.slice(0, -1);
  let awayPlayer = players[0];
  let homePlayer = players[1];

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
            {awayPlayer.fn + " " + awayPlayer.ln}
          </Heading>
          <Text
            color={colorScheme.text}
            fontSize="md"
            fontWeight={300}
            fontStyle="italic"
          >
            {statState == "Points" ? (awayPlayer.pts + " " + statState) : null}
            {statState == "Assists" ? (awayPlayer.ast + " " + statState) : null}
            {statState == "Rebounds" ? (awayPlayer.reb + " " + statState) : null}
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
            {homePlayer.fn + " " + homePlayer.ln}
          </Heading>

          <Text
            fontSize="md"
            color={colorScheme.text}
            fontWeight={300}
            fontStyle="italic"
          >
            {statState == "Points" ? (homePlayer.pts + " " + statState) : null}
            {statState == "Assists" ? (homePlayer.ast + " " + statState) : null}
            {statState == "Rebounds" ? (homePlayer.reb + " " + statState) : null}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default StatLeaders;
