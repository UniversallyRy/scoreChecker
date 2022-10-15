import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import NBA from "nba";
import Scores from "../components/scores";
import Header from "../components/scores/Header";
import ScoresLoading from "../components/scores/ScoresLoading";
import { colorScheme } from "../constants";
import { MotiView, AnimatePresence } from "moti";
// todos: possible team screen component/team standings, make card transition into extended game screen

// Initial state before NBA api's async is fulfilled
const initialState = [
  {
    gamecode: "Games Loading",
    gameStatusText: "",
    livePeriodTimeBcast: "",
  },
];

const ScoreScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [newObj, setNewObj] = useState([]);
  const [todaysDate, setTodaysDate] = useState(moment().format("L"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initData() {
      NBA.stats.scoreboard({ gameDate: todaysDate }).then((res) => {
        setNewObj(res.gameHeader);
      });
    }
    initData();
  }, [todaysDate]);

  const loader = () => {
    setState(newObj);
    setLoading(false);
  };
  setTimeout(() => {
    loader();
  }, 600);

  // callback for date changes
  const onSubmit = useCallback(
    (item) => {
      setNewObj({});
      let changedDate = item;
      async function newDay() {
        NBA.stats
          .scoreboard({ gameDate: changedDate })
          .then((res) => setNewObj(res.gameHeader));

        setLoading(true);
        setTodaysDate(changedDate);
      }
      newDay();
    },
    [todaysDate]
  );

  return (
    <AnimatePresence exitBeforeEnter>
      <MotiView
        from={{ opacity: 0.7, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
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
          <Scores
            key="scores"
            exit={{
              opacity: 0,
            }}
            item={state}
            navigation={navigation}
            date={todaysDate}
          />
        )}
      </MotiView>
    </AnimatePresence>
  );
};

export default ScoreScreen;
