import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Flex, Image, Text, HStack, Box } from "native-base";
import { PROFILE_PIC_URL_PREFIX } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Buttons";
// todos: Years/year conditional, better list styling
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ExtendedProfile = ({ route, navigation }) => {
  const { itemId, playerInfo } = route.params;
  // Object container for player information

  const experience = (item) => {
    if (item < 1) return "Rookie";
    if (typeof item === "number" && item > 1) {
      return item + " Previous Seasons";
    } else return "1 Previous Season";
  };

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
      return "High School";
    } else return item;
  };

  return (
    <Box h="100%" bg="#273e47">
      <Flex
        alignSelf="center"
        w={windowWidth * 0.98}
        h={windowHeight * 0.88}
        bg="#C32F27"
        m={10}
        p={2}
        borderRadius={5}
      >
        <Image
          borderWidth={2}
          overflow="hidden"
          borderColor="black"
          borderRadius={50}
          alignItems="center"
          alignSelf="center"
          mt={10}
          mb={5}
          h={100}
          w={100}
          source={{
            uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
          }}
          alt="Profile"
        />
        {Object.entries(profileState).map(([key, data]) => (
          <HStack m={1} textAlign="auto" key={key}>
            <Text mr={1} fontSize="lg" bold>
              {onlyHS(key, data)}:{" "}
            </Text>
            <Text ml={2} fontSize="lg">{`${data}`}</Text>
          </HStack>
        ))}
      </Flex>
    </Box>
  );
};

export default ExtendedProfile;
