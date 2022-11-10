import React, { useState, useEffect } from "react";
import { Box, HStack, VStack, ScrollView, Text } from "native-base";
import Header from "../components/scores/extended/Header";
import { GameSummary } from "../components/scores/Summary";
import { TeamStats } from "../components/scores/TeamStats";
import { GameStats } from "../components/scores/GameStats";
import logos from "../utils/logoManager";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { colorScheme } from "../constants";
import { getGameDetails } from "../api";
import type { GameSummaryType } from "../types/scoreTypes";
import type { GameRouteType } from "../types/routeTypes";
// import { MotiView, MotiText } from "moti";

const ExtendedGame = ({ route }: { route: GameRouteType }) => {

  const { gameId, scoreInfo } = route.params;
  const gameDate = scoreInfo.gameUrlCode.slice(0, 4);
  const gameTeams = scoreInfo.gameUrlCode.slice(-6);
  const splitAt = (index: number) => (x: string) => [x.slice(0, index), x.slice(index)];
  const [awayTeam, homeTeam] = splitAt(3)(gameTeams);
  const [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];
  const [gameInfo, setGameInfo] = useState<GameSummaryType | undefined>(undefined);

  useEffect(() => {
    async function initData() {
      await getGameDetails(gameDate, scoreInfo.gameId)
        .then((res) => {
          return res.data.g;
        })
        .then((res: GameSummaryType) => {
          setGameInfo(res);
        });
    }
    initData();
  }, []);

  if (!gameInfo) {
    return null;
  }

  return (
    <VStack
      h={windowHeight}
      w={windowWidth}
      alignItems="center"
      alignSelf="center"
      bg={colorScheme.foreground}
      key={gameId + "_extendedPage"}
    >
      {gameInfo.lpla != undefined
        ? <>
          <Header
            gameId={scoreInfo.gameId}
            arenaName={gameInfo["an"]}
            arenaCity={gameInfo["ac"]}
            arenaState={gameInfo["as"]}
            awayTeam={awayTeam}
            awayLogo={awayLogo}
            awayScore={gameInfo["lpla"].vs}
            homeTeam={homeTeam}
            homeLogo={homeLogo}
            homeScore={gameInfo["lpla"].hs}
            key="header"
          />
          <ScrollView>
            <Box
              bg={colorScheme.title}
              mt={1}
              w={windowWidth}
              h="full"
              mb={40}
              alignItems="center"
              borderRadius={32}
              key="extgamebody"
            >
              <GameSummary game={gameInfo} />
              <HStack>
                <TeamStats team={gameInfo["vls"]} />
                <TeamStats team={gameInfo["hls"]} />
              </HStack>
              <GameStats game={gameInfo} />
              <Box>
                <ScrollView mb={3}>
                  <Text>{JSON.stringify(gameInfo ? null : 'No data')}</Text>
                </ScrollView>
              </Box>
            </Box>
          </ScrollView>
        </>
        : null}
    </VStack>
  );
};

export default ExtendedGame;
