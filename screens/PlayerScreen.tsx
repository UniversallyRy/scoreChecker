import React, { useEffect, useReducer } from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, ScrollView, KeyboardAvoidingView } from "native-base";
import PlayerCard from "../components/player/Card";
import PlaceHolder from "../components/player/Placeholder";
import SearchBar from "../components/player/SearchBar";
import { initialState, handleInput, playerReducer } from "../utils/player";
import { colorScheme } from "../constants";
import { findPlayer } from "../api";

const PlayerScreen = ({ navigation }: {
  navigation: StackNavigationProp<{ item: object }>
}) => {

  const [state, dispatch] = useReducer(playerReducer, initialState);

  const loader = () => {
    findPlayer(state.playerInfo, dispatch);
  };
  setTimeout(() => {
    loader();
  }, 300);

  useEffect(() => {
    loader();
  }, []);

  return (
    <Box bg={colorScheme.background}>
      <ScrollView>
        <KeyboardAvoidingView>
          {Object.prototype.hasOwnProperty.call(state.playerInfo, 'pl')
            ? <PlayerCard
              playerInfo={state.playerInfo}
              navigation={navigation}
            />
            : <PlaceHolder />
          }
          <SearchBar
            handleInput={handleInput}
            dispatch={dispatch}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};

export default PlayerScreen;
