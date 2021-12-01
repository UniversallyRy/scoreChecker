import React, { useState, useEffect } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import {
  Flex,
  Text,
  Image,
  Divider,
  InfoIcon,
  VStack,
  Pressable,
  Stack,
  Container,
  HStack,
  Heading,
  FlatList,
} from "native-base";
import NBA from "nba";
import moment from "moment";
import logos from "../logoManager";
import { LoadingButton } from "./Buttons";

// WebP only images currently, todo: png/jpeg backups
// logo 35 x 50
const todaysDate = moment().format("L");
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Score = ({ u, navigation }) => {
  const [homeScore, setHome] = useState(0);
  const [extendedState, setExtended] = useState(0);
  const [awayScore, setAway] = useState(0);
  const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
  let comp = u.gamecode.slice(-6);
  let date = u.gamecode.slice(0, 8);
  let splitTeam = splitAt(3)(comp);
  let [awayTeam, homeTeam] = [splitTeam[0], splitTeam[1]];
  let [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];

  useEffect(() => {
    async function initData() {
      NBA.data
        .boxScore(date, u.gameId)
        .then((res) => res.sports_content)
        .then((res) => res.game)
        .then((res) => {
          setAway(res.visitor.score);
          setHome(res.home.score);
        });
    }
    initData();
  }, []);

  return (
    <VStack
      width={windowWidth * 0.935}
      bg="#C32F27"
      alignItems="center"
      alignSelf="center"
      justifyContent="center"
      borderRadius={6}
      mb={20}
      bottom={0}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.55}
      shadowRadius={3.84}
      elevation={5}
      p={1}
    >
      <HStack alignItems="center" my={5}>
        <VStack alignItems="center">
          <Heading fontSize="lg" mb={2} bold>
            {awayTeam} - {awayScore}
          </Heading>
          {/* Team Logos */}
          <Image
            accessibilityLabel={awayTeam}
            source={awayLogo}
            w={50}
            h={50}
            m={1}
            PlaceholderContent={<ActivityIndicator />}
            alt="Away Logo"
          />
        </VStack>

        <Heading ml={25} mr={25} bold>
          @
        </Heading>

        <VStack alignItems="center">
          <Heading fontSize="lg" mb={2} bold>
            {homeTeam} - {homeScore}{" "}
          </Heading>
          <Image
            accessibilityLabel={homeTeam}
            source={homeLogo}
            w={50}
            h={50}
            m={1}
            PlaceholderContent={<ActivityIndicator />}
            alt="Home Logo"
          />
        </VStack>
      </HStack>
      {/* Game Status(Shows postponed, game times in EST and info is selectable only if game is already played ) */}
      <Text alignSelf="center" fontSize="lg" bold>
        {u.gameStatusText != "PPD" ? u.gameStatusText : "Postponed"}
      </Text>
      <Divider
        bg="#D8572A"
        w={windowWidth * 0.8}
        h={1}
        alignSelf="center"
        mb={5}
      />
      <VStack alignItems="center">
        <Text alignSelf="center" fontSize="md">
          {u.gameStatusText != "Final" &&
          u.gameStatusText != "PPD" &&
          u.livePeriodTimeBcast.charAt(1) != "0"
            ? u.livePeriodTimeBcast
            : ""}
        </Text>
        <Pressable>
          <InfoIcon
            size="7"
            onPress={() => {
              // When game status is still showing a start time, or postponed, no routing and returns null
              if (u.gameStatusText.length > 7 || u.gameStatusText == "PPD") {
                return null;
              } else {
                // Navigate to the Extended Score route with params
                navigation.navigate("Extended Score", {
                  itemId: 10,
                  scoreInfo: u,
                });
              }
            }}
          />
        </Pressable>
      </VStack>
    </VStack>
  );
};

const ScoreCard = ({ item, date, navigation }) => {
  const [loading, setLoading] = useState(true);
  const numOfGames = item.length;

  const renderItem = ({ item }) => (
    <Score key={item.gameId} u={item} navigation={navigation} />
  );

  useEffect(() => {
    const checkInfo = () => {
      if (item !== undefined) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };
    return () => {
      checkInfo();
    };
  }, [item]);

  return (
    <VStack
      alignSelf="center"
      alignContent="center"
      justifyContent="center"
      flex={1}
      w={windowWidth}
      m={3}
    >
      <Text fontSize="md" m={1} alignSelf="center" color="#F7B538">
        {numOfGames} Games Today
      </Text>
      {!loading ? (
        <VStack m={4} mb={2} safeArea>
          <FlatList
            data={item}
            renderItem={renderItem}
            keyExtractor={(item) => item.gameId.toString()}
          />
        </VStack>
      ) : (
        <Container
          alignSelf="center"
          alignItems="center"
          bg="#C32F27"
          h={windowHeight * 0.35}
        >
          <VStack alignItems="center">
            <Heading fontSize="xl" color="#F7B538">
              Loading
            </Heading>
            <Divider
              bg="#D8572A"
              w={windowWidth * 0.8}
              h={1}
              alignSelf="center"
              mb={5}
            />
            <LoadingButton h={300} alignSelf="center" />
          </VStack>
        </Container>
      )}
    </VStack>
  );
};

export default ScoreCard;
