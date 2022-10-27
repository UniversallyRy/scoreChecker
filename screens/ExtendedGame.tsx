import React, { useState, useEffect } from "react";
import { Box, HStack, VStack } from "native-base";
import { colorScheme } from "../constants";
import Header from "../components/scores/extended/Header";
import logos from "../logoManager";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { GameRouteType } from "../types";
import { getGameDetails } from "../api";
import { GameSummary } from "../components/scores/Summary";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { TeamStats } from "../components/scores/TeamStats";
import { GameStats } from "../components/scores/GameStats";
// import { MotiView, MotiText } from "moti";


const ExtendedGame = ({ route }: { route: GameRouteType }) => {

  const [gameInfo, setGameInfo] = useState({});
  const { itemId, scoreInfo } = route.params;
  const gameDate = scoreInfo.gameUrlCode.slice(0, 4);
  const gameTeams = scoreInfo.gameUrlCode.slice(-6);
  const splitAt = (index: number) => (x: string) => [x.slice(0, index), x.slice(index)];
  const [awayTeam, homeTeam] = splitAt(3)(gameTeams);
  const [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];

  useEffect(() => {
    async function initData() {
      // on initial render, async call for more game data using gameId
      await getGameDetails(gameDate, scoreInfo.gameId)
        .then((res) => {
          return res.data.g;
        })
        .then((res) => {
          setGameInfo((prevState) => ({
            ...prevState,
            res
          }));
        });
    }
    initData();
  }, []);

  return (
    <VStack
      h={windowHeight}
      w={windowWidth}
      alignItems="center"
      alignSelf="center"
      bg={colorScheme.foreground}
      key={itemId + "_extendedPage"}
    >
      {gameInfo.res != undefined
        ? <>
          <Header
            gameId={scoreInfo.gameId}
            arenaName={gameInfo.res.an}
            arenaCity={gameInfo.res.ac}
            arenaState={gameInfo.res.as}
            awayTeam={awayTeam}
            awayLogo={awayLogo}
            awayScore={gameInfo.res.lpla.vs}
            homeTeam={homeTeam}
            homeLogo={homeLogo}
            homeScore={gameInfo.res.lpla.hs}
            key="header"
          />
          <ScrollView>
            <Box
              bg={colorScheme.title}
              mt={1}
              w={windowWidth}
              h={windowHeight}
              alignItems="center"
              borderRadius={32}
              key="extgamebody"
            >
              <GameSummary game={gameInfo.res} />
              <HStack>
                <TeamStats team={gameInfo.res.vls} />
                <TeamStats team={gameInfo.res.hls} />
              </HStack>
              <GameStats game={gameInfo.res} />
              <View>
                <ScrollView>
                  <Text>{JSON.stringify(gameInfo ? null : 'No data')}</Text>
                </ScrollView>
              </View>)
            </Box>
          </ScrollView>
        </>
        : null}
    </VStack>
  );
};

export default ExtendedGame;
