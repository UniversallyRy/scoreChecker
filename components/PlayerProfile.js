import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Input, Card, Image, Text } from "react-native-elements";
import { PROFILE_PIC_URL_PREFIX } from "../constants";
import { RaisedButton, LoadingButton } from "./Buttons";
import logos from "../logoManager";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Profile = ({ playerInfo, navigation }) => {
  // todo: dry loop needed for text component
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkInfo = () => {
      if (playerInfo !== undefined) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };
    return () => {
      checkInfo();
    };
  }, [playerInfo]);

  return (
    <Card containerStyle={styles.playerProfile}>
      {!loading ? (
        <>
          <View style={styles.picBorder}>
            <Image
              containerStyle={styles.playerPic}
              source={{
                uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
              }}
              alt="Profile"
            />
          </View>
          <Text style={styles.playerName}>{`${playerInfo.playerName}`}</Text>
          <Image
            containerStyle={styles.teamLogo}
            source={logos[playerInfo.teamAbbreviation]}
            alt="Team"
          />
          <View style={styles.playerInfo}>
            <Text style={styles.playerInfoLeft}>Team:</Text>
            <Text style={styles.playerInfoRight}>
              {`${playerInfo.teamCity} ${playerInfo.teamName}`}
            </Text>
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerInfoLeft}>Height:</Text>
            <Text style={styles.playerInfoRight}>{`${playerInfo.height}`}</Text>
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerInfoLeft}>Weight:</Text>
            <Text style={styles.playerInfoRight}>{`${playerInfo.weight}`}</Text>
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerInfoLeft}>PPG:</Text>
            <Text style={styles.playerInfoRight}>{`${playerInfo.pts}`}</Text>
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerInfoLeft}>APG:</Text>
            <Text style={styles.playerInfoRight}>{`${playerInfo.ast}`}</Text>
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerInfoLeft}>RPG:</Text>
            <Text style={styles.playerInfoRight}>{`${playerInfo.reb}`}</Text>
          </View>
          <RaisedButton
            containerStyle={styles.button}
            title="CLICK FOR MORE INFO"
            onPress={() => {
              /* 1. Navigate to the Extended Profile route with params */
              navigation.navigate("Extended Profile", {
                itemId: 10,
                playerInfo: playerInfo,
              });
            }}
          />
        </>
      ) : (
        <View style={{ alignContent: "center" }}>
          <Text>Loading</Text>
          <LoadingButton />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  playerProfile: {
    flex: 1,
    width: windowWidth * 0.99,
    height: windowHeight * 0.65,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#696969",
    fontFamily: "Roboto",
    borderRadius: 4,
    padding: 3,
  },
  picBorder: {
    borderWidth: 1,
    marginTop: 1,
  },
  playerPic: {
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "black",
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 3,
    height: 100,
    width: 100,
  },
  playerName: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
    alignSelf: "center",
  },
  playerInfo: {
    flexDirection: "row",
  },
  playerInfoLeft: {
    textAlignVertical: "auto",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    marginBottom: 10,
  },
  playerInfoRight: {
    textAlignVertical: "auto",
    fontSize: 20,
    fontFamily: "Roboto",
    marginLeft: 10,
    marginBottom: 10,
  },
  teamLogo: {
    width: 50,
    height: 50,
    margin: 10,
    alignSelf: "center",
  },
  button: {
    margin: 5,
  },
});

export default Profile;
