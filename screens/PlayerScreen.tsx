import React, { useEffect, useReducer } from "react";
import { StackScreenProps } from '@react-navigation/stack';
import { Box, ScrollView, KeyboardAvoidingView } from "native-base";
import PlayerCard from "../components/player/Card";
import PlaceHolder from "../components/player/Placeholder";
import SearchBar from "../components/player/SearchBar";
import { initialState, handleInput, playerReducer } from "../utils/player";
import { colorScheme } from "../constants";
import { findPlayer } from "../api";
import { AnimatePresence } from "moti";
import type { PlayerStackParams } from "../components/navigation/Screens";

type ScoreStackProps = StackScreenProps<PlayerStackParams, 'Extended Profile'>;
// Context's value is navigation prop from react-navigation/stack
export type ProfileInterface = ScoreStackProps['navigation'];

const PlayerScreen = ({ navigation }: { navigation: ProfileInterface }) => {

  const [state, dispatch] = useReducer(playerReducer, initialState);

  const loadPlayerInfo = () => {
    findPlayer(state.playerInfo, dispatch);
  };

  setTimeout(() => {
    loadPlayerInfo();
  }, 300);

  useEffect(() => {
    loadPlayerInfo();
  }, []);

  return (
    <Box alignItems="center" bg={colorScheme.background}>
      <ScrollView>
        <KeyboardAvoidingView>
          <AnimatePresence exitBeforeEnter>
            {Object.prototype.hasOwnProperty.call(state.playerInfo, 'pl')
              ? <PlayerCard
                playerInfo={state.playerInfo}
                navigation={navigation}
              />
              : <PlaceHolder />
            }
          </AnimatePresence>
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
