import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Flex, Image, Button, Text, HStack, Box, VStack } from "native-base";
import {
  MotiView,
  useAnimationState,
  AnimatePresence,
  useDynamicAnimation,
} from "moti";
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
      w={windowWidth * 0.98}
      h={windowHeight * 0.65}
      borderRadius={3}
      px={5}
      mt={2}
      bg="#C32F27"
      shadowColor="#C32F27"
      shadowOffset={{ width: 1, height: 0.34 }}
      shadowOpacity={0.95}
      shadowRadius={3.6}
      elevation={4}
    >
      <AnimatePresence exitBeforeEnter>
        {loading && (
          <MotiView
            key="loading"
            from={{ opacity: 0.4, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "timing",
              duration: 150,
              delay: 50,
            }}
            exit={{
              opacity: 0,
            }}
            alignItems="center"
            justifyContent="center"
          >
            <LoadingButton mt={275} />
          </MotiView>
        )}
        {!loading && (
          <MotiView
            from={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "timing",
              duration: 250,
              delay: 200,
            }}
            exit={{ opacity: 0 }}
          >
            <Image
              mt={1}
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
            <Text
              alignSelf="center"
              fontSize="xl"
              fontWeight={700}
              color="#F7B538"
            >
              {`${playerInfo.playerName}`}
            </Text>
            <Image
              w={50}
              h={50}
              mb={10}
              alignSelf="center"
              source={logos[playerInfo.teamAbbreviation]}
              key={playerInfo.teamAbbreviation}
              alt="Team"
            />
            {Object.entries(infoList).map(([item, value]) => (
              <HStack
                key={item + "key"}
                textAlign="auto"
                alignItems="center"
                mb={2}
              >
                <Text
                  color="#780116"
                  lineHeight="lg"
                  fontSize="xl"
                  fontWeight={900}
                >
                  {item}
                </Text>
                <Text
                  color="#F7B538"
                  ml={1}
                  lineHeight="lg"
                  fontSize="lg"
                  fontWeight={400}
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
              <Text color="#F7B538" fontStyle="italic" fontWeight={300}>
                CLICK FOR MORE INFO{" "}
              </Text>
            </RaisedButton>
          </MotiView>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Profile;
