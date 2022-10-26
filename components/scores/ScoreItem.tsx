import React, { useState, useEffect } from "react";
import { Text, Image, Divider, VStack, HStack, Heading } from "native-base";
import { MotiView } from "moti";
import logos from "../../logoManager";
import { colorScheme } from "../../constants";
import InfoButton from "./InfoButton";
import { windowWidth } from "../../utils/dimensions";
import type { GameType } from "../../types/scores";
import { getGameDetails } from "../../api";

// WebP only images currently, todo: png/jpeg backups
// logo 35 x 50
const ScoreItem = ({ game, todaysDate }: { game: GameType, todaysDate: string }) => {

  const splitAt = (index: number) => (x: string) => [x.slice(0, index), x.slice(index)];
  const [scores, setScores] = useState({ awayScore: 0, homeScore: 0 });
  let comp = game.gameUrlCode.slice(-6);
  let gameYear = game.gameUrlCode.slice(0, 4);
  let [awayTeam, homeTeam] = splitAt(3)(comp);
  let [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];

  useEffect(() => {
    async function initData() {
      await getGameDetails(gameYear, game.gameId)
        .then((res) => {
          console.log(res.data[0]);
        });
    }
    initData();
  }, [game.gameId]);

  return (
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
    >
      <HStack alignItems="center" my={5}>
        <VStack alignItems="center">
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

        <VStack alignItems="center">
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
      <Text
        color={colorScheme.text}
        alignSelf="center"
        fontSize="lg"
        fontWeight={500}
        fontStyle="italic"
      >
        {game.gameStatusText != "PPD" ? game.gameStatusText : "Postponed"}
      </Text>
      <Divider
        bg={colorScheme.divider}
        w={windowWidth * 0.8}
        h={1}
        alignSelf="center"
        mb={5}
      />
      <VStack alignItems="center">
        <Text alignSelf="center" fontSize="md" fontWeight="light">
          {!game.isGameActivated &&
            (Number(game.homeStartDate) >= Number(todaysDate)) &&
            (game.homeStartDate = todaysDate)
            ? game.startTimeEastern
            : ""}
        </Text>
        <InfoButton game={game} />
      </VStack>
    </VStack>
  );
};

export default ScoreItem;
