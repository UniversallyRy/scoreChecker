import React, { useState, useEffect } from "react";
import { Text, Image, Divider, VStack, HStack, Heading } from "native-base";
import { MotiView } from "moti";
import { useMotiPressable } from 'moti/interactions';
import { colorScheme } from "../../../constants";
import InfoButton from "../InfoButton";
import logos from "../../../utils/logoManager";
import { windowWidth } from "../../../utils/dimensions";
import { getGameDetails } from "../../../api";
import type { GameSummaryType, GameType } from "../../../types/scoreTypes";

// WebP only images currently, todo: png/jpeg backups
// logo 35 x 50
const ScoreCard = ({ game }: { game: GameType }) => {
  // console.log(game);

  const splitAt = (index: number) => (x: string) => [x.slice(0, index), x.slice(index)];
  const [scores, setScores] = useState({ awayScore: 0, homeScore: 0 });
  const [isFinished, setFinish] = useState('');
  const [gameClock, setClock] = useState('');
  let comp = game["gameUrlCode"].slice(-6);
  let gameYear = game["gameUrlCode"].slice(0, 4);
  let [awayTeam, homeTeam] = splitAt(3)(comp);
  let [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];

  const state = useMotiPressable(({ pressed, hovered }) => {
    'worklet';

    return {
      opacity: hovered || pressed ? 1 : 0.95,
      scale: hovered || pressed ? 1.5 : 1
    };
  }, []);

  useEffect(() => {
    async function initData() {
      await getGameDetails(gameYear, game["gameId"])
        .then((res) => {
          return res.data.g;
        })
        .then((res: GameSummaryType) => {
          if (res.lpla == undefined) {
            return null;
          } else {
            setScores({
              awayScore: res.lpla.vs,
              homeScore: res.lpla.hs
            });
            setClock(res.cl);
            setFinish(res.stt);
          }
        });
    }
    initData();
  }, []);

  return (
    <MotiView state={state}>
      <VStack
        width={windowWidth * 0.935}
        bg={colorScheme.foreground}
        alignItems="center"
        alignSelf="center"
        justifyContent="center"
        borderRadius={6}
        mb={20}
        bottom={0}
        shadow="5"
        p={1}
        key={'listItem:' + game["gameId"]}
      >

        <HStack alignItems="center" my={3}>
          <VStack>
            <MotiView
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "timing",
                duration: 1050,
              }}
            >
              <Heading
                color={colorScheme.text}
                fontSize="xl"
                fontFamily="heading"
                fontWeight={700}
                mb={2}
              >
                {awayTeam}{" "}
                {scores.awayScore == 0 ? "" : "-  " + scores.awayScore}
              </Heading>
              {/* Team Logos */}
              <Image
                alignSelf="center"
                accessibilityLabel={awayTeam}
                source={awayLogo}
                w={50}
                h={50}
                m={1}
                alt="Away Logo"
              />
            </MotiView>
          </VStack>

          <Heading
            color={colorScheme.text}
            mx={25}
            fontWeight={700}
            fontFamily="body"
          >
            @
          </Heading>

          <VStack>
            <MotiView
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "timing",
                duration: 1050,
              }}
            >
              <Heading
                color={colorScheme.text}
                fontSize="xl"
                mb={2}
                fontFamily="heading"
                fontWeight={700}
              >
                {homeTeam}{" "}
                {scores.homeScore == 0 ? "" : "-  " + scores.homeScore}
              </Heading>
              <Image
                alignSelf="center"
                accessibilityLabel={homeTeam}
                source={homeLogo}
                w={50}
                h={50}
                m={1}
                alt="Home Logo"
              />
            </MotiView>
          </VStack>
        </HStack>
        {/* Game Status(Shows postponed, game times in EST and info is selectable only if game is already played ) */}
        <Text>
          {null}
        </Text>
        <Divider
          bg={colorScheme.divider}
          w={windowWidth * 0.8}
          h={1}
          alignSelf="center"
          mb={5}
        />
        <VStack alignItems="center">
          <Text color={colorScheme.text} textAlign="center">
            {isFinished !== ''
              ? isFinished
              : null}
            {isFinished == null
              ? gameClock
              : null}
            {isFinished == ''
              ? game["startTimeEastern"]
              : null}
          </Text>
          <InfoButton isFinished={isFinished} game={game} />
        </VStack>
      </VStack>
    </MotiView>
  );
};

export default ScoreCard;
