import React, { useEffect, useState, useRef } from "react";
import { Dimensions } from "react-native";
import { Box, Flex, ScrollView, KeyboardAvoidingView } from "native-base";
import NBA from "nba";
import PlayerProfile from "../components/players/PlayerProfile";
import PlayerSearch from "../components/players/PlayerSearch";
import { DEFAULT_PLAYER_INFO, colorScheme } from "../constants";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const initialState = {
  // Obi Toppin as default profile
  playerInfo: DEFAULT_PLAYER_INFO,
};

const PlayerScreen = ({ navigation }) => {
  const [playerObj, setPlayerObj] = useState(initialState);

  const loadPlayerInfo = (playerName) => {
    NBA.stats
      .playerInfo({ PlayerID: NBA.findPlayer(playerName).playerId })
      .then((info) => {
        const playerInfo = Object.assign(
          info.commonPlayerInfo[0],
          info.playerHeadlineStats[0]
        );
        setPlayerObj({ playerInfo });
      });
  };

  // cycles through reset twice to trigger promise rerender
  const handleReset = (n) => {
    let count = n;
    if (count > 1) {
      return null;
    } else {
      loadPlayerInfo(initialState.playerInfo.fullName);
    }
    count++;
    handleReset(n + 1);
  };

  const handleInput = (item) => {
    // regex to test if 2 words were submitted
    const regNameTest = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let trimmedInput = item.player.trim();
    let newPlayer = NBA.findPlayer(trimmedInput);

    if (!regNameTest.test(trimmedInput)) {
      alert("Please enter the full name of the player.");
      return false;
    } else {
      if (newPlayer != undefined) {
        loadPlayerInfo(trimmedInput);
      } else {
        alert("Player not found, Try again.");
      }
    }
  };
  // initial call to default Toppin profile
  useEffect(() => {
    const initData = loadPlayerInfo(initialState.playerInfo.fullName);
    return () => {
      initData;
    };
  }, []);

  return (
    <Box bg={colorScheme.background}>
      <ScrollView>
        <KeyboardAvoidingView>
          <PlayerProfile
            navigation={navigation}
            playerInfo={playerObj.playerInfo}
          />
          <PlayerSearch
            handleInput={handleInput}
            handleReset={() => handleReset(0)}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};

export default PlayerScreen;
