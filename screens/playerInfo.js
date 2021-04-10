import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Input, Text, TextInput, Button } from "react-native-elements";
import nba from "nba";
import { Formik } from "formik";
import PlayerProfile from "../components/PlayerProfile";
import PlayerSearch from "../components/PlayerSearch";
import { DEFAULT_PLAYER_INFO } from "../constants";
import { client } from "../graphql/Client";
import { Player } from "../graphql/Queries";
// todos: other components seperate into fully functional components/stateless, more react element styling/usage

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const image = require("../assets/double-bubble-dark.png");
const initialState = {
  // James Harden as default profile
  playerInfo: DEFAULT_PLAYER_INFO,
};

const PlayerStats = ({ navigation }) => {
  // state for player arrays/object
  const [playerObj, setPlayerObj] = useState(initialState);
  // cycles through reset twice to trigger promise rerender

  const handleReset = (n) => {
    let count = n;
    if (count > 1) {
      return null;
    } else {
      requestHeadlines();
    }
    count++;
    handleReset(n + 1);
  };
  const handleInput = (item) => {
    // regex that is used in below condition to test that at least 2 words were inputted
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let trimmedInput = item.player.trim();
    let newPlayer = nba.findPlayer(trimmedInput);
    if (!regName.test(trimmedInput)) {
      alert("Please enter the full name of the player.");
      return false;
    } else {
      if (newPlayer != undefined) {
      } else {
        alert("Player not found, Try again.");
      }
    }
  };
  // initial load of default Harden profile
  useEffect(() => {
    requestHeadlines();
  }, []);

  const requestHeadlines = () => {
    client
      .query({
        query: Player,
      })
      .then((response) => {
        setPlayerObj(response.data.Player.league.standard.stats.latest);
      })
      .catch((error) => {
        console.log("ERROR ==>", error);
      });
  };

  return (
    //ScrollView added for ability to view all content while keyboard is open
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={image} style={styles.bgImage}>
        <PlayerProfile navigation={navigation} playerInfo={playerObj} />
        <PlayerSearch
          handleInput={handleInput}
          handleReset={() => handleReset(0)}
        />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "roboto",
    width: windowWidth,
    justifyContent: "center",
    alignContent: "center",
    height: windowHeight * 0.895,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default PlayerStats;
