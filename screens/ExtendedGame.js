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
  const [gameData, setGameData] = useState({});
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeLeadValue, setHomeLeaders] = useState({});
  const [awayLeadValue, setAwayLeaders] = useState({});
  const [homePlayerPic, setHomePic] = useState({});
  const [awayPlayerPic, setAwayPic] = useState({});
  const { itemId, scoreInfo } = route.params;
  const [homeLines, setHomeLines] = useState([]);
  const [awayLines, setAwayLines] = useState([]);
  const [homePlayer, setHomePlayer] = useState("");
  const [awayPlayer, setAwayPlayer] = useState("");

  const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
  let teams = scoreInfo.gamecode.slice(-6);
  let date = scoreInfo.gamecode.slice(0, 8);
  let splitTeam = splitAt(3)(teams);
  let [awayTeam, homeTeam] = [splitTeam[0], splitTeam[1]];
  let [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];

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
          setHomeScore(res.home.score);
          setAwayScore(res.visitor.score);
          setHomeLeaders(res.home.Leaders.Points);
          setAwayLeaders(res.visitor.Leaders.Points);
          setHomeLines(res.home.linescores.period);
          setAwayLines(res.visitor.linescores.period);
          setGameData(res);
          setHomePlayer(
            res.home.Leaders.Points.leader[0].FirstName +
              " " +
              res.home.Leaders.Points.leader[0].LastName
          );
          setAwayPlayer(
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
        setHomePic(res.home.Leaders[newStat].leader[0].PersonID);
        setAwayPic(res.visitor.Leaders[newStat].leader[0].PersonID);
        setHomeLeaders(res.home.Leaders[newStat]);
        setAwayLeaders(res.visitor.Leaders[newStat]);
        setHomePlayer(
          res.home.Leaders[newStat].leader[0].FirstName +
            " " +
            res.home.Leaders[newStat].leader[0].LastName
        );
        setAwayPlayer(
          res.visitor.Leaders[newStat].leader[0].FirstName +
            " " +
            res.visitor.Leaders[newStat].leader[0].LastName
        );
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
          gameData={gameData}
          awayTeam={awayTeam}
          awayLogo={awayLogo}
          awayScore={awayScore}
          homeTeam={homeTeam}
          homeLogo={homeLogo}
          homeScore={homeScore}
        />
        <StatLeaders
          awayPic={{ uri: `${PROFILE_PIC_URL_PREFIX}/${awayPlayerPic}.png` }}
          awayLeadValue={awayLeadValue}
          awayPlayer={awayPlayer}
          homePic={{ uri: `${PROFILE_PIC_URL_PREFIX}/${homePlayerPic}.png` }}
          homePlayer={homePlayer}
          homeLeadValue={homeLeadValue}
          statState={statState}
          changeStats={changeStats}
        />
        <QuarterLogs awayLines={awayLines} homeLines={homeLines} />
      </VStack>
    </Flex>
  );
};

export default ExtendedGame;
