import React, { useState, useEffect, useCallback } from "react";
import { Dimensions } from "react-native";
import { Flex, Text, Divider, VStack } from "native-base";
import moment from "moment";
import NBA from "nba";
import ScoreCard from "../components/ScoreCard";
import { LoadingButton } from "../components/Buttons";
import DatePicker from "../components/DatePicker";
// todo: possible team screen/standings

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

//Initial object to use before the nba api's async is fulfilled
const initialState = [
  {
    gamecode: "Games Loading",
    gameStatusText: "",
    livePeriodTimeBcast: "",
  },
];

const Home = ({ navigation }) => {
  const [todaysDate, setTodaysDate] = useState(moment().format("L"));
  const [state, setState] = useState(initialState);
  const [newObj, setNewObj] = useState([]);
  const [loading, setLoading] = useState(true);
  const image = require("../assets/double-bubble-dark.png");

  const loader = () => {
    setState(newObj);
    setLoading(false);
  };
  setTimeout(() => {
    loader();
  }, 1000);

  useEffect(() => {
    async function initData() {
      NBA.stats.scoreboard({ gameDate: todaysDate }).then((res) => {
        setNewObj(res.gameHeader);
      });
    }
    initData();
  }, [todaysDate]);
  // callback for datepicker changes
  const onSubmit = useCallback((item) => {
    let changedDate = item;
    setTodaysDate(changedDate);
    async function newDay() {
      setNewObj([]);
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
      bg="#273e47"
      w="100%"
      h="100%"
    >
      <VStack
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
        bg="#C32F27"
        w={windowWidth * 0.98}
        h={windowHeight * 0.14}
        mb={30}
        m={4}
        p={3}
        br={3}
      >
        <Text m={1} fontSize="2xl" color="#F7B538" bold>
          Scores for {todaysDate}
        </Text>
        <Divider bg="#D8572A" w={windowWidth + 0.93} />
        <Text color="#F7B538" mb={1} fontSize="sm">
          Quickly stay updated
        </Text>
        <DatePicker onSubmit={onSubmit} />
      </VStack>
      {/* scorecard list component showcasing today's scores*/}
      {loading ? (
        <>
          <Text> Loading. . .</Text>
        </>
      ) : (
        <ScoreCard navigation={navigation} date={todaysDate} item={state} />
      )}
    </Flex>
  );
};

export default Home;
