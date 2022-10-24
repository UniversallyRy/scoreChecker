import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Box, VStack } from "native-base";
import NBA from "nba";
import { PROFILE_PIC_URL_PREFIX, colorScheme } from "../constants";
import Header from "../components/scores/extended/Header";
import logos from "../logoManager";
import StatLeaders from "../components/scores/extended/StatLeaders";
import QuarterLogs from "../components/scores/extended/QuarterLogs";
// import { MotiView, MotiText } from "moti";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ExtendedGame = ({ route }: any) => {
  const { itemId, scoreInfo } = route.params;
  const gameDate = scoreInfo.gamecode.slice(0, 8);
  const gameTeams = scoreInfo.gamecode.slice(-6);
  const splitAt = (index: number) => (x: string) => [x.slice(0, index), x.slice(index)];
  const [awayTeam, homeTeam] = splitAt(3)(gameTeams);
  const [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];
  const [gameInfo, setGameInfo] = useState({
    gameArena: { arena: "", city: "", country: "" },
    statName: "",
    awayScore: 0,
    homeScore: 0,
    awayPlayer: "",
    homePlayer: "",
    awayPlayerPic: "",
    homePlayerPic: "",
    awayLeadValue: { StatValue: 0 },
    homeLeadValue: { StatValue: 0 },
    awayLines: [],
    homeLines: [],
  });
  useEffect(() => {
    async function initData() {
      // on initial render, async call for more game data using gameId
      NBA.data
        .boxScore(gameDate, scoreInfo.gameId)
        .then((res) => {
          console.log(res);
          res.sports_content;
        }
        )
        .then((res) => res.game)
        .then((res) => {
          setGameInfo({
            gameArena: res,
            awayScore: res.visitor.score,
            homeScore: res.home.score,
            statName: "Points",
            awayPlayerPic: res.visitor.Leaders.Points.leader[0].PersonID,
            homePlayerPic: res.home.Leaders.Points.leader[0].PersonID,
            awayPlayer:
              res.visitor.Leaders.Points.leader[0].FirstName +
              " " +
              res.visitor.Leaders.Points.leader[0].LastName,
            homePlayer:
              res.home.Leaders.Points.leader[0].FirstName +
              " " +
              res.home.Leaders.Points.leader[0].LastName,
            awayLeadValue: res.visitor.Leaders.Points,
            homeLeadValue: res.home.Leaders.Points,
            awayLines: res.visitor.linescores.period,
            homeLines: res.home.linescores.period,
          });
        });
    }
    initData();
  }, []);

  const changeStats = (stat: string) => {
    NBA.data
      .boxScore(gameDate, scoreInfo.gameId)
      .then((res) => res.sports_content)
      .then((res) => res.game)
      .then((res) => {
        setGameInfo((prevState) => ({
          ...prevState,
          statName: stat,
          awayPlayerPic: res.visitor.Leaders[stat].leader[0].PersonID,
          homePlayerPic: res.home.Leaders[stat].leader[0].PersonID,
          awayPlayer:
            res.visitor.Leaders[stat].leader[0].FirstName +
            " " +
            res.visitor.Leaders[stat].leader[0].LastName,
          homePlayer:
            res.home.Leaders[stat].leader[0].FirstName +
            " " +
            res.home.Leaders[stat].leader[0].LastName,
          awayLeadValue: res.visitor.Leaders[stat],
          homeLeadValue: res.home.Leaders[stat],
        }));
      });
  };

  return (
    <VStack
      h={windowHeight}
      w={windowWidth}
      alignItems="center"
      alignSelf="center"
      bg={colorScheme.foreground}
      key={itemId + "_extendedPage"}
    >
      <Header
        gameId={scoreInfo.gameId}
        gameArena={gameInfo.gameArena}
        awayTeam={awayTeam}
        awayLogo={awayLogo}
        awayScore={gameInfo.awayScore}
        homeTeam={homeTeam}
        homeLogo={homeLogo}
        homeScore={gameInfo.homeScore}
        key="header"
      />
      <Box
        bg={colorScheme.title}
        mt={1}
        w={windowWidth}
        h={windowHeight}
        alignItems="center"
        borderRadius={32}
        key="extgamebody"
      >
        <StatLeaders
          statState={gameInfo.statName}
          key="statsLeaders"
          awayPic={`${PROFILE_PIC_URL_PREFIX}/${gameInfo.awayPlayerPic}.png`}
          awayPlayer={gameInfo.awayPlayer}
          awayLeadValue={gameInfo.awayLeadValue}
          homePic={`${PROFILE_PIC_URL_PREFIX}/${gameInfo.homePlayerPic}.png`}
          homePlayer={gameInfo.homePlayer}
          homeLeadValue={gameInfo.homeLeadValue}
          changeStats={changeStats}
        />
        <QuarterLogs
          awayLines={gameInfo.awayLines}
          homeLines={gameInfo.homeLines}
          key="quarterLogs"
        />
      </Box>
    </VStack>
  );
};

export default ExtendedGame;
