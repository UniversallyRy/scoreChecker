import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Dimensions } from "react-native";
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
    <Flex style={styles.container}>
      <VStack style={styles.titleContainer}>
        <Text style={styles.title}>Scores for {todaysDate}</Text>
        <Divider style={styles.divider} />
        <Text style={styles.text}>Quickly stay updated</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#273e47",
  },
  titleContainer: {
    width: windowWidth * 0.98,
    height: windowHeight * 0.14,
    margin: 4,
    borderRadius: 3,
    padding: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C32F27",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F7B538",
    margin: 3,
  },
  text: {
    alignSelf: "center",
    color: "#F7B538",
    marginBottom: 10,
    fontSize: 12,
  },
  divider: {
    backgroundColor: "#D8572A",
    width: windowWidth * 0.93,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default Home;
