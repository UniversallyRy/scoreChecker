import React, { useState, useEffect } from "react";
import { VStack, Spacer } from "native-base";
import { MotiView } from "moti";
import PlayerHeader from "../Header";
import PlayerInfo from "../Info";
import { SubmitButton } from "../../Buttons";
import { colorScheme } from "../../../constants";
import { windowHeight, windowWidth } from "../../../utils/dimensions";
import type { StackScreenProps } from "@react-navigation/stack";
import type { PlayerStackParams } from "../../navigation/Screens";
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
      {!loading && (
        <VStack
          w={windowWidth * 0.98}
          h={windowHeight * 0.65}
          borderRadius={3}
          px={5}
          mt={1}
          bg={colorScheme.foreground}
          shadow={3}
        >
          <PlayerHeader pl={pl} />
          <Spacer />
          {Object.entries(infoList).map(([item, value]) => (
            <PlayerInfo
              propKey={item}
              value={value}
              colorScheme={colorScheme}
              key={value + 'key'}
            />
          ))}
          <Spacer />
          <SubmitButton
            /* Navigate to the Extended Profile route with params */
            onPress={() => {
              navigation.navigate("Extended Profile", {
                playerId: pl.pid,
                playerInfo: playerInfo
              })
            }}
          >
            CLICK FOR MORE INFO{" "}
          </SubmitButton>
        </VStack>
      )}
    </MotiView>
  );
};

export default PlayerCard;
