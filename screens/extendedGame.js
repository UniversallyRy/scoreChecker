import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  ActivityIndicator,
} from "react-native";
import { Card, ListItem, Icon, Text, Image } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import NBA from "nba";
import moment from "moment";
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from "../constants";
import logos from "../logoManager";
import ScoreCard from "../components/ScoreCard";
import { LoadingButton } from "../components/Buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const extendedGame = ({ navigation, route }) => {
  // todos: will need to break down in seperate components(seperate statsleader/linescores possibly)
  // seperate screen from components
  const [leaderDropdown, setDropdown] = useState({ value: "Points" });
  const [statState, setStat] = useState("Points");
  const [gameData, setData] = useState({});
  const [homeScore, setHome] = useState(0);
  const [awayScore, setAway] = useState(0);
  const [homeLeaders, setHomeLeaders] = useState({});
  const [awayLeaders, setAwayLeaders] = useState({});
  const [homePic, setHomePic] = useState({});
  const [awayPic, setAwayPic] = useState({});
  const { itemId, scoreInfo } = route.params;
  const [homeLines, setHomeLines] = useState([]);
  const [awayLines, setAwayLines] = useState([]);
  const [scoringHome, setScoringHome] = useState("");
  const [scoringAway, setScoringAway] = useState("");
  const image = require("../assets/double-bubble-dark.png");
  const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
  let comp = scoreInfo.gamecode.slice(-6);
  let date = scoreInfo.gamecode.slice(0, 8);
  let splitTeam = splitAt(3)(comp);
  let [awayTeam, homeTeam] = [splitTeam[0], splitTeam[1]];
  let [awayLogo, homeLogo] = [logos[awayTeam], logos[homeTeam]];
  let controller;

  const changeStats = (stat) => {
    const newStat = stat;
    setStat(stat);
    NBA.data
      .boxScore(date, scoreInfo.gameId)
      .then((res) => res.sports_content)
      .then((res) => res.game)
      .then((res) => {
        setHomeLeaders(res.home.Leaders[newStat]);
        setAwayLeaders(res.visitor.Leaders[newStat]);
        setScoringHome(
          res.home.Leaders[newStat].leader[0].FirstName +
            " " +
            res.home.Leaders[newStat].leader[0].LastName
        );
        setScoringAway(
          res.visitor.Leaders[newStat].leader[0].FirstName +
            " " +
            res.visitor.Leaders[newStat].leader[0].LastName
        );
        setHomePic(res.home.Leaders[newStat].leader[0].PersonID);
        setAwayPic(res.visitor.Leaders[newStat].leader[0].PersonID);
      });
  };

  useEffect(() => {
    async function initData() {
      // fetches data needed for single scorecard and gives values to above states.
      NBA.data
        .boxScore(date, scoreInfo.gameId)
        .then((res) => res.sports_content)
        .then((res) => res.game)
        .then((res) => {
          setHome(res.home.score);
          setAway(res.visitor.score);
          setHomeLeaders(res.home.Leaders.Points);
          setAwayLeaders(res.visitor.Leaders.Points);
          setHomeLines(res.home.linescores.period);
          setAwayLines(res.visitor.linescores.period);
          setData(res);
          setScoringHome(
            res.home.Leaders.Points.leader[0].FirstName +
              " " +
              res.home.Leaders.Points.leader[0].LastName
          );
          setScoringAway(
            res.visitor.Leaders.Points.leader[0].FirstName +
              " " +
              res.visitor.Leaders.Points.leader[0].LastName
          );
          setHomePic(res.home.Leaders.Points.leader[0].PersonID);
          setAwayPic(res.visitor.Leaders.Points.leader[0].PersonID);
        });
    }
    initData();
  }, []);

  const StatLeader = () => {
    return (
      <View>
        <View style={styles.scoreLeadersContainer}>
          <Card containerStyle={styles.scoreLeaders}>
            <Card.Title>Away</Card.Title>
            <Image
              containerStyle={styles.playerPic}
              source={{ uri: `${PROFILE_PIC_URL_PREFIX}/${awayPic}.png` }}
              alt="Player"
            />
            <Text>{scoringAway}</Text>
            <Text style={{ alignSelf: "center" }}>
              {awayLeaders.StatValue} {statState}
            </Text>
          </Card>
          <Card containerStyle={styles.scoreLeaders}>
            <Card.Title>Home</Card.Title>
            <Image
              containerStyle={styles.playerPic}
              source={{ uri: `${PROFILE_PIC_URL_PREFIX}/${homePic}.png` }}
              alt="Player"
            />
            <Text>{scoringHome}</Text>
            <Text style={{ alignSelf: "center" }}>
              {homeLeaders.StatValue} {statState}
            </Text>
          </Card>
        </View>
        <Card containerStyle={styles.statsHeader}>
          <Card.Title>{statState} Leaders</Card.Title>
        </Card>
      </View>
    );
  };

  const LineScores = () => {
    let awayArr = [];
    let homeArr = [];

    if (awayLines.length >= 4) {
      awayLines.map((u, i) => {
        return (awayArr[i] = u.score);
      });
      homeLines.map((u, i) => {
        return (homeArr[i] = u.score);
      });
    }

    return (
      <Card containerStyle={styles.quarterCard}>
        <Card.Title>Game Quarter Logs</Card.Title>
        <View style={styles.quarterContainer}>
          {awayLines ? (
            <>
              <View style={{ marginRight: 25 }}>
                {awayArr.map((u, i) => {
                  const quarter = `Q${i + 1}: ` + u;
                  const overtime = `OT ${i - 4}: ` + u;
                  return (
                    <Text key={i} style={styles.quarterText}>
                      {i < 5 ? quarter : overtime}
                    </Text>
                  );
                })}
              </View>
              <View style={{ marginLeft: 25 }}>
                {homeArr.map((u, i) => {
                  const quarter = `Q${i + 1}: ` + u;
                  const overtime = `OT ${i - 4}: ` + u;
                  return (
                    <Text key={i} style={styles.quarterText}>
                      {i < 5 ? quarter : overtime}
                    </Text>
                  );
                })}
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bgImage}>
        <Card wrapperStyle={styles.scoreCard} containerStyle={styles.scoreCard}>
          <View style={styles.teamVersus}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={styles.title}>
                {awayTeam} - {awayScore}
              </Text>
              <Image
                accessibilityLabel={awayTeam}
                source={awayLogo}
                style={{ width: 50, height: 50, margin: 5 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>

            <Text
              style={{
                justifyContent: "center",
                fontWeight: "bold",
                marginLeft: 25,
                marginRight: 25,
              }}
            >
              At
            </Text>

            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={styles.title}>
                {homeTeam} - {homeScore}{" "}
              </Text>
              <Image
                accessibilityLabel={homeTeam}
                source={homeLogo}
                style={{ width: 50, height: 50, margin: 5 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
          </View>
          <Text style={{ margin: 5 }}>Arena: {gameData.arena}</Text>
          <Text style={{ margin: 5 }}>
            City: {gameData.city}, {gameData.country}
          </Text>

          <View
            style={{
              width: windowWidth * 0.8,
              minHeight: 150,
              margin: 5,
              ...(Platform.OS !== "android" && {
                zIndex: 10,
                margin: 5,
                width: windowWidth * 0.8,
              }),
            }}
          >
            <DropDownPicker
              containerStyle={{ height: 40, margin: 5 }}
              itemStyle={{
                justifyContent: "flex-start",
                zIndex: 1,
              }}
              items={[
                {
                  label: "Points",
                  value: "Points",
                  icon: () => (
                    <MaterialCommunityIcons
                      name="basketball"
                      size={18}
                      color="#900"
                      style={{ marginRight: 10 }}
                    />
                  ),
                },
                {
                  label: "Rebounds",
                  value: "Rebounds",
                  icon: () => (
                    <MaterialCommunityIcons
                      name="basketball"
                      size={18}
                      color="#900"
                      style={{ marginRight: 10 }}
                    />
                  ),
                },
                {
                  label: "Assists",
                  value: "Assists",
                  icon: () => (
                    <MaterialCommunityIcons
                      name="basketball"
                      size={18}
                      color="#900"
                      style={{ marginRight: 10 }}
                    />
                  ),
                },
              ]}
              dropDownStyle={{ backgroundColor: "darkgrey", marginTop: 1 }}
              style={styles.dropDown}
              controller={(instance) => (controller = instance)}
              onChangeItem={(item) => {
                setDropdown({ value: item.value });
                changeStats(item.value);
              }}
              defaultValue={statState}
            />
          </View>
          <StatLeader />
          <LineScores />
        </Card>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scoreCard: {
    backgroundColor: "#696969",
    width: windowWidth,
    borderColor: "#696969",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    marginBottom: 5,
  },
  teamVersus: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    margin: 5,
    marginBottom: 5,
  },
  quarterCard: {
    width: windowWidth * 0.75,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    borderColor: "darkgrey",
    backgroundColor: "darkgrey",
  },
  quarterText: {
    color: "black",
    fontWeight: "bold",
    margin: 1,
  },
  quarterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "darkgrey",
    borderColor: "darkgrey",
  },
  scoreLeadersContainer: {
    marginTop: 1,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "center",
  },
  scoreLeaders: {
    margin: 3,
    flex: 1,
    backgroundColor: "darkgrey",
    borderColor: "darkgrey",
    justifyContent: "center",
    alignItems: "center",
  },
  playerPic: {
    width: 65,
    height: 65,
    alignSelf: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.6,
    borderRadius: 50,
  },
  dropDown: {
    alignItems: "center",
    backgroundColor: "#696969",
    borderColor: "darkgrey",
  },
  statsHeader: {
    alignSelf: "center",
    width: windowWidth * 0.45,
    height: 20,
    backgroundColor: "darkgrey",
    borderColor: "darkgrey",
  },
});

export default extendedGame;
