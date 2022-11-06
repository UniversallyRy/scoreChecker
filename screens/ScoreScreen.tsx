import React, { useState, useEffect, useCallback, useReducer} from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { MotiView, AnimatePresence } from "moti";
import moment from "moment";
import { getGamesByDate } from "../api";
import Header from "../components/scores/Header";
import Scores from "../components/scores";
import ScoresLoading from "../components/scores/ScoresLoading";
import { colorScheme } from "../constants";
import { ScreenNavContext } from "../GameContext";
import { gamesReducer } from "../utils/player";
// todos: possible team screen component/team standings, make card transition into extended game screen
export interface ContextInterface {
  navigation: StackNavigationProp<ParamListBase, string, undefined>;
}

const initialState = {
  games: [],
};

const ScoreScreen = ({ navigation }: any) => {
  const [state, dispatch] = useReducer(gamesReducer, initialState);
  const [todaysDate, setTodaysDate] = useState(moment().format("YYYYMMDD"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initData() {
      await getGamesByDate(todaysDate, dispatch);
    }
    initData();
  }, [todaysDate]);

  const loader = () => {
    setLoading(false);
  };
  setTimeout(() => {
    loader();
  }, 500);

  // callback for date changes
  const onSubmit = useCallback(
    (item) => {
      let changedDate = item;
      setTodaysDate(changedDate);
      setLoading(true);
    }
    , [todaysDate]
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
        <Header loading={loading} onSubmit={onSubmit} todaysDate={todaysDate} />
        {loading && (
          <MotiView
            key="scoresLoading"
            exit={{
              opacity: 0,
            }}
          >
            <ScoresLoading />
          </MotiView>
        )}
        {!loading && (
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
