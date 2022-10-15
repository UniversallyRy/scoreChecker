import React from "react";
import { Dimensions } from "react-native";
import { SharedElement } from "react-native-shared-element";
import { Flex, Image, Text, HStack, Box } from "native-base";
import { MotiText } from "moti";
import logos from "../logoManager";
import { PROFILE_PIC_URL_PREFIX, colorScheme } from "../constants";
import { ExtendedStatsType } from "../types";

type Props = {
  route: ExtendedStatsType;
}
// todos: better list styling, better shared element screen transition
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ExtendedProfile = ({ route }: Props) => {
  const { playerInfo } = route.params;

  const experience = (item: number) => {
    if (item < 1) return "Rookie";
    if (typeof item === "number" && item > 1) {
      return item + " Previous Seasons";
    } else return "1 Previous Season";
  };
  // player information obj
  const profileState = {
    Team: playerInfo.teamCity + " " + playerInfo.teamName,
    Height: playerInfo.height,
    Weight: playerInfo.weight,
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
  // console.log(playerInfo);
  const titleCheck = (item: string, itemData: string | number) => {
    // changes school title if no college(future needed for euroleaguers?)
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
        <SharedElement id={`item.${playerInfo.playerId}.image`}>
          <Image
            mt={1}
            borderWidth={2}
            overflow="hidden"
            borderColor={colorScheme.title}
            borderRadius={50}
            alignItems="center"
            alignSelf="center"
            h={100}
            w={100}
            source={{
              uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
            }}
            key={playerInfo.playerName + "_imgKey"}
            alt={playerInfo.playerName + " image"}
          />
        </SharedElement>
        <SharedElement id={`item.${playerInfo.playerId}.name`}>
          <Text
            alignSelf="center"
            fontSize="xl"
            fontWeight={700}
            color={colorScheme.text}
          >
            {`${playerInfo.playerName}`}
          </Text>
        </SharedElement>
        <SharedElement id={`item.${playerInfo.playerId}.team`}>
          <Image
            w={50}
            h={50}
            mb={10}
            alignSelf="center"
            source={logos[playerInfo.teamAbbreviation]}
            key={playerInfo.teamAbbreviation + "_logoKey"}
            alt={playerInfo.teamName}
          />
        </SharedElement>
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
                color={colorScheme.title}
                mr={1}
                fontSize="lg"
                fontWeight={900}
              >
                {titleCheck(key, data)}:{" "}
              </Text>
              <Text color={colorScheme.text} fontSize="lg" fontWeight={400}>
                {`${data}`}
              </Text>
            </MotiText>
          </HStack>
        ))}
      </Flex>
    </Box>
  );
};

export default ExtendedProfile;
