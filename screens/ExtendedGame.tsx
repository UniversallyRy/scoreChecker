import React, { useState, useEffect, createContext } from "react";
import { Box, VStack } from "native-base";
import { PROFILE_PIC_URL_PREFIX, colorScheme } from "../constants";
import Header from "../components/scores/extended/Header";
import logos from "../logoManager";
import StatLeaders from "../components/scores/extended/StatLeaders";
import QuarterLogs from "../components/scores/extended/QuarterLogs";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { GameRouteType } from "../types";
import { getGameDetails } from "../api";
import { ScoreLeaderContext } from "../LeaderContext";
// import { MotiView, MotiText } from "moti";


const ExtendedGame = ({ route }: { route: GameRouteType }) => {

  const [gameInfo, setGameInfo] = useState({
    arena: "",
    city: "",
    state: "",
    statName: "",
    awayScore: 0,
    homeScore: 0,
    awayPlayer: {} as any,
    homePlayer: {} as any,
    awayPlayerPic: "",
    homePlayerPic: "",
    awayLines: [],
    homeLines: [],
  });

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
          return res.data;
        })
        .then((res) => {
          let hplayer = {} as any;
          let hcount = 0;
          let vplayer = {} as any;
          let vcount = 0;
          res.g.vls.pstsg.map((item) => {
            if (item.pts > vcount) {
              vplayer = item;
              vcount = item.pts;
            } else {
              return null;
            }
            return [vcount, vplayer];
          });
          res.g.hls.pstsg.map((item) => {
            if (item.pts > hcount) {
              hplayer = item;
              hcount = item.pts;
            } else {
              return null;
            }
            return [hcount, hplayer];
          });
          setGameInfo((prevState) => ({
            ...prevState,
            homePlayer: hplayer,
            awayPlayer: vplayer,
            awayPlayerPic: vplayer.pid,
            homePlayerPic: hplayer.pid,
            arena: res.g.an,
            city: res.g.ac,
            state: res.g.as,
          }));
        });
    }
    initData();
  }, []);
  console.log(gameInfo.homePlayer);
  const changeStats = async (statValue: string) => {
    await getGameDetails(gameDate, scoreInfo.gameId)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        let hplayer = {} as any;
        let hcount = 0;
        let vplayer = {} as any;
        let vcount = 0;
        res.g.vls.pstsg.map((item) => {

          switch (gameInfo.statName) {
            case "Assists":
              if (item.ast > vcount) {
                vplayer = item;
                vcount = item.ast;
              } else {
                return null;
              }
              return [vcount, vplayer];
            case "Rebounds":
              if (item.reb > vcount) {
                vplayer = item;
                vcount = item.reb;
              } else {
                return null;
              }
              return [vcount, vplayer];
            case "Points":
              if (item.pts > vcount) {
                vplayer = item;
                vcount = item.pts;
              } else {
                return null;
              }
              return [vcount, vplayer];
            default:
              return null;
          }

        });
        res.g.hls.pstsg.map((item) => {
          switch (gameInfo.statName) {
            case "Assists":
              if (item.ast > hcount) {
                hplayer = item;
                hcount = item.ast;
              } else {
                break;
              }
              return [hcount, hplayer];
            case "Rebounds":
              if (item.reb > hcount) {
                hplayer = item;
                hcount = item.reb;
              } else {
                break;
              }
              return [hcount, hplayer];
            case "Points":
              if (item.pts > hcount) {
                hplayer = item;
                hcount = item.pts;
              } else {
                break;
              }
              return [hcount, hplayer];
            default:
              return undefined;
          }
          hcount = 0;
          vcount = 0;
        });
        setGameInfo((prevState) => ({
          ...prevState,
          statName: statValue,
          homePlayer: hplayer,
          awayPlayer: vplayer,
          awayPlayerPic: vplayer.pid,
          homePlayerPic: hplayer.pid,
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
        arenaName={gameInfo.arena}
        arenaCity={gameInfo.city}
        arenaState={gameInfo.state}
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
        <ScoreLeaderContext.Provider value={{ players: [gameInfo.awayPlayer, gameInfo.homePlayer] }}>
          <StatLeaders
            statState={gameInfo.statName}
            key="statsLeaders"
            awayPic={`${PROFILE_PIC_URL_PREFIX}/${gameInfo.awayPlayerPic}.png`}
            homePic={`${PROFILE_PIC_URL_PREFIX}/${gameInfo.homePlayerPic}.png`}
            changeStats={changeStats}
          />

        </ScoreLeaderContext.Provider>
        {/*  <QuarterLogs
          awayLines={gameInfo.awayLines}
          homeLines={gameInfo.homeLines}
          key="quarterLogs"
        />*/}
      </Box>
    </VStack >
  );
};

export default ExtendedGame;
