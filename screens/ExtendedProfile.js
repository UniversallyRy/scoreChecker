import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Flex, Image, Text, HStack, Box } from "native-base";
import { PROFILE_PIC_URL_PREFIX, colorScheme } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import logos from "../logoManager";
import Button from "../components/Buttons";
// todos: better list styling
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { MotiText } from "moti";
import { SharedElement } from "react-native-shared-element";

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
    Team: playerInfo.teamCity + " " + playerInfo.teamName,
    Weight: playerInfo.weight,
    Height: playerInfo.height,
    PPG: playerInfo.pts,
    RPG: playerInfo.reb,
    APG: playerInfo.ast,
    Season: playerInfo.timeFrame,
    Experience: experience(playerInfo.seasonExp),
    Position: playerInfo.position,
    "Jersey #": playerInfo.jersey,
    College: playerInfo.school,
    "Draft Round": playerInfo.draftRound,
    "Draft Number": playerInfo.draftNumber,
    "Draft Year": playerInfo.draftYear,
    Country: playerInfo.country,
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
    <Box h={windowHeight} bg={colorScheme.background}>
      <Flex
        alignSelf="center"
        w={windowWidth * 0.98}
        h={windowHeight * 0.88}
        bg={colorScheme.foreground}
        m={2}
        px={2}
        borderRadius={5}
      >
        <SharedElement id={`item.${playerInfo.playerId}.name`}>
          <Image
            mt={1}
            borderWidth={2}
            overflow="hidden"
            borderColor="#780116"
            borderRadius={50}
            alignItems="center"
            alignSelf="center"
            h={100}
            w={100}
            key={playerInfo.playerId}
            source={{
              uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
            }}
            alt="Profile"
          />
          <Text
            alignSelf="center"
            fontSize="xl"
            fontWeight={700}
            color="#F7B538"
          >
            {`${playerInfo.playerName}`}
          </Text>
          <Image
            w={50}
            h={50}
            mb={10}
            alignSelf="center"
            source={logos[playerInfo.teamAbbreviation]}
            key={playerInfo.teamAbbreviation}
            alt="Team"
          />
        </SharedElement>
        <SharedElement id={`item.${playerInfo.playerId}.info`}>
          {Object.entries(profileState).map(([key, data]) => (
            <HStack m={1} textAlign="auto" key={key}>
              <MotiText
                from={{ opacity: 0.4, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "timing",
                  duration: 350,
                  scale: {
                    type: "spring",
                    delay: 200,
                  },
                }}
              >
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
              </MotiText>
            </HStack>
          ))}
        </SharedElement>
      </Flex>
    </Box>
  );
};

export default ExtendedProfile;
