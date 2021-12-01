import React, { useEffect, useState } from "react";
import { Box, VStack, HStack, Heading, Text } from "native-base";
import { Dimensions, Image } from "react-native";
import DropDown from "./DropDown";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const StatLeaders = ({
  homeLeaders,
  awayLeaders,
  statState,
  changeStats,
  scorerHome,
  scorerAway,
  awayKey,
  awayP,
  homeP,
  date,
  scoreInfo,
}) => {
  const [awayPicture, setAwayPicture] = useState({});
  const [homePicture, setHomePicture] = useState({});
  useEffect(() => {
    async function initData() {
      setAwayPicture(awayP);
      setHomePicture(homeP);
    }
    initData();
  }, [awayP, homeP]);

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
        bg="#780116"
        shadowColor="#000"
        shadowOffset={{ width: 1, height: 2 }}
        shadowOpacity={0.65}
        shadowRadius={2.84}
        elevation={3}
      >
        <Heading color="#F7B538" fontSize="lg">
          {statState} Leaders
        </Heading>
      </Box>
      <HStack key={awayKey} alignItems="center" justifyContent="center" m={2}>
        <VStack alignItems="center" m={3} bg="transparent">
          <Heading color="#F7B538" size="sm" bold>
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
          <Heading color="#F7B538" size="md">
            {scorerAway}
          </Heading>
          <Text color="#F7B538" fontSize="md">
            {awayLeaders.StatValue} {statState}
          </Text>
        </VStack>
        <VStack alignItems="center" m={3} bg="transparent">
          <Heading color="#F7B538" size="sm">
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
          <Heading size="md" color="#F7B538">
            {scorerHome}
          </Heading>
          <Text fontSize="md" color="#F7B538">
            {homeLeaders.StatValue} {statState}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default StatLeaders;
