import React, { useState, useEffect } from "react";
import { Box, Text } from "native-base";
import { MotiView } from "moti";
import PlayerHeader from "../Header";
import PlayerInfo from "../Info";
import { SubmitButton } from "../../Buttons";
import { colorScheme } from "../../../constants";
import { windowHeight, windowWidth } from "../../../utils/dimensions";
import type { StackScreenProps } from "@react-navigation/stack";
import type { PlayerStackParams } from "../../navigation/Stacks";
import type { PlayerInfoType } from "../../../types/playerTypes";

type PlayerStackProps = StackScreenProps<PlayerStackParams, 'Extended Profile'>;
type NavInterface = PlayerStackProps['navigation'];
type CardProps = {
  playerInfo: PlayerInfoType;
  navigation: NavInterface;
}


const PlayerCard = ({ playerInfo, navigation }: CardProps) => {
  const [loading, setLoading] = useState(true);
  const { pl } = playerInfo;

  const infoList = {
    "Team:": `${pl.tc} ${pl.tn}`,
    "Height:": `${pl.ht}`,
    "Weight:": `${pl.wt}`,
    "PPG:": `${pl.ca.pts}`,
    "APG:": `${pl.ca.ast}`,
    "RPG:": `${pl.ca.reb}`,
  };

  useEffect(() => {
    const checkInfo = () => {
      return playerInfo.pl !== undefined ? setLoading(false) : setLoading(true);
    };
    return () => {
      checkInfo();
    };
  }, [pl]);

  return (
    <Box
      w={windowWidth * 0.98}
      h={windowHeight * 0.65}
      borderRadius={3}
      px={5}
      mt={2}
      bg={colorScheme.foreground}
      shadow="4"
    >
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
          <PlayerHeader pl={pl} />
          {Object.entries(infoList).map(([item, value]) => (
            <PlayerInfo
              name={item}
              value={value}
              colorScheme={colorScheme}
              key={value + 'key'}
            />
          ))}
          <SubmitButton
            /* Navigate to the Extended Profile route with params */
            onPress={() => {
              navigation.navigate("Extended Profile", {
                playerId: pl.pid,
                playerInfo: playerInfo
              })
            }}
            mt={20}
            alignSelf="center"
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
    </Box>
  );
};

export default PlayerCard;
