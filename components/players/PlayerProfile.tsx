import React, { useState, useEffect } from "react";
import { Image, Text, HStack, Box } from "native-base";
import { MotiView, AnimatePresence } from "moti";
import { SubmitButton, LoadingButton } from "../Buttons";
import { PROFILE_PIC_URL_PREFIX, colorScheme } from "../../constants";
import logos from "../../logoManager";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import type { PlayerProfileType } from "../../types";

export type ProfileProps = {
  playerInfo: PlayerProfileType;
  navigation: {
    navigate: (arg0: string, arg1: object) => void;
  }
}

const Profile = ({ playerInfo, navigation }: ProfileProps) => {
  const [loading, setLoading] = useState(true);

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
      return playerInfo !== undefined ? setLoading(false) : setLoading(true);
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
      bg={colorScheme.foreground}
      shadow="4"
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
          >
            <LoadingButton />
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
              borderColor={colorScheme.title}
              borderRadius={50}
              alignItems="center"
              alignSelf="center"
              h={100}
              w={100}
              key={playerInfo.playerName + "_img"}
              source={{
                uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`,
              }}
              alt={playerInfo.playerName}
            />
            <Text
              alignSelf="center"
              fontSize="xl"
              fontWeight={700}
              color={colorScheme.text}
            >
              {`${playerInfo.playerName}`}
            </Text>
            <Image
              w={50}
              h={50}
              mb={10}
              alignSelf="center"
              source={logos[playerInfo.teamAbbreviation]}
              key={playerInfo.teamAbbreviation + "_logoKey"}
              alt={playerInfo.teamName}
            />
            {Object.entries(infoList).map(([item, value]) => (
              <HStack
                key={item + "_key"}
                textAlign="auto"
                alignItems="center"
                mb={2}
              >
                <Text
                  color={colorScheme.title}
                  lineHeight="lg"
                  fontSize="xl"
                  fontWeight={900}
                >
                  {item}
                </Text>
                <Text
                  color={colorScheme.text}
                  ml={1}
                  lineHeight="lg"
                  fontSize="lg"
                  fontWeight={400}
                >
                  {value}
                </Text>
              </HStack>
            ))}
            <SubmitButton
              onPress={() => {
                /* Navigate to the Extended Profile route with params */
                navigation.navigate("Extended Profile", {
                  playerInfo: playerInfo,
                });
              }}
            >
              <Text
                color={colorScheme.text}
                fontStyle="italic"
                fontWeight={300}
              >
                CLICK FOR MORE INFO{" "}
              </Text>
            </SubmitButton>
          </MotiView>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Profile;
