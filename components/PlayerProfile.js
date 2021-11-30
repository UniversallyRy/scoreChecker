import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Flex, Image, Button, Text, HStack, Box } from "native-base";
import { PROFILE_PIC_URL_PREFIX } from "../constants";
import { RaisedButton, LoadingButton } from "./Buttons";
import logos from "../logoManager";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Profile = ({ playerInfo, navigation }) => {
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
    <Box style={styles.playerProfile}>
      {!loading ? (
        <Flex>
          <Image
            key={playerInfo.playerId}
            style={styles.playerPic}
            source={{
              uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
            }}
            alt="Profile"
          />
          <Text style={styles.playerName}>{`${playerInfo.playerName}`}</Text>
          <Image
            key={playerInfo.teamAbbreviation}
            style={styles.teamLogo}
            source={logos[playerInfo.teamAbbreviation]}
            alt="Team"
          />
          {Object.entries(infoList).map(([item, value]) => (
            <HStack key={item} marginBottom={2} textAlignVertical="auto">
              <Text color="#780116" lineHeight="lg" fontSize="xl" bold>
                {item}
              </Text>
              <Text
                color="#F7B538"
                marginLeft={1}
                lineHeight="lg"
                fontSize="lg"
              >
                {value}
              </Text>
            </HStack>
          ))}
          <RaisedButton
            m={5}
            onPress={() => {
              /* 1. Navigate to the Extended Profile route with params */
              navigation.navigate("Extended Profile", {
                itemId: 10,
                playerInfo: playerInfo,
              });
            }}
          >
            <Text color="#F7B538">CLICK FOR MORE INFO </Text>
          </RaisedButton>
        </Flex>
      ) : (
        <View style={{ alignContent: "center" }}>
          <Text color="#F7B538">Loading</Text>
          <LoadingButton />
        </View>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  playerProfile: {
    alignSelf: "center",
    width: windowWidth * 0.98,
    height: windowHeight * 0.65,
    justifyContent: "center",
    borderRadius: 3,
    padding: 10,
    marginTop: 3,
    backgroundColor: "#C32F27",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 0.34,
    },
    shadowOpacity: 0.85,
    shadowRadius: 6.6,
    elevation: 5,
  },
  picBorder: {
    borderWidth: 1,
    marginTop: 1,
  },
  playerPic: {
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "#780116",
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
    fontWeight: "bold",
    alignSelf: "center",
    color: "#F7B538",
  },
  teamLogo: {
    width: 50,
    height: 50,
    margin: 10,
    alignSelf: "center",
  },
});

export default Profile;
