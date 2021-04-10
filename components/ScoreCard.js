import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, ListItem, Icon, Text, Image } from "react-native-elements";
import logos from "../logoManager";
import { LoadingButton } from "./Buttons";
import DatePicker from "./DatePicker";
import { client } from "../graphql/Client";
import { Scoreboard } from "../graphql/Queries";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
// WebP only images currently, todo: png/jpeg backups
// logo 35 x 50

const Score = ({ u, navigation }) => {
  const [awayScore, setAway] = useState(0);
  const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
  let comp = u.gameUrlCode.slice(-6);
  let date = u.gameUrlCode.slice(0, 8);
  let splitTeam = splitAt(3)(comp);
  let [awayTeam, homeTeam] = [splitTeam[0], splitTeam[1]];
  let [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];

  const quarterPicker = (num) => {
    if (u.period.isHalftime) {
      return "Halftime";
    }
    if (num === 1) {
      return num + "st";
    }
    if (num === 2) {
      return num + "nd";
    }
    if (num === 3) {
      return num + "rd";
    }
    if (num === 4) {
      return num + "th";
    }
    return u.startTimeEastern;
  };

  return (
    <ListItem topDivider={true} raised containerStyle={styles.scoreCard}>
      <ListItem.Content>
        {/* Team Logos */}
        <View style={styles.teamVersus}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={styles.teams}>
              {awayTeam} - {u.vTeam.score}
            </Text>
            <Image
              accessibilityLabel={awayTeam}
              source={awayLogo}
              style={{ width: 50, height: 50, margin: 5 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>

          <Text style={{ fontWeight: "bold", marginLeft: 25, marginRight: 25 }}>
            At
          </Text>

          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={styles.teams}>
              {homeTeam} - {u.hTeam.score}{" "}
            </Text>
            <Image
              accessibilityLabel={homeTeam}
              source={homeLogo}
              style={{ width: 50, height: 50, margin: 5 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        </View>

        {/* Game Status(Shows postponed, game times in EST and info is selectable only if game is already played ) */}
        <ListItem.Subtitle style={styles.quarter}>
          {quarterPicker(u.period.current) != "PPD"
            ? quarterPicker(u.period.current)
            : "Postponed"}
          {"   "}
          {quarterPicker(u.period.current) != "Final" &&
          quarterPicker(u.period.current) != "PPD" &&
          u.clock.charAt(1) != "0"
            ? u.clock
            : ""}
        </ListItem.Subtitle>
        <Card.Divider style={styles.divider} />
        <ListItem.Subtitle style={styles.broadcast}>
          <TouchableOpacity containerStyle={{ marginLeft: 10 }}>
            <Icon
              name="info"
              size={20}
              onPress={() => {
                // When game status is still showing a start time, or postponed, no routing and returns null
                if (
                  u.period.current.length >= 1 ||
                  u.startTimeEastern == "PPD"
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
          </TouchableOpacity>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const ScoreCard = ({ item, date, navigation, gameNum }) => {
  // loading boolean for when to show loading component
  const [loading, setLoading] = useState(true);

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
    <View style={styles.scoreContainer}>
      <Text style={styles.gameNumber}>Number of Games: {gameNum}</Text>
      <Card.Divider style={styles.divider} />
      {!loading ? (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={item}
            renderItem={renderItem}
            keyExtractor={(item) => item.gameId}
          />
        </SafeAreaView>
      ) : (
        <ListItem topDivider={true} containerStyle={styles.loadingContainer}>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>Loading</ListItem.Title>
            <Card.Divider style={styles.divider} />
            <Card.Divider style={styles.divider} />
            <LoadingButton containerStyle={styles.lButton} />
          </ListItem.Content>
        </ListItem>
      )}
    </View>
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
  gameNumber: {
    alignSelf: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#696969",
    fontSize: 16,
    margin: 5,
  },
  divider: {
    backgroundColor: "#696969",
    width: windowWidth * 0.8,
    alignSelf: "center",
    height: 1,
  },
  scoreCard: {
    flex: 1,
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
