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
import NBA from "nba";
import moment from "moment";
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from "../constants";
import Scores from "../components/scores";
import Header from "../components/scores/extended/Header";
import StatLeaders from "../components/scores/extended/StatLeaders";
import QuarterLogs from "../components/scores/extended/QuarterLogs";
import { LoadingButton } from "../components/Buttons";
import logos from "../logoManager";
import DropDown from "../components/scores/extended/DropDown";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ExtendedGame = ({ navigation, route }) => {
  // todos: will need to break down in seperate components(seperate statsleader/linescores possibly)
  // need to fix player leaders pictures
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

  useEffect(() => {
    async function initData() {
      // fetches data needed for single scorecard and gives values to above states.
      NBA.data
        .boxScore(date, scoreInfo.gameId)
        .then((res) => res.sports_content)
        .then((res) => res.game)
        .then((res) => {
          setHomePic(res.home.Leaders.Points.leader[0].PersonID);
          setAwayPic(res.visitor.Leaders.Points.leader[0].PersonID);
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
        });
    }
    initData();
  }, []);

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

  return (
    <Flex h={windowHeight} bg="#273e47" p={2}>
      <VStack
        alignSelf="center"
        bg="#C32F27"
        h={windowHeight * 0.9}
        w={windowWidth * 0.97}
        alignItems="center"
        borderRadius={5}
        shadowColor="#000"
        shadowOffset={{ width: 1, height: 3 }}
        shadowOpacity={0.85}
        shadowRadius={5.84}
        elevation={6}
      >
        <Header
          awayTeam={awayTeam}
          awayLogo={awayLogo}
          awayScore={awayScore}
          homeTeam={homeTeam}
          homeLogo={homeLogo}
          homeScore={homeScore}
          gameData={gameData}
        />
        <StatLeaders
          awayLeaders={awayLeaders}
          homeLeaders={homeLeaders}
          changeStats={changeStats}
          scorerAway={scorerAway}
          scorerHome={scorerHome}
          statState={statState}
          awayP={`${PROFILE_PIC_URL_PREFIX}/${awayPic}.png`}
          homeP={`${PROFILE_PIC_URL_PREFIX}/${homePic}.png`}
        />
        <QuarterLogs awayLines={awayLines} homeLines={homeLines} />
      </VStack>
    </Flex>
  );
};

export default ExtendedGame;
