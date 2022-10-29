import React, { useEffect, useReducer } from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, ScrollView, KeyboardAvoidingView } from "native-base";
import PlayerProfile from "../components/players/PlayerProfile";
import PlayerSearch from "../components/players/PlayerSearch";
import { handleInput, initialState, reducer } from "../utils/player";
import { colorScheme } from "../constants";
import { findPlayer } from "../api";

const PlayerScreen = ({ navigation }: {
  navigation: StackNavigationProp<{ item: object }>
}) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  // initial api call to set Toppin profile
  useEffect(() => {
    findPlayer(state.playerInfo, dispatch);
  }, []);

  console.log(state);

  return (
    <Box bg={colorScheme.background}>
      <ScrollView>
        <KeyboardAvoidingView>
          <PlayerProfile
            playerInfo={state.playerInfo}
            navigation={navigation}
          />
          <PlayerSearch
            handleInput={handleInput}
            dispatch={dispatch}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};

export default PlayerScreen;
