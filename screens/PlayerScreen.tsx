import React, { useEffect, useReducer } from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, ScrollView, KeyboardAvoidingView } from "native-base";
import NBA from "nba";
import PlayerProfile from "../components/players/PlayerProfile";
import PlayerSearch from "../components/players/PlayerSearch";
import { initialState, loadPlayerInfo, reducer } from "../utils/player";
import { colorScheme } from "../constants";

type ScreenProps = {
  navigation: StackNavigationProp<{ item: object }>
}

const PlayerScreen = ({ navigation }: ScreenProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInput = (item: { player: string }) => {
    // regex to test if 2 words were submitted
    const regNameTest = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let trimmedInput = item.player.trim();
    let newPlayer = NBA.findPlayer(trimmedInput);

    if (!regNameTest.test(trimmedInput)) {
      alert("Please enter the full name of the player.");
      return false;
    } else {
      if (newPlayer != undefined) {
        loadPlayerInfo(trimmedInput, dispatch);
      } else {
        alert("Player not found, Try again.");
      }
    }
  };
  // initial api call to set Toppin profile
  useEffect(() => {
    const initData = loadPlayerInfo(initialState.playerInfo.fullName, dispatch);
    return () => {
      initData;
    };
  }, []);

  return (
    <Box bg={colorScheme.background}>
      <ScrollView>
        <KeyboardAvoidingView>
          <PlayerProfile
            playerInfo={state.playerInfo}
            navigation={navigation}
          />
          <PlayerSearch handleInput={handleInput} />
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};

export default PlayerScreen;
