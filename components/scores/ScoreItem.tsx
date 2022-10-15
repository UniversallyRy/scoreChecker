import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Text, Image, Divider, VStack, HStack, Heading } from "native-base";
import { MotiView } from "moti";
import { SharedElement } from "react-native-shared-element";
import NBA from "nba";
import logos from "../../logoManager";
import { colorScheme } from "../../constants";
import InfoButton from "./InfoButton";
import { GameType } from "../../types";
// WebP only images currently, todo: png/jpeg backups
// logo 35 x 50
const { width: windowWidth } = Dimensions.get("window");

const ScoreItem = ({ game }: { game: GameType }) => {
  const [scores, setScores] = useState({
    awayScore: 0,
    homeScore: 0,
  });
  let comp = game.gamecode.slice(-6);
  let gameDate = game.gamecode.slice(0, 8);
  const splitAt = (index: number) => (x: string) => [x.slice(0, index), x.slice(index)];
  let [awayTeam, homeTeam] = splitAt(3)(comp);
  let [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];

  useEffect(() => {
    async function initData() {
      NBA.data
        .boxScore(gameDate, game.gameId)
        .then((res) => res.sports_content)
        .then((res) => res.game)
        .then((res) => {
          setScores(() => ({
            awayScore: res.visitor.score,
            homeScore: res.home.score,
          }));
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
            <SharedElement
              id={`item.${game.gameId}`}
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
            </SharedElement>
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
            <SharedElement id={`item.${homeTeam}.name`}>
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
            </SharedElement>
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
          {game.gameStatusText != "Final" &&
            game.gameStatusText != "PPD" &&
            game.livePeriodTimeBcast.charAt(1) != "0"
            ? game.livePeriodTimeBcast
            : ""}
        </Text>
        <InfoButton game={game} />
      </VStack>
    </VStack>
  );
};

export default ScoreItem;
