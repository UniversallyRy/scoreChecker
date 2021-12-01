import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, ActivityIndicator } from "react-native";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
} from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import NBA from "nba";
import moment from "moment";
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from "../constants";
import logos from "../logoManager";
import Scores from "../components/scores";
import { LoadingButton } from "../components/Buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StatLeaders from "../components/StatLeaders";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const extendedGame = ({ navigation, route }) => {
  // todos: will need to break down in seperate components(seperate statsleader/linescores possibly)
  // seperate screen from components
  const [leaderDropdown, setDropdown] = useState({ value: "Points" });
  const [statState, setStat] = useState("Points");
  const [gameData, setData] = useState({});
  const [homeScore, setHome] = useState(0);
  const [awayScore, setAway] = useState(0);
  const [homeLeaders, setHomeLeaders] = useState({});
  const [awayLeaders, setAwayLeaders] = useState({});
  const [homePic, setHomePic] = useState({});
  const [awayPic, setAwayPic] = useState({});
  const { itemId, scoreInfo } = route.params;
  const [homeLines, setHomeLines] = useState([]);
  const [awayLines, setAwayLines] = useState([]);
  const [scorerHome, setScorerHome] = useState("");
  const [scorerAway, setScorerAway] = useState("");
  const image = require("../assets/double-bubble-dark.png");
  const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
  let comp = scoreInfo.gamecode.slice(-6);
  let date = scoreInfo.gamecode.slice(0, 8);
  let splitTeam = splitAt(3)(comp);
  let [awayTeam, homeTeam] = [splitTeam[0], splitTeam[1]];
  let [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];
  let controller;

  const changeStats = (stat) => {
    const newStat = stat;
    setStat(stat);
    NBA.data
      .boxScore(date, scoreInfo.gameId)
      .then((res) => res.sports_content)
      .then((res) => res.game)
      .then((res) => {
        setHomeLeaders(res.home.Leaders[newStat]);
        setAwayLeaders(res.visitor.Leaders[newStat]);
        setScorerHome(
          res.home.Leaders[newStat].leader[0].FirstName +
            " " +
            res.home.Leaders[newStat].leader[0].LastName
        );
        setScorerAway(
          res.visitor.Leaders[newStat].leader[0].FirstName +
            " " +
            res.visitor.Leaders[newStat].leader[0].LastName
        );
        setHomePic(res.home.Leaders[newStat].leader[0].PersonID);
        setAwayPic(res.visitor.Leaders[newStat].leader[0].PersonID);
      });
  };

  useEffect(() => {
    async function initData() {
      // fetches data needed for single scorecard and gives values to above states.
      NBA.data
        .boxScore(date, scoreInfo.gameId)
        .then((res) => res.sports_content)
        .then((res) => res.game)
        .then((res) => {
          setHome(res.home.score);
          setAway(res.visitor.score);
          setHomeLeaders(res.home.Leaders.Points);
          setAwayLeaders(res.visitor.Leaders.Points);
          setHomeLines(res.home.linescores.period);
          setAwayLines(res.visitor.linescores.period);
          setData(res);
          setScorerHome(
            res.home.Leaders.Points.leader[0].FirstName +
              " " +
              res.home.Leaders.Points.leader[0].LastName
          );
          setScorerAway(
            res.visitor.Leaders.Points.leader[0].FirstName +
              " " +
              res.visitor.Leaders.Points.leader[0].LastName
          );
          setHomePic(res.home.Leaders.Points.leader[0].PersonID);
          setAwayPic(res.visitor.Leaders.Points.leader[0].PersonID);
        });
    }
    initData();
  }, []);

  const LineScores = () => {
    let awayArr = [];
    let homeArr = [];

    if (awayLines.length >= 4) {
      awayLines.map((u, i) => {
        return (awayArr[i] = u.score);
      });
      homeLines.map((u, i) => {
        return (homeArr[i] = u.score);
      });
    }

    return (
      <Container style={styles.quarterCard}>
        <Heading m={1}>Game Quarter Logs</Heading>
        <HStack style={styles.quarterContainer}>
          {awayLines ? (
            <>
              <VStack style={{ marginRight: 25 }}>
                {awayArr.map((u, i) => {
                  const quarter = `Q${i + 1}: ` + u;
                  const overtime = `OT ${i - 4}: ` + u;
                  return (
                    <Text key={i} style={styles.quarterText}>
                      {i < 5 ? quarter : overtime}
                    </Text>
                  );
                })}
              </VStack>
              <VStack style={{ marginLeft: 25 }}>
                {homeArr.map((u, i) => {
                  const quarter = `Q${i + 1}: ` + u;
                  const overtime = `OT ${i - 4}: ` + u;
                  return (
                    <Text key={i} style={styles.quarterText}>
                      {i < 5 ? quarter : overtime}
                    </Text>
                  );
                })}
              </VStack>
            </>
          ) : (
            <></>
          )}
        </HStack>
      </Container>
    );
  };

  return (
    <Flex style={styles.container}>
      <VStack m={5} style={styles.scoreCard} style={styles.scoreCard}>
        <HStack style={styles.teamVersus}>
          <VStack>
            <Text style={styles.title}>
              {awayTeam} - {awayScore}
            </Text>
            <Image
              accessibilityLabel={awayTeam}
              source={awayLogo}
              style={{ width: 50, height: 50, margin: 5 }}
              PlaceholderContent={<ActivityIndicator />}
              alt="Away Team Logo"
            />
          </VStack>

          <Text
            style={{
              justifyContent: "center",
              fontWeight: "bold",
              marginLeft: 25,
              marginRight: 25,
            }}
          >
            At
          </Text>

          <VStack>
            <Text style={styles.title}>
              {homeTeam} - {homeScore}{" "}
            </Text>
            <Image
              accessibilityLabel={homeTeam}
              source={homeLogo}
              style={{ width: 50, height: 50, margin: 5 }}
              PlaceholderContent={<ActivityIndicator />}
              alt="Home Team Logo"
            />
          </VStack>
        </HStack>
        <Text m={3}>Arena: {gameData.arena}</Text>
        <Text m={3}>
          City: {gameData.city}, {gameData.country}
        </Text>

        <Flex
          style={{
            width: windowWidth * 0.8,
            minHeight: 100,
            margin: 5,
            ...(Platform.OS !== "android" && {
              zIndex: 10,
              margin: 5,
              width: windowWidth * 0.8,
            }),
          }}
        >
          <DropDownPicker
            style={{ height: 40, margin: 5 }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            items={[
              {
                label: "Points",
                value: "Points",
                icon: () => (
                  <MaterialCommunityIcons
                    name="basketball"
                    size={18}
                    color="#900"
                    style={{ marginRight: 10 }}
                  />
                ),
              },
              {
                label: "Rebounds",
                value: "Rebounds",
                icon: () => (
                  <MaterialCommunityIcons
                    name="basketball"
                    size={18}
                    color="#900"
                    style={{ marginRight: 10 }}
                  />
                ),
              },
              {
                label: "Assists",
                value: "Assists",
                icon: () => (
                  <MaterialCommunityIcons
                    name="basketball"
                    size={18}
                    color="#900"
                    style={{ marginRight: 10 }}
                  />
                ),
              },
            ]}
            dropDownStyle={{ backgroundColor: "darkgrey", marginTop: 1 }}
            style={styles.dropDown}
            controller={(instance) => (controller = instance)}
            onChangeItem={(item) => {
              setDropdown({ value: item.value });
              changeStats(item.value);
            }}
            defaultValue={statState}
          />
        </Flex>
        <StatLeaders
          awayLeaders={awayLeaders}
          homeLeaders={homeLeaders}
          state={statState}
          scorerAway={scorerAway}
          scorerHome={scorerHome}
          awayP={`${PROFILE_PIC_URL_PREFIX}/${awayPic}.png`}
          homeP={`${PROFILE_PIC_URL_PREFIX}/${homePic}.png`}
        />
        <LineScores />
      </VStack>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    flex: 1,
    backgroundColor: "#273e47",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scoreCard: {
    alignSelf: "center",
    backgroundColor: "#C32F27",
    height: windowHeight * 0.9,
    width: windowWidth * 0.97,
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.85,
    shadowRadius: 5.84,
    elevation: 6,
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    marginBottom: 5,
  },
  teamVersus: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    margin: 5,
    marginBottom: 5,
  },
  quarterCard: {
    bottom: 0,
    width: windowWidth * 0.75,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "darkgrey",
    backgroundColor: "darkgrey",
  },
  quarterText: {
    color: "black",
    fontWeight: "bold",
    margin: 1,
  },
  quarterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "darkgrey",
    borderColor: "darkgrey",
  },
  dropDown: {
    alignItems: "center",
    backgroundColor: "#C32F27",
    borderColor: "darkgrey",
  },
});

export default extendedGame;
