import React, { useState, useEffect, useCallback, useReducer } from "react";
import { MotiView, AnimatePresence } from "moti";
import moment from "moment";
import { getGamesByDate } from "../api";
import Header from "../components/scores/Header";
import Scores from "../components/scores";
import ScoresLoading from "../components/scores/ScoresLoading";
import { colorScheme } from "../constants";
import { ContextInterface, ScreenNavContext } from "../GameContext";
import { gamesReducer } from "../utils/player";
import { Box, Text } from "native-base";

// todos: possible team screen component/team standings, make card transition into extended game screen
const ScoreScreen = ({ navigation }: { navigation: ContextInterface }) => {

  const [state, dispatch] = useReducer(gamesReducer, { games: [], noData: true });
  const [dayOfGames, setDate] = useState(moment().format("YYYYMMDD"));
  const [loading, setLoading] = useState(true);

  const loader = () => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }
  useEffect(() => {
    async function initData() {
      await getGamesByDate(dayOfGames, dispatch);
    }
    initData();
    loader();
  }, [dayOfGames]);

  // callback to watch date string changes
  const onSubmit = useCallback(
    (item: string) => {
      let changedDate = item;
      setDate(changedDate);
      setLoading(true);
    }
    , []
  );

  return (
    <AnimatePresence exitBeforeEnter>
      <MotiView
        from={{ opacity: 0.7, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "timing",
          duration: 20,
        }}
        style={{
          alignItems: "center",
          backgroundColor: colorScheme.background,
          width: "100%",
          height: "100%",
        }}
      >
        <Header loading={loading} onSubmit={onSubmit} todaysDate={dayOfGames} />
        {state.noData && (
          <Box alignItems="center" bg="blue.50" w={400} h={400}>
            <Text>No Data</Text>
          </Box>
        )}
        {loading && !state.noData && (
          <MotiView
            key="scoresLoading"
            exit={{
              opacity: 0,
            }}
          >
            <ScoresLoading />
          </MotiView>
        )}
        {!state.noData && (
          <ScreenNavContext.Provider value={navigation}>
            <Scores
              key="scoresContainer"
              games={state.games}
            />
          </ScreenNavContext.Provider>
        )}
      </MotiView>
    </AnimatePresence>
  );
};

export default ScoreScreen;
