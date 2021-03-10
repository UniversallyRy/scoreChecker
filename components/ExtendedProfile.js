import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ImageBackground, View } from "react-native";
import { Card, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "./Buttons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const image = require("../assets/double-bubble-dark.png");

const ExtendedProfile = ({ route, navigation }) => {
  const { itemId, playerInfo } = route.params;
  // Object container for player information
  const profileState = {
    Name: playerInfo.displayFirstLast,
    Team: playerInfo.teamCity + " " + playerInfo.teamName,
    "Jersey #": playerInfo.jersey,
    Position: playerInfo.position,
    Experience: playerInfo.seasonExp + " Years",
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

  return (
    <ImageBackground source={image} style={styles.bgImage}>
      <Card containerStyle={styles.container}>
        {Object.entries(profileState).map(([key, data]) => (
          <View key={key} style={styles.playerInfo}>
            <Text style={styles.playerInfoLeft}>{key}: </Text>
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
    marginRight: 5,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  playerInfoRight: {
    marginLeft: 5,
    fontSize: 18,
    fontFamily: "Roboto",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default ExtendedProfile;
