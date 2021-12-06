import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Flex, Image, Button, Text, HStack, Box, VStack } from "native-base";
import { RaisedButton, LoadingButton } from "../Buttons";
import logos from "../../logoManager";
import { PROFILE_PIC_URL_PREFIX } from "../../constants";

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
    <Box
      alignSelf="center"
      justifyContent="center"
      w={windowWidth * 0.98}
      h={windowHeight * 0.65}
      borderRadius={3}
      p={10}
      mt={1}
      bg="#C32F27"
      shadowColor="#000"
      shadowOffset={{ width: 1, height: 0.34 }}
      shadowOpacity={0.85}
      shadowRadius={6.6}
      elevation={5}
    >
      {!loading ? (
        <VStack mt={5}>
          <Image
            borderWidth={2}
            overflow="hidden"
            borderColor="#780116"
            borderRadius={50}
            alignItems="center"
            alignSelf="center"
            h={100}
            w={100}
            key={playerInfo.playerId}
            source={{
              uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
            }}
            alt="Profile"
          />
          <Text alignSelf="center" fontSize="xl" color="#F7B538">
            {`${playerInfo.playerName}`}
          </Text>
          <Image
            w={50}
            h={50}
            m={5}
            alignSelf="center"
            source={logos[playerInfo.teamAbbreviation]}
            key={playerInfo.teamAbbreviation}
            alt="Team"
          />
          {Object.entries(infoList).map(([item, value]) => (
            <HStack key={item + "key"} mb={2} textAlignVertical="auto">
              <Text color="#780116" lineHeight="lg" fontSize="xl" bold>
                {item}
              </Text>
              <Text color="#F7B538" ml={1} lineHeight="lg" fontSize="lg">
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
        </VStack>
      ) : (
        <Box alignContent="center">
          <Text color="#F7B538">Loading</Text>
          <LoadingButton />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
