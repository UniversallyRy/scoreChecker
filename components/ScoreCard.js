import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
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
    <Flex topDivider={true} p={1} style={styles.scoreCard}>
      <Stack>
        {/* Team Logos */}
        <VStack style={styles.teamVersus}>
          <VStack>
            <Text style={styles.teams}>
              {awayTeam} - {awayScore}
            </Text>
            <Image
              accessibilityLabel={awayTeam}
              source={awayLogo}
              style={{ width: 50, height: 50, margin: 5 }}
              PlaceholderContent={<ActivityIndicator />}
              alt="Away Logo"
            />
          </VStack>

          <Text style={{ fontWeight: "bold", marginLeft: 25, marginRight: 25 }}>
            At
          </Text>

          <VStack>
            <Text style={styles.teams}>
              {homeTeam} - {homeScore}{" "}
            </Text>
            <Image
              accessibilityLabel={homeTeam}
              source={homeLogo}
              style={{ width: 50, height: 50, margin: 5 }}
              PlaceholderContent={<ActivityIndicator />}
              alt="Home Logo"
            />
          </VStack>
        </VStack>

        {/* Game Status(Shows postponed, game times in EST and info is selectable only if game is already played ) */}
        <Text style={styles.quarter}>
          {u.gameStatusText != "PPD" ? u.gameStatusText : "Postponed"}
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.broadcast}>
          {u.gameStatusText != "Final" &&
          u.gameStatusText != "PPD" &&
          u.livePeriodTimeBcast.charAt(1) != "0"
            ? u.livePeriodTimeBcast
            : ""}
          {
            <Pressable>
              <InfoIcon
                size="7"
                onPress={() => {
                  // When game status is still showing a start time, or postponed, no routing and returns null
                  if (
                    u.gameStatusText.length > 7 ||
                    u.gameStatusText == "PPD"
                  ) {
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
          }
        </Text>
      </Stack>
    </Flex>
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
    <Flex style={styles.scoreContainer}>
      <Divider style={styles.divider} />
      <Text style={styles.gameCount}>{numOfGames} Games Today</Text>
      {!loading ? (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={item}
            renderItem={renderItem}
            keyExtractor={(item) => item.gameId.toString()}
          />
        </SafeAreaView>
      ) : (
        <Container topDivider={true} containerStyle={styles.loadingContainer}>
          <Flex>
            <Text style={styles.title}>Loading</Text>
            <Divider style={styles.divider} />
            <Divider style={styles.divider} />
            <LoadingButton containerStyle={styles.lButton} />
          </Flex>
        </Container>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flex: 1,
    width: windowWidth,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
  },
  container: {
    margin: 10,
    marginBottom: 40,
  },
  divider: {
    backgroundColor: "black",
    width: windowWidth * 0.8,
    alignSelf: "center",
    height: 1,
    marginBottom: 5,
  },
  gameCount: {
    fontSize: 16,
    alignSelf: "center",
    color: "#696969",
  },
  scoreCard: {
    width: windowWidth * 0.935,
    backgroundColor: "#696969",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "black",
    borderRadius: 6,
    marginBottom: 20,
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
  },
  teamVersus: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    marginBottom: 10,
  },
  teams: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 2,
  },
  quarter: {
    alignSelf: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  broadcast: {
    alignSelf: "center",
    justifyContent: "space-around",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  loadingContainer: {
    backgroundColor: "#696969",
    height: windowHeight * 0.35,
  },
  lButton: {
    height: 300,
    alignSelf: "center",
  },
});

export default ScoreCard;
