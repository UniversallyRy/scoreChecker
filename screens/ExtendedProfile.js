import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Flex, Image, Text, HStack, Box } from "native-base";
import { PROFILE_PIC_URL_PREFIX, colorScheme } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Buttons";
// todos: better list styling
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ExtendedProfile = ({ route, navigation }) => {
  const { itemId, playerInfo } = route.params;

  const experience = (item) => {
    if (item < 1) return "Rookie";
    if (typeof item === "number" && item > 1) {
      return item + " Previous Seasons";
    } else return "1 Previous Season";
  };

  // Object container for player information
  const profileState = {
    Name: playerInfo.displayFirstLast,
    Team: playerInfo.teamCity + " " + playerInfo.teamName,
    "Jersey #": playerInfo.jersey,
    Position: playerInfo.position,
    Experience: experience(playerInfo.seasonExp),
    Weight: playerInfo.weight,
    Height: playerInfo.height,
    Country: playerInfo.country,
    College: playerInfo.school,
    "Draft Year": playerInfo.draftYear,
    "Draft Round": playerInfo.draftRound,
    "Draft Number": playerInfo.draftNumber,
    Season: playerInfo.timeFrame,
    Points: playerInfo.pts,
    Rebounds: playerInfo.reb,
    Assists: playerInfo.ast,
  };

  // checks for college skippers
  const onlyHS = (item, itemData) => {
    if (
      !itemData ||
      (typeof itemData === "string" && itemData.includes("HS"))
    ) {
      return "Drafted out of High School";
    } else return item;
  };

  return (
    <Box h={windowHeight} bg={colorScheme.background}>
      <Flex
        alignSelf="center"
        w={windowWidth * 0.98}
        h={windowHeight * 0.88}
        bg={colorScheme.foreground}
        m={5}
        px={2}
        borderRadius={5}
      >
        <Image
          borderWidth={2}
          overflow="hidden"
          borderColor="black"
          borderRadius={50}
          alignItems="center"
          alignSelf="center"
          mt={3}
          mb={3}
          h={100}
          w={100}
          source={{
            uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
          }}
          key={playerInfo.playerId}
          alt="Profile"
        />
        {Object.entries(profileState).map(([key, data]) => (
          <HStack m={1} textAlign="auto" key={key}>
            <Text
              color={colorScheme.button}
              mr={1}
              fontSize="lg"
              fontWeight={900}
            >
              {onlyHS(key, data)}:{" "}
            </Text>
            <Text color={colorScheme.text} fontSize="lg" fontWeight={400}>
              {`${data}`}
            </Text>
          </HStack>
        ))}
      </Flex>
    </Box>
  );
};

export default ExtendedProfile;
