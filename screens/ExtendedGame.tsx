import React, { useState, useEffect } from "react";
import { Box, HStack, VStack, ScrollView, Text } from "native-base";
import Header from "../components/scores/extended/Header";
import { GameSummary } from "../components/scores/Summary";
import { TeamStats } from "../components/scores/TeamStats";
import { GameStats } from "../components/scores/GameStats";
import { windowHeight, windowWidth } from "../utils/dimensions";
import logos from "../utils/logoManager";
import { getGameDetails } from "../api";
import { colorScheme } from "../constants";
import type { GameSummaryType } from "../types/gameSummary";
import type { GameRouteType } from "../types";
// import { MotiView, MotiText } from "moti";


const ExtendedGame = ({ route }: { route: GameRouteType }) => {

  const [gameInfo, setGameInfo] = useState<GameSummaryType | {}>({});
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
        .then((res: GameSummaryType) => {
          // for (const [key, value] of Object.entries(res.hls.tstsg)) { console.log(`  ${key}: ${value}`) }
          //  console.log(res.offs);
          setGameInfo(res);
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
      {Object.prototype.hasOwnProperty.call(gameInfo, 'lpla')
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
