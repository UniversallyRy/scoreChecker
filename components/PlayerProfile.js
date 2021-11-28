import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Flex, Image, Button, Text, HStack } from "native-base";
import { PROFILE_PIC_URL_PREFIX } from "../constants";
import { RaisedButton, LoadingButton } from "./Buttons";
import logos from "../logoManager";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Profile = ({ playerInfo, navigation }) => {
  // todo: dry loop needed for text component
  let [loading, setLoading] = useState(true);

  const infoList = {
    "Team:": `${playerInfo.teamCity} ${playerInfo.teamName}`,
    "Height:": `${playerInfo.height}`,
    "Weight:": `${playerInfo.weight}`,
    "PPG:": `${playerInfo.pts}`,
    "APG:": `${playerInfo.ast}`,
    "RPG:": `${playerInfo.reb}`,
  };

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
    <Flex style={styles.playerProfile}>
      {!loading ? (
        <>
          <View style={styles.picBorder}>
            <Image
              style={styles.playerPic}
              source={{
                uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
              }}
              alt="Profile"
            />
          </View>
          <Text style={styles.playerName}>{`${playerInfo.playerName}`}</Text>
          <Image
            style={styles.teamLogo}
            source={logos[playerInfo.teamAbbreviation]}
            alt="Team"
          />
          {Object.entries(infoList).map(([item, value]) => (
            <HStack marginBottom={2} textAlignVertical="auto">
              <Text lineHeight="lg" fontSize="xl" bold>
                {item}
              </Text>
              <Text marginLeft={1} lineHeight="xl" fontSize="lg">
                {value}
              </Text>
            </HStack>
          ))}
          <RaisedButton
            containerStyle={styles.button}
            onPress={() => {
              /* 1. Navigate to the Extended Profile route with params */
              navigation.navigate("Extended Profile", {
                itemId: 10,
                playerInfo: playerInfo,
              });
            }}
          >
            CLICK FOR MORE INFO
          </RaisedButton>
        </>
      ) : (
        <View style={{ alignContent: "center" }}>
          <Text>Loading</Text>
          <LoadingButton />
        </View>
      )}
    </Flex>
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
