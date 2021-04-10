import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ImageBackground, View } from "react-native";
import { Card, Text, Image } from "react-native-elements";
import { PROFILE_PIC_URL_PREFIX } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "./Buttons";
// todos: Years/year conditional, better list styling
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const image = require("../assets/double-bubble-dark.png");

const ExtendedProfile = ({ route, navigation }) => {
  const { itemId, playerInfo } = route.params;
  // Object container for player information
  const profileState = {
    Points: playerInfo.points,
    Assists: playerInfo.assists,
    Blocks: playerInfo.blocks,
    Steals: playerInfo.steals,
    Turnovers: playerInfo.turnovers,
    "Offensive Rebounds": playerInfo.offReb,
    "Defensive Rebounds": playerInfo.defReb,
    "Total Rebounds": playerInfo.totReb,
    "Field Goals Attempted": playerInfo.fga,
    "Field Goals Made": playerInfo.fgm,
    "Three Pointers Attempted": playerInfo.tpa,
    "Three Pointers Made": playerInfo.tpm,
    "Free Throws Attempted": playerInfo.fta,
    "Free Throws Made": playerInfo.ftm,
    "Games Played": playerInfo.gamesPlayed,
    "Games Started": playerInfo.gamesStarted,
    "Total Minutes": playerInfo.min,
    "Double Doubles": playerInfo.dd2,
    "Triple Doubles": playerInfo.td3,
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
    <ImageBackground source={image} style={styles.bgImage}>
      <Card containerStyle={styles.container}>
        <Image
          containerStyle={styles.playerPic}
          source={{
            uri: `${PROFILE_PIC_URL_PREFIX}/${201935}.png`,
          }}
          alt="Profile"
        />
        {Object.entries(profileState).map(([key, data]) => (
          <View key={key} style={styles.playerInfo}>
            <Text style={styles.playerInfoLeft}>{onlyHS(key, data)}: </Text>
            <Text style={styles.playerInfoRight}>{`${data}`}</Text>
          </View>
        ))}
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.99,
    height: windowHeight * 0.88,
    backgroundColor: "#696969",
    alignSelf: "center",
  },
  playerInfo: {
    margin: 7,
    alignItems: "flex-start",
    flexDirection: "row",
    textAlign: "auto",
  },
  playerInfoLeft: {
    marginRight: 2,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  playerInfoRight: {
    marginLeft: 2,
    fontSize: 16,
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
