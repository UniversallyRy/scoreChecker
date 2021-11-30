import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Flex, Image, Text, HStack, Box } from "native-base";
import { PROFILE_PIC_URL_PREFIX } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "./Buttons";
// todos: Years/year conditional, better list styling
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const image = require("../assets/double-bubble-dark.png");

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
    <Box h="100%" style={{ backgroundColor: "#273e47" }}>
      <Flex style={styles.container}>
        <Image
          style={styles.playerPic}
          source={{
            uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
          }}
          alt="Profile"
        />
        {Object.entries(profileState).map(([key, data]) => (
          <View key={key} style={styles.playerInfo}>
            <Text style={styles.playerInfoLeft}>{onlyHS(key, data)}: </Text>
            <Text style={styles.playerInfoRight}>{`${data}`}</Text>
          </View>
        ))}
      </Flex>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: windowWidth * 0.98,
    height: windowHeight * 0.88,
    backgroundColor: "#C32F27",
    margin: 10,
    borderRadius: 3,
  },
  playerInfo: {
    margin: 7,
    alignItems: "flex-start",
    flexDirection: "row",
    textAlign: "auto",
  },
  playerInfoLeft: {
    marginRight: 2,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  playerInfoRight: {
    marginLeft: 2,
    fontSize: 18,
    fontFamily: "Roboto",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  playerPic: {
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "black",
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 3,
    height: 100,
    width: 100,
  },
});

export default ExtendedProfile;
