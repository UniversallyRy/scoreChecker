import React, { useEffect, useState } from "react";
import { Box, VStack, HStack, Heading, Text } from "native-base";
import { Dimensions, Image } from "react-native";
import { colorScheme } from "../../../constants";
import DropDown from "./DropDown";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const StatLeaders = ({
  awayLeadValue,
  awayPic,
  awayPlayer,
  homePlayer,
  homeLeadValue,
  homePic,
  statState,
  scoreInfo,
  changeStats,
  date,
}) => {
  const [awayPicture, setAwayPicture] = useState({});
  const [homePicture, setHomePicture] = useState({});
  const leaderHeading = statState.slice(0, -1);
  useEffect(() => {
    async function initData() {
      setAwayPicture(awayPic);
      setHomePicture(homePic);
    }
    initData();
  }, [awayPic, homePic]);

  return (
    <VStack alignItems="center" justifyContent="center">
      <DropDown statState={statState} changeStats={changeStats} />
      <Box
        justifyContent="center"
        alignItems="center"
        borderRadius={3}
        p={2.2}
        w={windowWidth * 0.45}
        h={39}
        bg={colorScheme.button}
        shadowColor="#000"
        shadowOffset={{ width: 1, height: 2 }}
        shadowOpacity={0.65}
        shadowRadius={2.84}
        elevation={4}
      >
        <Heading color={colorScheme.text} fontSize="lg">
          {leaderHeading} Leaders
        </Heading>
      </Box>
      <HStack alignItems="center" justifyContent="center" m={2}>
        <VStack alignItems="center" m={3} bg="transparent">
          <Heading color={colorScheme.text} size="sm" bold>
            Away
          </Heading>
          <Image
            height={65}
            width={65}
            borderColor="black"
            borderWidth={0.6}
            borderRadius={50}
            source={awayPicture}
            alt="Away Player"
          />
          <Heading color={colorScheme.text} size="md">
            {awayPlayer}
          </Heading>
          <Text color={colorScheme.text} fontSize="md">
            {awayLeadValue.StatValue} {statState}
          </Text>
        </VStack>
        <VStack alignItems="center" m={3} bg="transparent">
          <Heading color={colorScheme.text} size="sm">
            Home
          </Heading>
          <Image
            height={65}
            width={65}
            borderColor="black"
            borderWidth={0.6}
            borderRadius={50}
            source={homePicture}
            alt="Home Player"
          />
          <Heading size="md" color={colorScheme.text}>
            {homePlayer}
          </Heading>
          <Text fontSize="md" color={colorScheme.text}>
            {homeLeadValue.StatValue} {statState}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default StatLeaders;
