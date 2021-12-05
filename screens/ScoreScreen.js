import React, { useState, useEffect, useCallback } from "react";
import { Dimensions } from "react-native";
import { Flex, Text, Divider, VStack } from "native-base";
import moment from "moment";
import NBA from "nba";
import Scores from "../components/scores";
import { LoadingButton } from "../components/Buttons";
import Header from "../components/scores/Header";
import ScoresLoading from "../components/scores/ScoresLoading";
import { colorScheme } from "../constants";
// todo: possible team screen/standings, make card transition into extended game screen

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

//Initial state before NBA api's async is fulfilled
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

  const loader = () => {
    setState(newObj);
    setLoading(false);
  };
  setTimeout(() => {
    loader();
  }, 10);

  useEffect(() => {
    async function initData() {
      NBA.stats.scoreboard({ gameDate: todaysDate }).then((res) => {
        setNewObj(res.gameHeader);
      });
    }
    initData();
  }, [todaysDate]);

  // callback for date changes
  const onSubmit = useCallback((item) => {
    let changedDate = item;
    setLoading(true);
    setTodaysDate(changedDate);
    async function newDay() {
      NBA.stats
        .scoreboard({ gameDate: changedDate })
        .then((res) => setNewObj(res.gameHeader));
    }
    newDay();
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bg={colorScheme.background}
      w="100%"
      h="100%"
    >
      <Header loading={loading} onSubmit={onSubmit} todaysDate={todaysDate} />
      {loading ? (
        <>
          <ScoresLoading />
        </>
      ) : (
        <Scores item={state} navigation={navigation} date={todaysDate} />
      )}
    </Flex>
  );
};

export default ScoreScreen;
